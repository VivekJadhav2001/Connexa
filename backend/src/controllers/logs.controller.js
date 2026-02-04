import { UserSession } from "../models/userSession.model.js";

const appLoginHistory = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const userId = req.userDecoded.id;

    // Find last active session
    const lastSession = await UserSession.findOne({ userId }).sort({
      createdAt: -1,
    });

    let previousSessions = [];

    //if last session exists & not logged out properly
    if (lastSession && lastSession.loginAt) {
      previousSessions = lastSession.previousSessions || [];

      if (lastSession.logoutAt) {
        previousSessions.push({
          loginAt: lastSession.loginAt,
          logoutAt: lastSession.logoutAt,
          sessionDuration: lastSession.sessionDuration,
          source: lastSession.source,
        });
      }
    }

    //Create new session
    const session = await UserSession.create({
      userId,
      ip: req.ip,
      location: {
        latitude,
        longitude,
      },
      previousSessions,
      userAgent: {
        browser: req.useragent.browser,
        version: req.useragent.version,
        os: req.useragent.os,
        platform: req.useragent.platform,
        isMobile: req.useragent.isMobile,
        isDesktop: req.useragent.isDesktop,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Login Session Created",
      sessionId: session._id,
    });
  } catch (error) {
    console.log(error, "Error In appLogin");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const appLogoutHistory = async (req, res) => {
  try {
    const { sessionId, source } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "SessionId is required",
      });
    }

    const session = await UserSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "User Session Not Found",
      });
    }

    const logoutAt = new Date();
    const duration = (logoutAt.getTime() - session.loginAt.getTime()) / 1000;

    session.logoutAt = logoutAt;
    session.sessionDuration = Math.floor(duration);
    session.source = source || "logout";

    await session.save();

    return res.status(200).json({
      success: true,
      message: "User Session Updated",
    });
  } catch (error) {
    console.log(error, "Error in App Logout Session");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export { appLoginHistory, appLogoutHistory };
