<template>
  <div class="content2">
    <div class="news-title">
      <strong>{{obj.title}}</strong>
      <span class="time">{{obj.publishdate}}</span>
      <a href="javascript:;" class="news-back" @click="back()">返回</a>
    </div>
    <div class="news-content">
      <div v-html="obj.content">

      </div>
    </div>
  </div>
</template>
<script setup>
  const router = useRouter()
  const route = useRoute()
  const user = useUserStore()
  const name = route.params.id
  
  const obj = ref('');
  
  // watchEffect(() => {
  //   user.setNewName(route.params.id)
  // })

  // if(!process.client){}

  // definePageMeta({
  //   layout: 'home',
  // })

  // $fetch(`https://ztgamecom.web.ztgame.com/api/news/info?site=ztgamecom&htmlfile=${name}.html`).then(res=>{
  //   obj.value = res.data;
  // })    


  //useFetch是在服务器上请求数据，不需要在客户端上重新获取相同的数据，一般用于首屏或者首次数据渲染
  const {data} = await useFetch(`https://ztgamecom.web.ztgame.com/api/news/info`,{
    query: { site:'ztgamecom', htmlfile: `${name}.html` }
  })
  let res = data.value;
  obj.value = res.data;
  const back = ()=>{
    navigateTo('/news')
  }
  </script>