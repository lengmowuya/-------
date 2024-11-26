<script setup>
// import { defineProps } from 'vue';

// defineProps({
//   notice: {
//     type: Object,
//     required: true
//   }
// });
console.log("eee");
import { useCounterStore } from '@/stores/counter';
const store  = useCounterStore();
const toggleComponent = store.toggleComponent;
const notice = store.notice
</script>

<template>
    <div class="DetailsBackground" @click="()=>{toggleComponent(notice)}">
        <div class="noticeDetails" @click.stop="()=>{}">
                <!-- <img :src="`https://q4.qlogo.cn/g?b=qq&nk=${item.qq}&s=140`" alt=""> -->
                <div class="notice_details">
                    <div class="noticeTitleLine">
                        <p class="name">{{ notice.title }}</p>
                        <button @click="()=>{toggleComponent(notice)}">隐藏</button>
                    </div>
                    <p class="date"><span class="writer">作者:春末</span><span class="noticeType">公告类型:{{ notice.noticeType.slice(1) }}</span>{{ notice.dateTime }}</p>
                    <hr>
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
                <p class="endHint">
                    点击背景空白处关闭
                </p>
        </div>
    </div>
</template>

<style lang="less" scoped>
.DetailsBackground{
    width:100%;
    flex-grow: 1;
    height:100%;
    background:#000000aa;
    position: fixed;
    left:0;
    top:0;
    right:0;
    bottom:0;
    z-index: 9999;
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction:row;
}
    .noticeDetails{
    //   margin:10px;
      padding:20px;
      width:100%;
        max-width: 1200px;
      background-position: center top; 
      background-repeat: no-repeat;
      background-size: 120% 150%;
      // background-color:#00081999;
    //   border:1px solid #9cafd9;
    margin:30px;
        border-radius: 4px;
     border:3px solid #d9b89c99;
     padding:30px;

      cursor: pointer;
      transition:all .3s;
      flex-grow: 1;
      display:flex;
      position: relative;
      flex-direction: column;
      animation: scale-animation 0.5s forwards;
      &::after{
            position: absolute;
            content: "";
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: -1;
            opacity: 0.85;
            filter:blur(5px);
            background:url(@/assets/blurry_glass_background_2600.png); 
        }
    //   &:hover{
    //     opacity: 0.6;
    //     transform: translateX(1.5);
    //   }
      .name{
        color:#fff;
        font-size:30px;
        font-weight: bold;
      }
      .contentText{
        padding:20px;
        white-space: pre-wrap;
        display: -webkit-box;
        -webkit-line-clamp: 20; /* 限制行数 */
        -webkit-box-orient: vertical;
        overflow: hidden; /* 隐藏超出部分 */
        text-overflow: ellipsis; /* 超出部分显示省略号 */
        line-height: 2; /* 行高，根据需要调整 */
        max-height: 40em; /* 最大高度，根据行高和行数计算 */
        color:#fff;
        overflow-y: auto;
        flex-shrink: 0;
        flex-grow: 1;
        font-size:18px;
        height: 100%;
        // box-shadow: 0px 4px 10px 0px rgba(114, 158, 245, 0.439) inset;
        // padding:30px;
        border-radius: 6px;
        // margin:20px 60px;
        // border:1px solid #9cafd999;
      position: relative;
        // &::after{
        //     position: absolute;
        //     content: "";
        //     top: 0;
        //     left: 0;
        //     bottom: 0;
        //     right: 0;
        //     z-index: -1;
        //     opacity: 1;
        //     // transform: rotateZ(65deg);
        //     background:url(https://blz-contentstack-images.akamaized.net/v3/assets/blt0e00eb71333df64e/bltfeee6c9c950d5f08/66172805022c7292188800c5/social_footer_background_2600.webp); 
        // }

      }
    }
    .notice_details{
        flex-grow: 1;
        height: 100%;
        display:flex;
        flex-direction: column;
    }
    .endHint{
    // line-height: 50px;
    text-align: center;
    width: 100%;
    // height:50px;
    color:#fff;
    opacity: 0.3;
    font-weight: bold;
    user-select: none;
  }
  .noticeTitleLine{
        display:flex;
        align-items: center;
        justify-content: space-between;
        button{
          transition:all .3s;
          // display:none;
        //   opacity: 0;
            padding:10px;
          cursor: pointer;
        }
      }
.date{
  color:#fff;
  opacity: 0.6;
  margin-bottom:20px;
  .writer{
    padding-right: 20px;
  }
  .noticeType{
    padding-right: 20px;
  }
}
hr{
  opacity: 0.2;
  margin-bottom:20px;

}
@keyframes scale-animation {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
