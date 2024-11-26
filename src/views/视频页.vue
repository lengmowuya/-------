<script setup>

import { ref } from 'vue';
import axios from '@/net/net'; // 导入 Axios 实例

let videoList  = ref([]);
// console.log(videoList);

async function  getData(){
  const response = await axios.get('/api/videos');
  // console.log(response);
  // console.log(response.data);
  console.log(response.data.data);
  videoList.value= response.data.data;
}
getData();
</script>


<template>
  <div class="VideoCenter">
    <div id="pageCenter">
            <div class="title">
                <p class="main">空间站相关视频</p>
            </div>
        </div>
        <div id="List">
            <ul class="block">
                    <li v-for="(video,i) in videoList" :id="i">
                        <!-- <a :href="'/' + item.href + '.html' "> -->
                            <!-- <img class="cover" :src="item.imageSrc" alt="" class="personalMaster"> -->

                        <!-- </a> -->
                        <video   controls  >
                            <source  :src="video.attributes.videoLink" type="video/mp4">
                        </video>
                        <!-- <VideoPlayer /> -->
                        <div class="info">
                            <p class="userName">{{video.attributes.title}}</p>
                            <p class="describition">{{video.attributes.describition}}</p>
                            <!-- <p class="money">历史{{video.quota}}赞助</p> -->
                        </div>
                    </li>
            </ul>
        </div>
  </div>
</template>

<style>
.VideoCenter{
  width:100%;
  display:flex;
  /* align-items: center; */
  justify-content: center;
}
  #List {
    border-radius: 8px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    margin-bottom: 150px;
    position: relative;
    .block {
        /* padding: 10px 10px; */
        position: relative;
        z-index: 99;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        border-radius: 10px;
        align-items: center;
        justify-content: center;
        width: 100%;
        li {
            width: 100%;
            flex-direction: column;
            flex-grow: 1;
            align-items: center;
            margin: 6px;
            border-radius: 8px;
            margin-bottom: 10px;
            /* max-width: 50%; */
            /* padding: 16px; */
            box-sizing: border-box;
            position: relative;
            display: flex;
            transition: all 0.35s;
            min-width: 200px;
            opacity: 1;
            background: #010d1f99;
            box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
            .cover {
                border-radius: 6px;
                width: 100%;
                /* border: 3px solid #bfb343; */
                /* box-shadow: 0px 0px 9px #bfb343; */
                transition: all 0.2s;
                cursor: pointer;
                &:hover {
                    transform: scale(0.95);
                    opacity: 0.8;
                  }
              }
              video {
                width: 100%;
                border-radius: 6px;
                /* border: 2px solid #ebceb4;
                box-shadow: 0px 0px 12px rgba(255, 157, 0, 0.3); */
              }
              .info {
                display: flex;
                flex-direction: column;
                flex-grow: 1;
                line-height: 26px;
                align-items: center;
                justify-content: space-between;
                padding:20px;
                .userName {
                    color: #ebd3b4;
                    font-weight: bold;
                    font-size: 20px;
                    letter-spacing: 2px;
                    /* text-shadow: 0px 0px 6px rgb(255, 123, 0,0.3); */
                  }
                  .qq {
                    color: #fff;
                    font-size: 14px;
                    opacity: 0.5;
                    font-weight: normal;
                    margin-bottom: 10px;
                  }
                  .describition{
                    color:#fff;
                  }
              }
              .index {
                width: 100px;
                font-size: 64px;
                color: #fff;
                font-weight: bold;
                opacity: 0.4;
                flex-grow: 1;
                display: flex;
                justify-content: center;
                text-align: center;
                align-items: center;
                vertical-align: middle;
                margin-top: 10px;
                margin-right: 10px;
                user-select: none;
                transition: all 0.35s;
              }
          }
          
      }
  }

  @media screen and (max-width: 480px) {
    .title .main {
      font-size: 18px;
      margin-bottom: 0px;
    }
    #pageCenter {
      padding: 6px;
      padding-top: 20px;
    }
    #pageCenter .awardMoney {
      transform: scale(0.9);
    }
    #pageCenter .awardMoney .hintTitle {
      transform: scale(0.9);
    }
    #pageCenter .awardMoney .hintTitle .numberMoney {
      letter-spacing: 2px;
      font-size: 40px;
      margin: 0px 6px;
    }
    #pageCenter .awardMoney .hintTitle .small {
      flex-shrink: 0;
      line-height: 80px;
      font-size: 20px;
    }
    .rantInfo {
      margin-left: 15px;
      margin-right: 15px;
      font-size: 12px;
    }
    #List ul {
      padding: 4px;
    }
    #List ul li {
      margin: 4px;
      padding: 14px;
      flex-direction: column;
      align-items: center;
    }
    #List ul li .header {
      margin-top: 6px;
      width: 90px;
      height: 90px;
      border-width: 2px;
    }
    #List ul li .AwardBlock {
      width: 100%;
    }
    #List ul li .AwardBlock > span > p {
      width: 100%;
    }
    #List ul li .info {
      width: 200px;
      padding: 0;
      align-items: center;
    }
    #List ul li .info .userName {
      margin-top: 4px;
      font-size: 20px;
    }
    #List ul li .info .qq {
      font-size: 10px;
    }
    #List ul li .info .money {
      margin-top: 0px;
    }
    #List ul li .index {
      width: auto;
      height: auto;
      margin: 0;
      font-size: 26px;
      padding-right: 10px;
    }
  }
</style>
