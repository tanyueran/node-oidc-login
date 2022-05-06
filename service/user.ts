import pool from "../utils/mysqlDb";

// 查询用户信息
export function getUserInfoByUsername(username: string) {
  return new Promise((resolve, reject) => {
    pool.query(
      "select * from user where username = ? ",
      [username],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
}
