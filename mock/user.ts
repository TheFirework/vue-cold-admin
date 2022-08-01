import { MockMethod } from "vite-plugin-mock";
import { resultFail, resultOk } from "./util";

export default [
  {
    url: "/login",
    timeout: 200,
    method: "post",
    response: ({ body }) => {
      const { username, password } = body;
      if (username !== "admin" || password !== "123456") {
        return resultFail("帐户或密码不正确");
      }
      return resultOk({
        id: 1,
        name: "Admin",
        username: username,
        email: "admin@gamil.com",
        token: "tokenstring",
      });
    },
  },
] as MockMethod[];
