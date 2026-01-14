import fs from "fs";

const TYPE_OF_POST = {
  Referral_Post: "referral",
  General_Post: "general",
  Project_Post: "project",
  Poll_Post: "poll",
};

function userLog(userEmail) {
  const date = new Date();
  const content = `${userEmail} --- ${date.getTime()}`;

  fs.writeFile(`./src/logs/users.txt`, content, (err, result) => {
    if (!err) {
      console.log(result);
    }
    console.log(err);
  });
}

export { TYPE_OF_POST, userLog };
