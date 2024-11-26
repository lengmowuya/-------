<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import noticeDetailsDialog from '@/components/详细公告页.vue'
import { useCounterStore } from '@/stores/counter';
// const store  = useCounterStore();
// const showComponent = store.showComponent;

import { toRefs } from 'vue';

const store = useCounterStore();
const { showComponent } = toRefs(store);
</script>

<template>
  <!-- <nav>
    <div class="logo"><RouterLink to="/"><img src="./assets//空间站icon.png" alt=""></RouterLink></div>
    <ul>
      <li><RouterLink to="/"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-746b41f0=""><path fill="currentColor" d="M480 896V702.08A256.256 256.256 0 0 1 264.064 512h-32.64a96 96 0 0 1-91.968-68.416L93.632 290.88a76.8 76.8 0 0 1 73.6-98.88H256V96a32 32 0 0 1 32-32h448a32 32 0 0 1 32 32v96h88.768a76.8 76.8 0 0 1 73.6 98.88L884.48 443.52A96 96 0 0 1 792.576 512h-32.64A256.256 256.256 0 0 1 544 702.08V896h128a32 32 0 1 1 0 64H352a32 32 0 1 1 0-64h128zm224-448V128H320v320a192 192 0 1 0 384 0zm64 0h24.576a32 32 0 0 0 30.656-22.784l45.824-152.768A12.8 12.8 0 0 0 856.768 256H768v192zm-512 0V256h-88.768a12.8 12.8 0 0 0-12.288 16.448l45.824 152.768A32 32 0 0 0 231.424 448H256z"></path></svg>首页</RouterLink></li>
      <li><RouterLink to="/video"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-746b41f0=""><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm-48-247.616L668.608 512 464 375.616v272.768zm10.624-342.656 249.472 166.336a48 48 0 0 1 0 79.872L474.624 718.272A48 48 0 0 1 400 678.336V345.6a48 48 0 0 1 74.624-39.936z"></path></svg>视频</RouterLink></li>
    </ul>
  </nav> -->
  <div class="Page">
    <RouterView/>
  </div>
  <footer>
    <p class="main">©2024冷漠乌鸦版权所有,QQ:3537168410</p>
    <!-- <a target="_blank" href="http://103.106.190.210:1337/admin">后台管理</a> -->
  </footer>
  <!-- <noticeDetailsDialog v-if="showComponent" /> -->
</template>

<style lang="less">
*{
  margin:0;
  padding:0;
}
// body::-webkit-scrollbar{
//   display:none;
// }
nav{
  // height:55px;
  background:#000719;
  border-bottom:solid 1px rgba(255,255,255,.15);
  // padding:0px 40px;
  box-sizing: border-box  ;
  // display: flex;
  position: relative;
  z-index:999;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo{
       height: 100%;
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
      img{
      // width:300px;
          height: 75px;
      }
      &:hover{
        opacity: 0.6;
      }
  }
  ul{
      max-width: 1000px;
      display:flex;
      list-style: none;
      margin:0 auto;
      justify-content: center;
      position: relative;
      z-index: 99999;
      li{
          font-size: 18px;
          color:rgba(255,255,255,.7);
          line-height: 55px;
          height:55px;
          // margin:0px 10px;
          width:160px;
          text-align: center;
          cursor: pointer;
          font-weight: bold;
          box-sizing: border-box;
          transition: all 0.35s;
          svg{
            width:20px;
            margin-right: 4px;
          }
          a{
              width:100%;
              height:100%;
              color:rgba(255,255,255,.7);
              text-decoration: none;
              // padding:0px 10px;
              line-height: 55px;
              display:flex;
              align-items: center;
              justify-content: center;
              &.router-link-active{
                background-color:#ff7300;
                border-bottom:4px solid #d16d03;
                text-shadow: 0 0 15px #fff, 0 0 30px rgb(255 255 255 / 30%);
                color:#fff;
                a{

                }
            }
              i{
                  font-size: 24px;
                  margin-right: 4px;
                  margin-top: 2px;
              }
          }

          &:hover{
              // background-color:#006499;
              background:#602602;
              opacity: 0.7;
              // text-decoration: underline;

          }
      }
  }
}
@media screen and (max-width:1100px){
  .nav{
      .logo{
          display: none;
      }
  }
}
@media screen and (max-width:480px){
  .nav{
      position: fixed;
      width: 100%;
      left:0px;
      bottom:0px;
      z-index: 999;
      box-shadow:0px 0px  12px #034bd1;

      .logo{
          display: none;
      }
  }
}
@media screen and (max-width:350px){
  .nav{
      position: fixed;
      width: 100%;
      left:0px;
      bottom:0px;
      z-index: 999;
      box-shadow:0px 0px  12px #0360d1;
      a{
          i{
              display: none;
          }
      }
      .logo{
          display: none;
      }
  }
}
.Page{
  min-height: 100vh;
  position:relative;
  height:100%;
  display:flex;
}
html{
  z-index:-900;
  background:#020f35;
}
footer{
  min-height:65px;
  background:#00021999;
  border-top:solid 1px rgba(255,255,255,.15);
  color:#6c8dc68a;
  padding:10px;
  text-align: center;
  font-size:14px;
  line-height: 30px;;
  position:relative;
  z-index:999;
  box-sizing: border-box;
  left:0;
  top:0;
  .main{
    font-size:16px;
    span{
      font-size:20px;
      font-weight: bold;
    }
  }
}
</style>
