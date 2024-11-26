<script setup>

  // import videoSrc from '@/assets/感染狂潮背景片段.mp4';
  import noticeBlock from '@/components/公告模块.vue';

var videoSrc = "https://cn-sy1.rains3.com/webimage/%E6%84%9F%E6%9F%93%E7%8B%82%E6%BD%AE/%E6%84%9F%E6%9F%93%E7%8B%82%E6%BD%AE%E8%83%8C%E6%99%AF%E7%89%87%E6%AE%B5.mp4"
  import { useCounterStore } from '@/stores/counter';
  const store  = useCounterStore();
  import { reactive  } from 'vue';
  // const noticeList = reactive ([]);
  // noticeList = store.noticeList;
  console.log(store.noticeList);


  import { useRouter } from 'vue-router';
  const router = useRouter();
  function 去公告页() {
    router.push('/notice');
  }

    import { ref } from 'vue';
    import axios from '@/net/net'; // 导入 Axios 实例
    let playerList  = ref([]);
    async function  getData(){
      const response = await axios.get('/api/players?populate=*');
      // console.log(response);
      playerList.value= response.data.data;
      playerList.value.forEach((item,i)=>{
        let newItem = item.attributes
        playerList.value[i] = newItem;
        if(newItem.headerImg.data != null){
          // 有自定义用自定义头像
          newItem.headerImg = "http://103.106.190.210:1337" + newItem.headerImg.data.attributes.url;
        }else{
          // 默认qq头像
          newItem.headerImg = `https://q4.qlogo.cn/g?b=qq&nk=${newItem.qq}&s=140`
        }
      })
  // console.log(playerList.value);
}
getData();

</script>

<template>
  <div class="home">

    <video preload="auto"  autoplay loop playsinline webkit-playsinline >
      <source  :src="videoSrc" type="video/mp4">
    </video>
    <div class="pageCenter">
      <div class="logo">
        <img src="./../assets//空间站icon.png" alt=""><h1>欢迎来到星际云存档备份官网</h1>
      </div>
      
      <button>点击以下载最新版本</button>
      <p>最新版本:云存档0.2</p>
      <p class="hint">
        1.修复了若干提示无效问题 
        2.为不同页面设置不同页面背景
        3.增加页面提示音
        4.修复提示不会消失的问题
        5.修复退出账号后账号异常显示的问题
      </p>
     



    </div>
  </div>
</template>

<style lang="less" scoped>

.logo{
      //  height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      // position: absolute;
      // left:0px;
      // top:0px;
      // width:300px;
      padding:0px 30px;
      margin:0px 0;
      // background:#0064ff;
      transition: all 0.3s;
      vertical-align: middle;
      img{
      // width:300px;
          height: 40px;
          margin-right: 6px;
          border-radius: 6px;
          margin-top: 4px;
          box-shadow: 3px 3px 24px #ffffff33;
          border:2px solid #ffffff99;
      }
      h1{
      font-weight: bold;
      letter-spacing: 2px;
    }
      &:hover{
        opacity: 0.6;
      }
  }
  .home{
    width:100%;
    // height:100vh;
    position:realtive;
    z-index:555;
    &>video{
      


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
    // background-color:#190c0099;
    color:#fff;
    min-height: 100%;
    // background:linear-gradient(0deg, rgba(0, 50, 100, 0.4) 0%, transparent 80%);
    // box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.75);
    display: flex;
   align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    padding-top:60px;
    &>*{
      margin:10px;
    }

    .hint{
      border:1px solid silver;
      border-radius: 3px;
      padding:20px;
      margin:30px;
      white-space: pre-wrap ;
      overflow-wrap: break-word; /* 在长单词或URL内部进行换行 */
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
        background-image: url('./../assets/sc2_orange_button_left.png'), url(@/assets/sc2_orange_button_right.png), url(@/assets/sc2_orange_button_center.png);
      }
    &:hover{
      filter: brightness(1.5);
    }
    }
  .noticeList{
    padding:20px;
    display:flex;
    flex-direction: row;
    color:#d9b39c;
    padding-top:0;

    
  }
</style>
