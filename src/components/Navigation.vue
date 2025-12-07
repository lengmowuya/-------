<template>
  <nav class="navigation" :class="{ 'scrolled': isScrolled }">
    <div class="nav-container">
      <!-- Logo区域 -->
      <div class="nav-logo">
        <router-link to="/" class="logo-link">
          <img src="@/assets/空间站icon.png" alt="星际云存档" class="logo-img" />
          <span class="logo-text">星际云存档</span>
        </router-link>
      </div>

      <!-- 导航菜单 -->
      <div class="nav-menu" :class="{ 'active': isMobileMenuOpen }">
        <router-link to="/" class="nav-link" @click="closeMobileMenu">
          <el-icon><House /></el-icon>
          <span>首页</span>
        </router-link>
        

        
        <a href="#" class="nav-link" @click="downloadApp">
          <el-icon><Download /></el-icon>
          <span>下载客户端</span>
        </a>
      </div>

      <!-- 移动端菜单按钮 -->
      <div class="mobile-menu-btn" @click="toggleMobileMenu">
        <el-icon><Menu /></el-icon>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { House, Download, Menu } from '@element-plus/icons-vue'
import { clientVersionAPI } from '@/services/api'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:3002'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const latestDownloadUrl = ref('')

const getFullUrl = (url: string) => {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${API_BASE}${url}`
}

// 获取最新版本下载链接
const getLatestVersion = async () => {
  try {
    const response = await clientVersionAPI.getLatestVersion()
    if (response.success && response.data?.download_url) {
      latestDownloadUrl.value = response.data.download_url
    }
  } catch (error) {
    console.error('获取最新版本失败:', error)
  }
}

// 监听滚动事件
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// 切换移动端菜单
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// 关闭移动端菜单
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// 下载应用
const downloadApp = () => {
  const url = latestDownloadUrl.value 
    ? getFullUrl(latestDownloadUrl.value)
    : 'http://103.149.201.158:10888/down/R5emvJy2CUI5.zip'
  window.open(url, '_blank')
  closeMobileMenu()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
  getLatestVersion()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="less">
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &.scrolled {
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(20px);
    border-bottom-color: rgba(0, 212, 255, 0.3);
  }
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.nav-logo {
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
}

.logo-img {
  width: 40px;
  height: 40px;
  margin-right: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 212, 255, 0.3);
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #00d4ff, #0099cc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 20px;
    gap: 20px;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;

    &.active {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
  }
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  border-radius: 25px;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    color: #00d4ff;
    background: rgba(0, 212, 255, 0.1);
    transform: translateY(-2px);
  }

  &.router-link-active {
    color: #00d4ff;
    background: rgba(0, 212, 255, 0.2);
  }

  .el-icon {
    font-size: 18px;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    padding: 15px 20px;
    font-size: 1.1rem;
  }
}

.mobile-menu-btn {
  display: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .el-icon {
    font-size: 24px;
  }

  @media (max-width: 768px) {
    display: block;
  }
}
</style>