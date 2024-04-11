export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) { // 在服务器端处理路由
    const nuxtApp = useNuxtApp()
  } else { // 在客户端处理路由
    // 是否是移动端设备
    const isMobile = /(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i.test(navigator.userAgent)
    // 是否是手机端路由
    const isRouterMobile = /\/m/i.test(to.fullPath)
    console.log(to.fullPath, to.fullPath.slice(0, to.fullPath.length))
    if (!isMobile && isRouterMobile) { // 手机端路由跳转pc端
      let path = to.fullPath.replace('/m', '')
      //return navigateTo(path)
      return navigateTo(path)
    } else if (isMobile && !isRouterMobile) { // pc端路由跳转手机端
      let path = '/m' + to.fullPath.slice(0, to.fullPath.length)
      return navigateTo(path)
    }
  }
})