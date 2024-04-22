<template>
  <div class="menu" :class="{ cur: curClass }">
    <div class="logo" @click="backtop()"></div>
    <ul>
      <li><nuxt-link :to="{ path: '/' }">首页</nuxt-link></li>
      <li><a href="https://my.ztgame.com/main" target="_blank">账号管理</a></li>
      <li><a href="https://ipay.ztgame.com" target="_blank">支付中心</a></li>
      <li><a href="https://jrkf.ztgame.com/" target="_blank">客服中心</a></li>
      <li>
        <a
          href="https://jrkf.ztgame.com/index.php?g=front&m=index&a=article&aid=5365&term_name=%E5%BF%AB%E6%8D%B7%E6%9C%8D%E5%8A%A1"
          target="_blank"
          >家长监护</a
        >
      </li>
      <li><a href="https://hr.ztgame.com" target="_blank">诚聘英才</a></li>
    </ul>
    <div class="wb">
      <img src="/images/qrcode.jpg" />
      公众号
    </div>
    <a href="javascript:;" class="r-mn-btn" @click="keydown()">
      <span></span>
      <span></span>
      <span></span>
    </a>
  </div>
</template>
<script setup>
const emit = defineEmit(["backtop"]);
const curClass = ref(false);
const keydown = function () {
  curClass.value = !curClass.value;
};

const backtop = () => {
  emit("backtop");
};
</script>
