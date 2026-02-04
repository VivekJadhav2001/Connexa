/*
POST   /connections/request/:userId
POST   /connections/accept/:requestId
POST   /connections/reject/:requestId
GET    /connections

*/

import { Connection } from "../models/connection.model.js";
import { User } from "../models/user.model.js";

//POST   /connect/request/:userId
const sendConnectionRequest = async (req, res) => {
  // Logic to send a connection request to a user

  const receiverId = req.params.userId; // whom i want to follow
  const userId = req.userDecoded.id; //my id

  if (userId === receiverId) {
    return res
      .status(400)
      .json({ message: "You cannot connect with yourself" });
  }

  try {
    const receiverExists = await User.findById(receiverId);
    if (!receiverExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingRequest = await Connection.findOne({
      requester: userId,
      receiver: receiverId,
    });

    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "Connection request already sent" });
    }

    //create a request
    const newRequest = await Connection.create({
      requester: userId,
      receiver: receiverId,
    });

    res.status(201).json({
      success: true,
      message: "Connection request sent",
      request: newRequest,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

//POST   /connections/accept/:requestId
const acceptConnectionRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const userId = req.userDecoded.id;

    //if request exists
    const request = await Connection.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    //check :- only the receiver will accept the request
    if (request.receiver.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    request.status = "accepted";
    await request.save();

    res.json({ message: "Connection accepted" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// POST   /connections/reject/:requestId
const rejectConnectionRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const userId = req.userDecoded.id;

    //check : - if request exists
    const request = await Connection.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    //check :- only the receiver will reject the request
    if (request.receiver.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }
    request.status = "rejected";
    await request.save();
    res.json({ success: true, message: "Connection request rejected" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

//GET    /connections

const getConnectionStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const targetId = req.params.userId;

    const connection = await Connection.findOne({
      $or: [
        { requester: userId, receiver: targetId },
        { requester: targetId, receiver: userId },
      ],
    });

    if (!connection) return res.json({ status: "none" });

    res.json({ status: connection.status, connectionId: connection._id });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export {
  sendConnectionRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
  getConnectionStatus,
};
