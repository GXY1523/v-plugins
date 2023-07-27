const fs = require("fs");
const path = require("path");
export default (options) => {
  return {
    configureServer(server) {
      // 拿到mock文件夹的状态，确定他是一个 目录
      const mockStat = fs.statSync("mock");
      const isDirectory = mockStat.isDirectory();
      let mockResult = [];
      if (isDirectory) {
        // 获取 mock/index.js 文件里的内容
        mockResult = require(path.resolve(process.cwd(), "mock/index.js"));
        console.log("result````", mockResult);
      }

      server.middlewares.use((req, res, next) => {
        console.log("req", req.url);
        // 看 mockResult 里是否存在我们需要请求的地址
        const matchItem = mockResult.find(
          (mockDescriptor) => mockDescriptor.url === req.url
        );
        console.log("matchItem~~~", matchItem);
        if (matchItem) {
          const responseData = matchItem.response(req);
          console.log("responseData", responseData);
          //   设置 请求头格式 为json(防乱码)
          res.setHeader("Content-Type", "application/json");
          //   设置请求头
          res.end(JSON.stringify(responseData));
        } else next();
      });
    },
  };
};
