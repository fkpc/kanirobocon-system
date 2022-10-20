import { serveAPI } from "https://js.sabae.cc/wsutil.js";
import { minidb } from "./minidb.js";

const password = (await Deno.readTextFile("password.txt")).trim();

const fromURLSearchParams = (param) => {
  const p = new URLSearchParams(param);
  const res = {};
  for (const key of p.keys()) {
    res[key] = p.get(key);
  }
  return res;
};
const retJSONP = (callback, obj) => {
  const s = `${callback}(${JSON.stringify(obj)});`;
  return new Response(s, { headers: { "Content-Type": "application/json" }})
};

serveAPI("/api", async (param, req, path, conninfo) => {
  param = fromURLSearchParams(param);
  if (param.key != password) {
    return null;
  }
  const fn = "data/" + path.substring(5);
  if (fn.indexOf("..") >= 0) {
    return null;
  }
  const cmd = param.cmd;
  const res = await minidb(fn, cmd, param);
  return retJSONP(param.callback, res);
});
