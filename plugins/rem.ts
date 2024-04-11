import '/public/js/swiper-bundle.min.js'
export default defineNuxtPlugin(() => {
  if (process.client) {
    // // 屏幕适应
    // (function (win, doc) {
    //     if (!win.addEventListener) return
    //     const isMobile = /(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i.test(navigator.userAgent)
    //     function setFont() {
    //         let screenWidth = document.querySelector("html")!.offsetWidth;
    //         let screenHeight = document.querySelector("html")!.offsetHeight;

    //         const baseSize = 100; //37.5 100
    //         const pageWidth = 750;
    //         const pageHeight = 1330;

    //         let fontSize = (baseSize * screenWidth) / pageWidth;
    //         if(!isMobile){
    //           screenHeight < 720 && (screenHeight = 720);
    //           fontSize = (baseSize * screenHeight) / pageHeight;
    //         }

    //         document.querySelector("html")!.style.fontSize = `${fontSize}px`;
    //     }
    //     //setFont()
    //     setTimeout(() => {
    //       setFont()
    //     }, 0)
    //     doc.addEventListener('DOMContentLoaded', setFont, false)
    //     win.addEventListener('resize', setFont, false)
    //     win.addEventListener('load', setFont, false)
    // })(window, document)
  }
})