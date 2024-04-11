<template>
  <div class="content2">
    <div class="hot-tt"></div>
    <!-- Swiper -->
    <div class="swiper hotlist">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="count in counts" :key="`hot${index}`">
          <ul>
            <li v-for="(item,index) in list.slice((count-1)*s,(count-1)*s+s)" :key="`hotpic${index}`">
              <div class="pic">
                <img :src="item.game_image" />
              </div>
              <div class="pic-bot">
                <div class="pic-bot1">
                  <img :src="item.game_icon" />
                  <p>
                    <strong>{{item.game_name}}</strong>
                    <span>{{item.game_slogan}}</span>
                  </p>
                </div>
                <a :href="item.game_site_url" class="pic-join-btn">进入官网</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="hot-page">
      <div class="hot-prev"></div>
      <div class="swiper-pagination hot-pagination"></div>
      <div class="hot-next"></div>
    </div>

  </div>
</template>
<script setup>
  let list = ref([]);

  let counts = ref(2)
  let s = ref(6);
  let hotlist = null;
  let isMobile = null;

  const {data} = await useFetch(`https://ztgamecom.web.ztgame.com/act/gamelist/index.php`,{
    query: { action:'list',per_page:100}
  })
  let res = data.value;
  let ary = []
  for(let i = 0;i<res.data.list.length;i++){
    if(res.data.list[i].game_image){
      ary.push(res.data.list[i]);
    }
  }
  list.value = ary;
  if(isMobile)s.value=8;
  counts.value = Math.ceil(list.value.length/s.value);

  onMounted(() => {
    isMobile = location.href.includes('/m')
    if(isMobile)s.value=8;
    counts.value = Math.ceil(list.value.length/s.value);

    console.log(counts.value)
    hotlist = new Swiper(".hotlist", {
        pagination: {
          el: ".hot-pagination",
          clickable: true,
          type: "fraction",
        },
        navigation: {
          nextEl: ".hot-next",
          prevEl: ".hot-prev",
        },
    });

    setTimeout(()=>{
      hotlist && hotlist.update()
    },100)

  })
</script>