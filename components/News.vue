<template>
  <div class="content2">
    <div class="news-tt"></div>
    <div class="newsbg">
      <!-- Swiper -->
      <div class="swiper newpic">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in newpics" :key="`newpic${index}`">
            <a :href="item.link" target="_blank">
              <div class="newpicbg">
                <picture>
                  <source media="(min-width:751px)" :srcset="item.img">
                  <source media="(max-width:750px)" srcset="/images/m-newpic1.jpg">
                  <img :src="item.img" alt="Flowers">
                </picture>
              </div>
              <strong>{{item.title}}</strong>
            </a>
          </div>
        </div>
        <div class="swiper-pagination news-pagination"></div>
      </div>

      <div class="newlist">
        <ul>
          <li v-for="(item,index) in newlist" :key="`newlist${index}`">
            <router-link :to="`/news/${item.id}`" replace>
              <strong class="news-stro-title">{{item.title}}</strong>
              <div v-html="item.content.replace(/<[^>]+>/g,'')" class="divmsg"></div>
              <!-- <p>{{item.content.replace(/&nbsp;/g,"").replace(/<[^>]+>/g,"")}}</p> -->
              <span class="time">{{item.publishdate}}</span>
            </router-link>
          </li>
        </ul>
      </div>
      <nuxt-link to="news" class="news-more">更多新闻</nuxt-link>

    </div>
  </div>
</template>
<script setup>
  const router = useRouter()
  const newpics = ref([])
  const newlist = ref([])  
  let newpic = null;

  const props = defineProps(["pages"]);
  console.log(props.pages);
  let per_page = props.pages;

  // if(process.server){
  //   $fetch('https://ztgamecom.web.ztgame.com/api/basicdata/list?site=ztgamecom&flag=index_news_slide').then(res=>{
  //     console.log(res);
  //     newpics.value = res.data;
  //   })
  // }else{
  //   newpic && setTimeout(()=>{
  //     newpic.update()
  //   },300)
  // }

  //useFetch是在服务器上请求数据，不需要在客户端上重新获取相同的数据，一般用于首屏或者首次数据渲染
  const picload = async ()=>{
    const {data} = await useFetch(`https://ztgamecom.web.ztgame.com/api/basicdata/list`,{
      query: { site:'ztgamecom',flag:'index_news_slide'}
    })
    let res = data.value;
    newpics.value = res.data;
  }

  const newsload = async ()=>{
    const {data} = await useFetch(`https://ztgamecom.web.ztgame.com/api/news/list`,{
      query: { site:'ztgamecom',type:'news',index_show:1,page:1,per_page}
    })
    let res = data.value;
    newlist.value = res.data.list;
  }

  picload();
  newsload();

  onMounted(() => {  
    setTimeout(()=>{
      newpic = new Swiper(".newpic", {
        spaceBetween: 5,
        slidesPerView: 1,
        loop:true,
        pagination: {
          el: ".news-pagination",
          clickable: true,
        },
      });
    },1000)

  })
</script>