import fs from "fs/promises";

const getAllUserLogs = async (req, res) => {
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
