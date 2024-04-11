<template>
  <div class="content2">
    <div class="join-tt"></div>
    <div class="join-content">
      <!-- Swiper -->
      <div class="swiper joinc">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <picture>
              <source media="(min-width:751px)" srcset="/images/joinpic1.png">
              <source media="(max-width:750px)" srcset="/images/m-joinpic1.png">
              <img src="/images/joinpic1.png" alt="Flowers">
            </picture>
          </div>
          <div class="swiper-slide">
            <picture>
              <source media="(min-width:751px)" srcset="/images/joinpic2.png">
              <source media="(max-width:750px)" srcset="/images/m-joinpic2.png">
              <img src="/images/joinpic2.png" alt="Flowers">
            </picture>
          </div>
          <div class="swiper-slide">
            <picture>
              <source media="(min-width:751px)" srcset="/images/joinpic3.png">
              <source media="(max-width:750px)" srcset="/images/m-joinpic3.png">
              <img src="/images/joinpic3.png" alt="Flowers">
            </picture>
          </div>
        </div>
      </div>
      <div class="aboutpage">
        <div class="join-prev"></div>
        <div class="swiper-pagination join-pagination"></div>
        <div class="join-next"></div>
      </div>

      <!-- Swiper -->
      <div class="swiper joincmsg">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <p>
              巨人集团由史玉柱先生创立于1989年，拥有34年历史，是中国改革开放后成长起来的标杆企业。      
              <br><br>
              公司坚持自主研发，聚焦精品战略，多次以颠覆式创新推动行业发展进步，创造了巨人汉卡、脑白金、征途、球球大作战等多个知名品牌。巨人在2004年进入互联网娱乐产业，2016年4月正式回归国内A股上市，股票代码002558.SZ。公司定位为互联网文化娱乐为主的综合性互联网企业，在巩固自身网络游戏业务优势的同时，开拓并积极布局其它互联网领域。<br><br>
            </p>
          </div>
          <div class="swiper-slide">
            <p>
              巨人网络自主研发《征途》系列，《原始征途》、《球球大作战》、《太空行动》、《月圆之夜》、《帕斯卡契约》、《仙侠世界》、《巨人》等备受玩家喜爱的热门端游和手游，代理《艾尔之光》、《街篮》、《街篮2》等国内外精品游戏。
              <br><br>
              其中，《征途》创造了中国网游史上收费模式创新的里程碑，《原始征途》手游上线当日登顶iOS免费榜第一。《球球大作战》累计设备装载量突破6亿，《太空行动》为国内首个获得版号的太空狼人杀游戏。《帕斯卡契约》为首款亮相苹果新品发布会的中国本土游戏。  
            </p>
          </div>
          <div class="swiper-slide">
            <p>
              巨人集团总部位于上海松江，被誉为“中国最具硅谷范的园区”，由“普利兹克奖”获得者汤姆·梅恩（Thom Mayne）设计。
              <br><br>
              巨人园区面积 700亩，约65个足球场。30万枝植物覆盖，绿化面积达 60%以上 。园区内视听室、咖啡吧、室内游泳馆、健身房、食堂、宿舍、足球场等一应俱全，致力于给员工提供便捷、舒适的环境，充分激发创意。  
              <br><br>
              欢迎有梦想的年轻人加入巨人大家庭！
            </p>
          </div>
        </div>
      </div>

      <div class="join-bot">
        <div class="hrqrcode">
          <img src="https://hr.ztgame.com/campus/images/v7/weixin.png" />
          <span>巨人网络HR公众号</span>
        </div>
        <a href="https://app.mokahr.com/apply/ztgame/37485/#/jobs?zhineng=160327&page=1" class="news-more" target="_blank">查看招聘岗位</a>
      </div>
    </div>
  </div>
</template>
<script setup>
  let joincmsg = null;

  onMounted(() => {
    joincmsg = new Swiper(".joincmsg", {
      loop:true,
    });    

    let joinc = new Swiper(".joinc", {
      loop:true,
      pagination: {
        el: ".join-pagination",
        type: "fraction",
      },
      navigation: {
        nextEl: ".join-next",
        prevEl: ".join-prev",
      },
      controller:{
        control: joincmsg,
        by: 'container',
      },
    });

  })
</script>