<script setup>
import { defineProps } from 'vue';


defineProps({
  notice: {
    type: Object,
    required: true
  }
});
// var showDetails = false;

import { useCounterStore } from '@/stores/counter';
const store  = useCounterStore();
const toggleComponent = store.toggleComponent;

</script>

<template>
  <div class="notice">
        <!-- <img :src="`https://q4.qlogo.cn/g?b=qq&nk=${item.qq}&s=140`" alt=""> -->
        <div class="notice_details">
          <div class="noticeTitleLine">
            <p class="name">{{ notice.title }}</p>
            <button @click="()=>{toggleComponent(notice)}">查看详细</button>
          </div>
          <p class="date">{{ notice.dateTime }}</p>
          <!-- <div class="contentText" v-for="item in notice.contentText" :key="item.type">
            <p v-if="item.type === 'paragraph'">
              <span v-for="child in item.children" :key="child.text">
                <span v-if="child.bold" :style="{ fontWeight: 'bold' }">{{ child.text }}</span>
                <span v-else>{{ child.text }}</span>
              </span>
            </p>
          </div> -->
          <p class="contentText">{{ notice.contentText }}</p>
          <!-- <p class="qq">{{ item.qq }}</p> -->
        </div>
        
  </div>
</template>

<style lang="less" scoped>
    .notice{
      margin:10px;
      padding:20px;
      width:33%;
      background-position: center top; 
      background-repeat: no-repeat;
      background-size: 120% 150%;
      // background-color:#00081999;
      outline:1px solid #d9c19c;
      position: relative;
      // cursor: pointer;
      transition:all .3s;
      border-radius: 4px;
      animation: scale-animation 0.5s forwards;
      top:0;
      left:0;
      &::after{
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -1;
        opacity: 0.6;
        background:url(@/assets/blurry_glass_background_2600.png); 
        background-color: rgba(255, 99, 71, 0.524);
      }
      &:hover{
        opacity: 0.9;
        transform: translateX(1.5);
        button{
          // display:block !important;
          opacity: 1  !important;
          // padding:10px;
          // transform: translate(1.2,1.2,1);
        }
      }
      .name{
        color:#fff;
        font-size: 18px;
      }
      .noticeTitleLine{
        display:flex;
        align-items: center;
        justify-content: space-between;
        button{
          transition:all .3s;
          // display:none;
          opacity: 0;
          cursor: pointer;
          padding:4px;
        }
      }
      .contentText{
        white-space: pre-wrap;
        display: -webkit-box;
        -webkit-line-clamp: 20; /* 限制行数 */
        -webkit-box-orient: vertical;
        overflow: hidden; /* 隐藏超出部分 */
        text-overflow: ellipsis; /* 超出部分显示省略号 */
        line-height: 1.5; /* 行高，根据需要调整 */
        max-height: 30em; /* 最大高度，根据行高和行数计算 */
      }
    }
    @keyframes scale-animation {
  from {
    // transform: scale(0.8);
    opacity: 0;
    top:50px;
  }
  to {
    // transform: scale(1);
    opacity: 1;
    top:0px;

  }
}
</style>
