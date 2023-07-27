const mockjs = require("mockjs");
const userList = mockjs.mock({
  "data|5": [
    {
      name: "@cname",
      "id|+1": 1,
      time: "@time",
      date: "@date",
    },
  ],
});
// console.log("userList", userList);

module.exports = [
  {
    method: "post",
    url: "/api/users",
    response: ({ body }) => {
      return {
        code: 200,
        message: "success",
        data: userList,
      };
    },
  },
];
