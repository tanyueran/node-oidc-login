const fs = require("fs-extra");
import path from "path";

fs.copy(
  path.join(__dirname, "../bin/www"),
  path.join(__dirname, "../build/bin/www")
)
  .then(() => {
    console.log("success!!!");
  })
  .catch((err: any) => {
    console.error(err);
  });
