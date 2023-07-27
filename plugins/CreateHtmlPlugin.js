// 动态控制整个html文件的内容
module.exports = (options) => {
  return {
    // 将插件执行周期提前
    transformIndexHtml: {
      // transformIndexHtml 映射的内容返回到最后的html中去
      enforce: "pre",
      transform: (html, ctx) => {
        // html 当前的 HTML 字符串和转换上下文
        // ctx 表示当前整个请求的一个执行期上下文
        console.log("html", html);
        return html.replace(/<%=title%>/g, options.inject.data.title);
      },
    },
  };
};
