<template>
  <div class="imgsrcollbg">
    <div class="swiper imgsrcoll" @mouseenter="enter()" @mouseleave="leave()">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in listIndex" :class="{'cur':showIndex===index}" :s="`${index}`" :key="`imgs${index}`"><img :src="item.game_icon" /></div>
      </div>
    </div>   
    <div class="swiper-button-next img-next"></div>
    <div class="swiper-button-prev img-prev"></div> 
  </div>
</template>
<script setup>
  const { setlink, setlinkIndex, listIndex } = useCount()
  const showIndex = ref(0)
  let insterObj = null;
  let swiperDOM = null;

  // const list = ref([])

  // $fetch(`https://ztgamecom.web.ztgame.com/act/gamelist/index.php?action=list&index_show=1`).then(res=>{
  //   console.log(res.data.list)
  //   list.value = res.data.list;
  //   setlink(list.value[0].game_site_url);
  // })    

  const tabclick = (th)=>{
    showIndex.value = th;
    setlinkIndex(th)
    setlink(listIndex.value[th].game_site_url);

    swiperDOM.slideTo(showIndex.value);
  }
  const tabInter = ()=>{
    showIndex.value++;
    if(showIndex.value>listIndex.value.length-1){
      showIndex.value = 0;
    }
    setlinkIndex(showIndex.value);
    setlink(listIndex.value[showIndex.value].game_site_url);

    // console.log(showIndex.value)
    swiperDOM.slideTo(showIndex.value);
  }

  const enter = ()=>{
    insterObj && clearInterval(insterObj);
  }
  const leave = ()=>{
    insterObj && clearInterval(insterObj);
    insterObj = setInterval(tabInter,5000);
  }
  onMounted(() => {
    setTimeout(()=>{
      swiperDOM = new Swiper(".imgsrcoll", {
        //loop:true,
        slidesPerView: 4,
        //spaceBetween: 5,
        navigation: {
          nextEl: ".img-next",
          prevEl: ".img-prev",
        },
        on:{
          click: function (e) {
            //console.log(this.clickedSlide.getAttribute('s'));//获取到当前点击的内容
            // 这里有坑，需要注意的是：this 指向的是 swpier 实例，而不是当前的 vue， 因此借助 vm，来调用 methods 里的方法 
            // 当前活动块的索引，与activeIndex不同的是，在loop模式下不会将 复制的块 的数量计算在内。
            const realIndex = this.clickedSlide.getAttribute('s');
            tabclick(parseInt(realIndex))
          }

        },
      });

      console.log(insterObj)
      if(!insterObj)
      insterObj = setInterval(tabInter,5000)

    },100)

  })

  onUnmounted(()=>{
    console.log('离开');
    insterObj && clearInterval(insterObj);
    insterObj = null;
    showIndex.value = 0;
    setlinkIndex(0);
  })
</script>