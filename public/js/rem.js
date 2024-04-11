// (function (win, doc) {
//   if (!win.addEventListener) return
//   const isMobile = /(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i.test(navigator.userAgent)

//   function setFont() {
//     let screenWidth = document.querySelector("html").offsetWidth < 1000 ? 1000 : document.querySelector("html").offsetWidth;
//     let screenHeight = document.querySelector("html").offsetHeight;

//     let baseSize = 100; //37.5 100
//     let pageWidth = 750;
//     let pageHeight = 720;

//     if (!isMobile) {
//       pageWidth = 2560;
//     } else {
//       screenWidth = document.querySelector("html").offsetWidth
//     }

//     let fontSize = (baseSize * screenWidth) / pageWidth;

//     if (location.href.includes('ingame')) {
//       fontSize = (baseSize * screenHeight) / pageHeight;
//     }

//     document.querySelector("html").style.fontSize = `${fontSize}px`;
//   }
//   setFont()
//   doc.addEventListener('DOMContentLoaded', setFont, false)
//   win.addEventListener('resize', setFont, false)
//   win.addEventListener('load', setFont, false)
// })(window, document)

// 屏幕适应
(function (win, doc) {
  if (!win.addEventListener) return
  const isMobile = /(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i.test(navigator.userAgent)

  function setFont() {
    let screenWidth = document.querySelector("html").offsetWidth;
    let screenHeight = document.querySelector("html").offsetHeight;

    const baseSize = 100; //37.5 100
    const pageWidth = 750;
    const pageHeight = 1330;

    let fontSize = (baseSize * screenWidth) / pageWidth;
    if (!isMobile) {
      screenHeight < 720 && (screenHeight = 720);
      fontSize = (baseSize * screenHeight) / pageHeight;
    }

    document.querySelector("html").style.fontSize = `${fontSize}px`;
  }
  setTimeout(() => {
    setFont()
  }, 0)
  doc.addEventListener('DOMContentLoaded', setFont, false)
  win.addEventListener('resize', setFont, false)
  win.addEventListener('load', setFont, false)
})(window, document)