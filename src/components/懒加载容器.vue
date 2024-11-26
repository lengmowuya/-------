<!-- LazyContainer.vue -->
<template>
    <div ref="container" class="lazy-container">
      <slot></slot>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const container = ref(null);
  const observer = ref(null);
  
  onMounted(() => {
    observer.value = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const item = entry.target;
          item.component = item.dataset.component;
          item.classList.remove('lazy-loaded');
          observer.value.unobserve(item);
        }
      });
    }, {
      rootMargin: '100px'
    });
  
    if (container.value) {
      const items = container.value.querySelectorAll('.lazy-loaded');
      items.forEach((item) => {
        observer.value.observe(item);
      });
    }
  });
  
  onUnmounted(() => {
    if (observer.value) {
      observer.value.disconnect();
    }
  });
  </script>
  
  <style>
  .lazy-container {
    /* 样式 */
  }
  </style>