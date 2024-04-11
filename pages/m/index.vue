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
          <div class="bgcom bg1" :style="{'background-image':`url(${item.game_index_image_mobile})`}" :class="{cur:linkIndex===index}" v-for="(item,index) in list">
            <div class="content"></div>
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
          <News :pages="3"></News>
        </div>
        <div class="swiper-slide slidebg about c4">
          <Abouts></Abouts>
        </div>
        <div class="swiper-slide slidebg c5">
          <Joins></Joins>
        </div>
    </div>
    <div class="swiper-pagination my-pagination"></div>
  </div>
  <Menu />
  <Header />
  <a class="down" v-show="downShow"><span>滑动浏览</span></a>
</template>
<script setup>
  const route = useRoute()
  const { links, linkIndex, listIndex, setlistIndex } = useCount()
  const online = useOnline()
  const list = ref([])
  const downShow = ref(false) 

  let mySwiper = null;
  //useFetch是在服务器上请求数据，不需要在客户端上重新获取相同的数据，一般用于首屏或者首次数据渲染
  const {data} = await useFetch(`https://ztgamecom.web.ztgame.com/act/gamelist/index.php`,{
    query: { action:'list', index_show: 1 }
  })
  let res = data.value;
  list.value = res.data.list;
  setlistIndex(res.data.list);

  watch(
    () => route.query,
    () => {
      console.log(route['query'])
      let q = route['query'].foo;
      !q && mySwiper.slideTo(0);
      q === 'hot' && mySwiper.slideTo(1);
      q === 'news' && mySwiper.slideTo(2);
      q === 'about' && mySwiper.slideTo(3);
      q === 'join' && mySwiper.slideTo(4);
    }
  )

  onMounted(() => {
    mySwiper = new Swiper(".mySwiper", {
        mousewheel: true,
        direction: 'vertical',
        pagination: {
          el: ".my-pagination",
          clickable: true,
        },
        on:{
          slideChangeTransitionStart: function(){
            console.log(this.activeIndex);
            let foo = '';
            let th = this.activeIndex;

            th === 1 && (foo = 'hot');
            th === 2 && (foo = 'news');
            th === 3 && (foo = 'about');
            th === 4 && (foo = 'join');

            th === 4 ? (downShow.value=false) : (downShow.value=true)

            foo ? navigateTo({
              name: 'index',
              query: { foo },
            }) : navigateTo({
              name: 'index',
            })
          },
        }
    });

    location.search.includes('hot') && mySwiper.slideTo(1,0);
    location.search.includes('news') && mySwiper.slideTo(2,0);
    location.search.includes('about') && mySwiper.slideTo(3,0);
    location.search.includes('join') && mySwiper.slideTo(4,0);
  })
</script>