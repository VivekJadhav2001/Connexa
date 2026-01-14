import fs from "fs/promises";

const getAllUserLogs = async (req, res) => {
  console.log(req, "Request in admin controller");
  try {
    const userLogsData = await fs.readFile("./src/logs/users.txt", "utf-8");

    res.status(200).json({
      success: true,
      message: "Fetched all user logs",
      data: userLogsData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export { getAllUserLogs };

/*
Day 0 : Build Basic Frontend for Posts and its CRUD ops, Profile Edits , make a pinned Post for admin, and also create another user profile for me(user) for sending connection requests, Make dummy data of 50 Students and build UI of admin dashboards and main app

Day 1 : Store Images in Local Disk of machine using Streams (Includeing multiple imgs for posts ) X AWS S3 integration for storing images (posts and profile pics) 

Day 2 : Countinue Day 1 (frontend and backend flow)

Day 3 : Sign In Check (only Accio students should be able to login sign up, check from dummy data)

Day 4 : Admin Authorization and Authentication ()

Day 5 : Student Dashboard for admin with filter (batch, location, ), search box , pie charts to view performance of student


Day 6 : Admin Actions Deactivation ops (Student account deactivate, post like, comments disabling, )

Day 7 : Admin can have a option of pinning his post on the feed while creating the post




Note: 1) For now focus on student and admin pannel, student can post any kind of posts, can send connect requests to users
2) Admin dashboard should be good with pop-ups, toasts, pie charts

3) implement most optimal methods in frontend




*/
