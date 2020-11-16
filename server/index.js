const express = require("express");
// const Vue = require("vue");
const fs = require("fs");
const path = require("path");
const { createBundleRenderer } = require("vue-server-renderer");
const serverBundle = require("../dist/server/vue-ssr-server-bundle.json");
const clientManifest = require("../dist/client/vue-ssr-client-manifest.json");
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: fs.readFileSync(path.resolve("./public/index.temp.html"), "utf-8"),
  clientManifest
});
const  app = express();
app.use(express.static("../dist/client", { index: false }))

app.get("*", async(req, res) => {
  // console.log(req.url);
  try {
    const context = {
      url: req.url,
      title: "ssr test"
    }
    const html =  await renderer.renderToString(context);
    // console.log(html)
    res.send(html)
  } catch (error) {
    console.log(error)
    res.status(500).send("服务端错误")
  }
 
})

app.listen(3000, () => {
  console.log("服务端渲染端口成功启动了")
})