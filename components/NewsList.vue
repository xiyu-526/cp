<template>
  <div class="content2">
    <div class="news-tt"><a href="javascript:;" class="news-back" @click="back()">返回</a></div>
    <div class="newlist newlist2">
      <ul>
        <li v-for="(item,index) in newlist" :key="`newlist${index}`">
          <router-link :to="`/news/${item.id}`" replace>
            <strong class="news-stro-title">{{item.title}}</strong>
            <!--{{item.content.replace(/<[^>]+>/g,"")}}-->
            <div v-html="item.content.replace(/<[^>]+>/g,'')" class="divmsg"></div>
            <span class="time">{{item.publishdate}}</span>
          </router-link>
        </li>
      </ul>
      <a href="javascript:;" class="news-more" @click="loadnew()" v-if="last_page>current_page">更多新闻</a>
      <p class="nonews" v-else>没有更多新闻</p>
    </div>
  </div>
</template>
<script setup>
  const router = useRouter()
  const load = ref(false)
  const page = ref(1);
  const last_page = ref(1);
  const current_page = ref(1);
  const newlist = ref([])  

  const back = ()=>{
    navigateTo('/?foo=news')
  }

  // useFetch('/api/list').then(res=>{
  //   console.log(res);
  // })

  // useFetch('/api/test/aaa?a=12312&b=123').then(res=>{
  //   console.log(res);
  // })

  // $fetch('/api/submit', { method: 'post', body: { test: 123 } })

  //useFetch是在服务器上请求数据，不需要在客户端上重新获取相同的数据，一般用于首屏或者首次数据渲染
  const {data} = await useFetch(`https://ztgamecom.web.ztgame.com/api/news/list`,{
    query: { site:'ztgamecom',type:'news',page: `${page.value}`,per_page:5 }
  })
  let res = data.value;
  newlist.value = res.data.list;
  last_page.value = res.data.last_page;
  current_page.value = res.data.current_page;

  const loadnew = ()=>{
    if(load.value){
      return;
    }
    load.value = true;
    page.value++;
    $fetch(`https://ztgamecom.web.ztgame.com/api/news/list?site=ztgamecom&type=news&page=${page.value}&per_page=5`).then(res=>{
     // console.log(res);
      newlist.value = newlist.value.concat(res.data.list);
      last_page.value = res.data.last_page;
      current_page.value = res.data.current_page;
      load.value = false;
    })   
  }

  // useFetch('/api/submit',{
  //   method:'post',
  //   body:{
  //     test:123
  //   }
  // }).then(res=>{
  //   console.log(res)
  // })
</script>