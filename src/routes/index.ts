const consent = require("./consent");
const login = require("./login");
const logout = require("./logout");
const user = require("./user");

export default function (app: any) {
  app.use("/api/consent", consent);
  app.use("/api/login", login);
  app.use("/api/logout", logout);
  app.use("/api/user", user);
}
