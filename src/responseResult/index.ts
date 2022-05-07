export function errorResult(data: any, msg: string) {
  return {
    code: -1,
    msg,
    data,
  };
}

export function successResult(data: any, msg?: string) {
  return {
    code: 0,
    msg: msg || "ok",
    data,
  };
}
