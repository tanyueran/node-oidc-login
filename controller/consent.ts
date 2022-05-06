import { NextFunction, Response, Request } from "express";
import url from "url";
import { hydraAdmin } from "../utils/config";

export default function (req: Request, res: Response, next: NextFunction) {
  const query = url.parse(req.url, true).query;

  const challenge = String(query.consent_challenge);
  hydraAdmin.getConsentRequest(challenge).then(({ data: body }) => {
    console.log(console.log("第一次授权验证：==========="));
    console.log(body);
    if (body.skip) {
      return hydraAdmin
        .acceptConsentRequest(challenge, {
          grant_scope: body.requested_scope,
          grant_access_token_audience: body.requested_access_token_audience,
          session: {},
        })
        .then(({ data: body }) => {
          console.log(console.log("授权成功：==========="));
          console.log(body);
          res.redirect(String(body.redirect_to));
        })
        .catch((err: any) => {
          console.log("======================授权成功：");
          console.log(err);
          next();
        });
    } else {
      return hydraAdmin
        .acceptConsentRequest(challenge, {
          grant_scope: body.requested_scope,
          session: {},
          grant_access_token_audience: body.requested_access_token_audience,
          remember: true,

          remember_for: 3600,
        })
        .then(({ data: body }) => {
          // All we need to do now is to redirect the user back to hydra!
          res.redirect(String(body.redirect_to));
        })
        .catch((err: any) => {
          console.log("======================授权成功：");
          console.log(err);
          next();
        });
    }
  });
}
