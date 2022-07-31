import { mock } from "mockjs";
import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/test",
    method: "get",
    response: () => {
      return {
        code: 200,
        data: mock({
          id: "@id",
          name: "@name",
          email: "test@gamil.com",
        }),
      };
    },
  },
] as MockMethod[];
