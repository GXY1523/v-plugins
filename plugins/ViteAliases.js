const fs = require("fs");
const path = require("path");
function diffDirAndFile(dirFilesArr = [], basePath = "") {
  const result = {
    dirs: [], //存储 得到的文件夹 名
    files: [], //存储 得到的文件 名
  };
  dirFilesArr.forEach((name) => {
    const currentFileStat = fs.statSync(
      path.resolve(__dirname, basePath + "/" + name)
    );
    console.log("current file stat", name, currentFileStat.isDirectory()); //判断当前这个是不是文件夹
    const isDirectory = currentFileStat.isDirectory();
    if (isDirectory) {
      result.dirs.push(name);
    } else {
      result.files.push(name);
    }
  });
  return result;
}
function getTotalSrcDir(keyName) {
  const res = fs.readdirSync(path.resolve(__dirname, "../src")); //得到src目录下的文件、文件夹
  //   console.log('res--',res);
  const diffRes = diffDirAndFile(res, "../src");
  console.log("diffRes~~~", diffRes); //可看到 最终src目录下 文件夹、文件分别是哪些
  const resolveAliasesObj = {}; //存放别名配置
  diffRes.dirs.forEach((dirName) => {
    const key = `${keyName}${dirName}`;
    const absPath = path.resolve(__dirname, "../src" + "/" + dirName);
    resolveAliasesObj[key] = absPath;
  });
  return resolveAliasesObj;
}

module.exports = ({ keyName = "@" } = {}) => {
  return {
    config(config, env) {
      console.log("config", config, env);
      const resolveAliasesObj = getTotalSrcDir(keyName);
      console.log("resolve", resolveAliasesObj);
      return {
        resolve: {
          alias: resolveAliasesObj,
        },
      };
    },
  };
};
