import express, { NextFunction, Response, Request } from "express";
import url from "url";
import { hydraAdmin } from "../utils/config";

let router = express.Router();

// 授权校验
router.get("/", function (req, res, next) {
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
          // We can grant all scopes that have been requested - hydra already checked for us that no additional scopes
          // are requested accidentally.
          grant_scope: req.body.grant_scope,

          // If the environment variable CONFORMITY_FAKE_CLAIMS is set we are assuming that
          // the app is built for the automated OpenID Connect Conformity Test Suite. You
          // can peak inside the code for some ideas, but be aware that all data is fake
          // and this only exists to fake a login system which works in accordance to OpenID Connect.
          //
          // If that variable is not set, the session will be used as-is.
          session: {}, //oidcConformityMaybeFakeSession(grantScope, body, session),

          // ORY Hydra checks if requested audiences are allowed by the client, so we can simply echo this.
          grant_access_token_audience: body.requested_access_token_audience,

          // This tells hydra to remember this consent request and allow the same client to request the same
          // scopes from the same user, without showing the UI, in the future.
          remember: true,

          // When this "remember" sesion expires, in seconds. Set this to 0 so it will never expire.
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
});

module.exports = router;
