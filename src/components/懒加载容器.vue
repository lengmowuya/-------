<template>
  <div class="lazy-container" ref="container">
    <div v-if="isVisible" class="content">
      <slot></slot>
    </div>
    <div v-else class="placeholder">
      <!-- 占位符内容 -->
      <div class="loading-skeleton"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isVisible = ref(false)
const container = ref<HTMLElement>()
let observer: IntersectionObserver | null = null

const createObserver = () => {
  const options = {
    root: null,
    rootMargin: '100px', // 提前100px开始加载
    threshold: 0.1
  }
  
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible.value = true
        if (observer && entry.target) {
          observer.unobserve(entry.target)
        }
      }
    })
  }, options)
  
  if (container.value) {
    observer.observe(container.value)
  }
}

onMounted(() => {
  // 使用 requestIdleCallback 优化性能
  if ('requestIdleCallback' in window) {
    requestIdleCallback(createObserver)
  } else {
    setTimeout(createObserver, 0)
  }
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped lang="less">
.lazy-container {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.placeholder {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.loading-skeleton {
  width: 80%;
  height: 60%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 25%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.1) 75%
  );
  background-size: 200% 100%;
  animation: loading 2s infinite ease-in-out;
  border-radius: 8px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.content {
  width: 100%;
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式优化 */
@media (max-width: 768px) {
  .lazy-container {
    min-height: 150px;
  }
  
  .placeholder {
    height: 150px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .loading-skeleton {
    animation: none;
  }
  
  .content {
    animation: none;
  }
}
</style>