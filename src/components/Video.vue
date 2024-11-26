<template>
    <video ref="videoPlayer" class="video-js" controls>
      <!-- Video source and tracks go here -->
    </video>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import videojs from 'video.js';
  import 'video.js/dist/video-js.css'; // 引入 Video.js 的样式
  
  const videoPlayer = ref(null);
  
  onMounted(() => {
    videoPlayer.value = videojs(videoPlayer.value, {
      // Video.js options
    });
  });
  
  onUnmounted(() => {
    if (videoPlayer.value) {
      videoPlayer.value.dispose();
    }
  });
  </script>
  
  <style>
  /* 你的样式 */
  .video-js {
    width: 100%;
    height: auto;
  }
  </style>