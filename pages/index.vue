<!-- {{$route.params.group}}
{{$route.params.id}}
<div>asdasd</div>
<Logos mb-6 />
<Suspense>
  <ClientOnly>
    <PageView v-if="online" />
    <div v-else text-gray:80>
      You're offline
    </div>
  </ClientOnly>
  <template #fallback>
    <div italic op50>
      <span animate-pulse>Loading...</span>
    </div>
  </template>
</Suspense>
<InputEntry /> -->
<template>
  <div class="swiper mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide slidebg c1">
        <div
          class="bgcom bg1"
          :style="{ 'background-image': `url(${item.game_index_image_pc})` }"
          :class="{ cur: linkIndex === index }"
          v-for="(item, index) in list"
        >
          <div class="content">
            <!-- <img src="/images/yszt-tt.png" class="title-1" /> -->
            <div class="title-1">{{ item.game_name }}</div>
            <div class="title-2">{{ item.game_slogan }}</div>

            <div class="msg">
              {{ item.game_description }}
            </div>
          </div>
        </div>

        <div class="setGame">
          <ImgScroll />

          <a :href="links" class="join-btn" target="_blank">进入官网</a>
        </div>
      </div>
      <div class="swiper-slide slidebg c2">
        <Hots></Hots>
      </div>
      <div class="swiper-slide slidebg c3">
        <News :pages="4"></News>
      </div>
      <div class="swiper-slide slidebg about c4">
        <div class="aboutimg1"></div>
        <div class="aboutimg2"></div>
        <div class="aboutimg3"></div>
        <div class="aboutimg4"></div>
        <div class="aboutimg5"></div>
        <Abouts></Abouts>
      </div>
      <div class="swiper-slide slidebg c5">
        <Joins></Joins>
      </div>
    </div>
    <div class="swiper-pagination my-pagination"></div>
  </div>
  <Menu @backtop="backtop" />
  <Header />
  <a class="down" v-show="downShow"><span>滑动浏览</span></a>
</template>
<script setup>
const route = useRoute();
const { links, linkIndex, listIndex, setlistIndex } = useCount();
const online = useOnline();
const list = ref([]);
const downShow = ref(false);

let mySwiper = null;

const backtop = () => {
  mySwiper.slideTo(0);
};

watch(
  () => route.query,
  () => {
    //console.log(route['query'])
    let q = route["query"].foo;
    !q && mySwiper.slideTo(0);
    q === "hot" && mySwiper.slideTo(1);
    q === "news" && mySwiper.slideTo(2);
    q === "about" && mySwiper.slideTo(3);
    q === "join" && mySwiper.slideTo(4);
  }
);

//useFetch是在服务器上请求数据，不需要在客户端上重新获取相同的数据，一般用于首屏或者首次数据渲染
const { data } = await useFetch(
  `https://ztgamecom.web.ztgame.com/act/gamelist/index.php`,
  {
    query: { action: "list", index_show: 1 },
  }
);
let res = data.value;
list.value = res.data.list;
setlistIndex(res.data.list);

onMounted(() => {
  let mouseX = 0,
    mouseY = 0,
    x = 0,
    y = 0,
    z = 0,
    s = 1,
    windowHalfX = window.innerWidth / 2,
    windowHalfY = window.innerHeight / 2,
    SEPARATION = 200,
    AMOUNTX = 10,
    AMOUNTY = 10;

  const aboutimg1 = document.querySelector(".aboutimg1");
  const aboutimg2 = document.querySelector(".aboutimg2");
  const aboutimg3 = document.querySelector(".aboutimg3");
  const aboutimg4 = document.querySelector(".aboutimg4");
  const aboutimg5 = document.querySelector(".aboutimg5");

  function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    x += (mouseX - x) * 0.05;
    y += (-mouseY + 50 - y) * 0.05;
    z += (-mouseY + 50 - y) * 0.05;
    s += (-mouseY + 50 - y) * 0.05;

    z <= 0 && (z = 0);

    aboutimg1.style.setProperty("--x1", `${x / 5000}rem`);

    aboutimg2.style.setProperty("--x2", `${x / 3000}rem`);

    aboutimg3.style.setProperty("--x3", `${x / 6000}rem`);

    aboutimg4.style.setProperty("--x4", `${x / 7000}rem`);

    aboutimg5.style.setProperty("--x5", `${x / 2000}rem`);
  }

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
  }

  nextTick(() => {
    mySwiper = new Swiper(".mySwiper", {
      mousewheel: true,
      direction: "vertical",
      pagination: {
        el: ".my-pagination",
        clickable: true,
      },
      on: {
        slideChangeTransitionStart: function () {
          console.log(this.activeIndex);
          let foo = "";
          let th = this.activeIndex;

          th === 1 && (foo = "hot");
          th === 2 && (foo = "news");
          th === 3 && (foo = "about");
          th === 4 && (foo = "join");

          th === 4 ? (downShow.value = false) : (downShow.value = true);

          if (this.activeIndex === 3) {
            setTimeout(() => {
              mouseX = -1200;
            });
          } else {
            mouseX = 1200;
          }

          foo
            ? navigateTo({
                name: "index",
                query: { foo },
              })
            : navigateTo({
                name: "index",
              });
        },
      },
    });

    location.search.includes("hot") && mySwiper.slideTo(1, 0);
    location.search.includes("news") && mySwiper.slideTo(2, 0);
    location.search.includes("about") && mySwiper.slideTo(3, 0);
    location.search.includes("join") && mySwiper.slideTo(4, 0);

    document
      .querySelector(".about")
      .addEventListener("mousemove", onDocumentMouseMove, false);
    window.addEventListener("resize", onWindowResize, false);

    animate();
  });
});
</script>
