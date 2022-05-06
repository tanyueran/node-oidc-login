import { hydraAdmin } from "../utils/config";
import { NextFunction, Response, Request } from "express";

// 检测token
export async function checkToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token = req.headers.authorization?.split(" ")?.[1];
  if (!token) {
    res.status(401).end({
      code: -1,
      msg: "token is not empty",
    });
    return;
  }
  try {
    let o: any = await hydraAdmin.introspectOAuth2Token(token as string);
    if (!o || !o?.data || !o?.data?.active) {
      res.status(401);
      res.send({
        code: -1,
        msg: "token is not active",
      });
      return;
    }
    (req as any).session.user = JSON.stringify(o.data);
  } catch (err) {
    console.error(err);
    res.status(401);
    res.send({
      code: -1,
      msg: "token is not active",
    });
    return;
  }
  next();
}
