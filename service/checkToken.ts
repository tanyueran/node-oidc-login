import { hydraAdmin } from "../utils/config";

// 检测token
export async function checkToken(token: string) {
  try {
    let o = await hydraAdmin.introspectOAuth2Token(token);
    return o?.data;
  } catch (err) {
    console.error(err);
    return {
      active: false,
    };
  }
}
