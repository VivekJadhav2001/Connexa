import mongoose from "mongoose";

const userSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    loginAt: {
      type: Date,
      required: true,
      default: Date.now,
    },

    logoutAt: {
      type: Date,
    },

    sessionDuration: {
      type: Number, // seconds
    },

    previousSessions: [
      {
        loginAt: {
          type: Date,
        },
        logoutAt: {
          type: Date,
        },
        sessionDuration: {
          type: Number,
        },
        source: {
          type: String,
        },
      },
    ],
    source: {
      type: String,
      enum: ["logout", "tab-close", "crash"],
      default: "logout",
    },

    ip: {
      type: String,
    },
    location: {
      latitude: {
        type: String,
      },
      longitude: {
        type: String,
      },
    },

    userAgent: {
      browser: {
        type: String,
      },
      version: {
        type: String,
      },
      os: {
        type: String,
      },
      platform: {
        type: String,
      },
      isMobile: {
        type: Boolean,
      },
      isDesktop: {
        type: Boolean,
      },
    },
  },
  { timestamps: true },
);

const UserSession = mongoose.model("UserSession", userSessionSchema);

export { UserSession };
