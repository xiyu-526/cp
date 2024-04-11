<template>
  <div class="r-mn" :class="{'cur':curClass}">
    <a href="javascript:;" class="r-mn-btn" @click="keydown()">
      <span></span>
      <span></span>
      <span></span>
    </a>
    <ul>
      <li :class="{cur:!curIndex}"><nuxt-link :to="{path: '/'}">首页</nuxt-link></li>
      <li :class="{cur:curIndex==='hot'}"><nuxt-link :to="{path: '/', query: { foo: 'hot' }}">热门游戏</nuxt-link></li>
      <li :class="{cur:curIndex==='news'}"><nuxt-link :to="{path: '/', query: { foo: 'news' }}">新闻资讯</nuxt-link></li>
      <li :class="{cur:curIndex==='about'}"><nuxt-link :to="{path: '/', query: { foo: 'about' }}">关于巨人</nuxt-link></li>
      <li :class="{cur:curIndex==='join'}"><nuxt-link :to="{path: '/', query: { foo: 'join' }}">加入我们</nuxt-link></li>
    </ul>
  </div>
</template>
<script setup>
  const route = useRoute()
    
  const curIndex = ref(null);
  const curClass = ref(false);
  const keydown = function(){
    curClass.value = !curClass.value;
  }

  watch(
    () => route.query,
    () => {
      curIndex.value = location.href.includes('news') ? 'news' : route['query'].foo;
    }
  )

  onMounted(() => {
    curIndex.value = location.href.includes('news') ? 'news' : route['query'].foo;
  })
</script>