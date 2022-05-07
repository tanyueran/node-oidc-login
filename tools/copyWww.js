const fs = require("fs-extra");
const path = require("path");

fs.copy(
  path.join(__dirname, "../src/bin/www"),
  path.join(__dirname, "../build/bin/www")
)
  .then(() => {
    console.log("success!!!");
  })
  .catch((err) => {
    console.error(err);
  });
