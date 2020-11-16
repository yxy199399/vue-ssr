// 服务端入口，首屏渲染
import createApp from "./app";
export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp();
    router.push(context.url);
    router.onReady(() => {
      resolve(app);
    }, reject)
  })
}
