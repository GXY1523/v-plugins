import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import MyViteAliases from "./plugins/ViteAliases";
import { createHtmlPlugin } from "vite-plugin-html";
import MyCreateHtmlPlugin from "./plugins/CreateHtmlPlugin";
import { viteMockServe } from "vite-plugin-mock";
import MyVitePluginMock from "./plugins/VitePluginMock";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // MyViteAliases(),
    // 页面标题会变成首页（index.html页面）
    // createHtmlPlugin({ inject: { data: { title: "标题在这里" } } }),
    MyCreateHtmlPlugin({ inject: { data: { title: "标题在这里" } } }),
    // viteMockServe(),
    MyVitePluginMock(),
  ],
});
