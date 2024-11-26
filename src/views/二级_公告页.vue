<script setup>
  // import videoSrc from '@/assets/感染狂潮背景片段.mp4';
var videoSrc = "https://cn-sy1.rains3.com/webimage/%E6%84%9F%E6%9F%93%E7%8B%82%E6%BD%AE/%E6%84%9F%E6%9F%93%E7%8B%82%E6%BD%AE%E8%83%8C%E6%99%AF%E7%89%87%E6%AE%B5.mp4"

  import noticeBlock from '@/components/公告模块.vue';

  import { useCounterStore } from '@/stores/counter';
  const store  = useCounterStore();

  import { ref  } from 'vue';
  const noticeList = ref ([]);
  noticeList.value = store.noticeList;

  import { useRouter } from 'vue-router';
  

const router = useRouter();

function 返回首页() {
  router.push('/');
}


// import { ref } from 'vue';

</script>

<template>
  <div class="home">

    <video preload="auto"  autoplay loop playsinline webkit-playsinline>
      <source  :src="videoSrc" type="video/mp4">
    </video>
    <div class="pageCenter">



      <div class="noticeBlock">
        <div class="line">
          <p>全部公告</p>
          <button @click="返回首页">返回首页</button>
        </div>
        <div  class="noticeList lazy-container">
            
                <noticeBlock v-for="(item, index) in noticeList"  :key="index"  :notice="item" />

        </div>
        <p class="endHint">没有更多公告了</p>
      </div>

    </div>
  </div>
</template>

<style lang="less" scoped>
  .home{
    width:100%;
    // height:100vh;
    position:realtive;
    z-index:555;
    &>video{
      
      /* min-height:100%;
      min-width:100%;
      position:absolute;
      left:50%;
      top:50%;
      z-index:555;
      transform: translate(-50%,-50%);
      */


      position: fixed; /* Use fixed to make the video stay in place */
      right: 0;
      bottom: 0;
      min-width: 100%; 
      min-height: 100%;
      width: auto;
      height: auto;
      z-index: -100; /* Ensure the video stays behind the content */
      background-size: cover;
      opacity:0.6;
      filter:blur(3px)
    }
  }

  .pageCenter{
    max-width:1200px;
    margin:0 auto;
    overflow:hidden;
    position:realtive;
    z-index:666;
    background-color:#190a0099;
    min-height: 100%;
    // background:linear-gradient(0deg, rgba(0, 50, 100, 0.4) 0%, transparent 80%);
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.75);

  }

  .noticeBlock{
    display:flex;
    flex-direction: column;
    padding:20px;
    margin-top:20px;

    .line{
      padding:0px 30px;
      display:flex;
      justify-content: space-between;
      align-items: center;
      line-height: 20px;
      flex-direction: row;
      color:#fff;
      p{
        font-size:20px;
      }
    }
  }
  button{
      border-radius: 4px;
      transition: filter 350ms;
      background-color: transparent;
      background-repeat: no-repeat;
      background-size: calc(100% - 12px) 50px;
      background-position: center;
      color: rgb(255, 221, 153);
      position: relative;
      border:none;
      // padding:10px;
      transition:all 0.3s;
      cursor:pointer;
      font-weight: bold;
      padding:20px;
      // min-width: 80px;
      // min-height: 30px;
      letter-spacing: 4px;
      background-image:linear-gradient(180deg, rgba(0, 0, 0, 0.8), rgba(51, 31, 10, 0.8)), linear-gradient(0deg, rgba(153, 76, 0, 0), rgba(153, 76, 0, 0.3)), linear-gradient(0deg, rgba(153, 76, 0, 0.4), rgba(153, 76, 0, 0.4));
      &::after{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-position: left, right, center;
        background-size: 43px 100%, 43px 100%, calc(100% - 84px) 100%;
        background-image:url('./../assets/sc2_orange_button_left.png'), url(@/assets/sc2_orange_button_right.png), url(@/assets/sc2_orange_button_center.png);
      }
    &:hover{
      filter: brightness(1.5);
    }
    }
  .noticeList{
    // padding:20px;
    display:flex;
    flex-direction: row;
    color:#d9c29c;
    flex-wrap: wrap;
    padding-top:0;
    .notice{
      // margin:10px;
      // padding:20px;
      // width:33%;
      flex-basis: calc(33.333% - 20px);
      // box-sizing: border-box;
      // background-position: center top; 
      // background-repeat: no-repeat;
      // background-size: 120% 150%;
      // background-color:#00081999;
      // border:1px solid #9cafd9;
      // position: relative;
      // &::after{
      //   position: absolute;
      //   content: "";
      //   top: 0;
      //   left: 0;
      //   bottom: 0;
      //   right: 0;
      //   z-index: -1;
      //   opacity: 0.6;
      //   background:url(https://blz-contentstack-images.akamaized.net/v3/assets/blt0e00eb71333df64e/bltfeee6c9c950d5f08/66172805022c7292188800c5/social_footer_background_2600.webp); 
      // }
      // .name{
      //   color:#fff;
      // }
      // .contentText{
      //   white-space: pre-wrap;
      //   display: -webkit-box;
      //   -webkit-line-clamp: 20; /* 限制行数 */
      //   -webkit-box-orient: vertical;
      //   overflow: hidden; /* 隐藏超出部分 */
      //   text-overflow: ellipsis; /* 超出部分显示省略号 */
      //   line-height: 1.5; /* 行高，根据需要调整 */
      //   max-height: 30em; /* 最大高度，根据行高和行数计算 */
      // }
    }
    
  }
  .endHint{
    line-height: 400px;
    text-align: center;
    width: 100%;
    height:400px;
    color:#fff;
    opacity: 0.6;
    font-weight: bold;
    user-select: none;
  }
  .lazy-container{
    display:flex;
    flex-direction: row;
    color:#d9bd9c;
    flex-wrap: wrap;
    padding-top:0;
  }
  .lazy-loaded {
  height: 100px; /* 占位符高度，可以根据需要调整 */
  width: 100%;
  background-color: #f0f0f0; /* 占位符背景颜色 */
}
</style>
