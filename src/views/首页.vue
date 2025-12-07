<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from '@/net/net.js'
import { clientVersionAPI, announcementAPI, statsAPI, activityAPI, screenshotAPI, siteConfigAPI } from '@/services/api'

interface Activity {
  id: number
  name: string
  quota: string
  href: string
  imageSrc: string
}

interface VersionUpdate {
  _id: string
  version: string
  title: string
  release_date: string
  description: string
  download_url?: string
  is_latest?: boolean
}

interface Announcement {
  _id: string
  title: string
  content: string
  summary?: string
  publish_date: string
  is_pinned: boolean
}

interface Screenshot {
  id: number
  url: string
  title: string
  description: string
}

interface StatData {
  userCount: number
  saveCount: number
  saveFileCount: number
  packageCount: number
}



const videoSrc = ref('https://sc2cloudsave.cn-sy1.rains3.com/Starcraft%20II%20Legacy%20of%20the%20Void%20Intro%20Cinematic.mp4')
const activityList = ref<Activity[]>([])
const statsData = ref<StatData>({
  userCount: 0,
  saveCount: 0,
  saveFileCount: 0,
  packageCount: 0
})

// 游戏截图轮播数据
const screenshots = ref<Screenshot[]>([])

// 网站配置数据
const siteConfig = ref({
  site_title: '易星际',
  site_slogan: '专业的星际争霸2存档管理平台',
  site_description: '',
  qq_number: '',
  qq_group: '665070668',
  contact_email: '',
  copyright: '© 2024 易星际 All Rights Reserved',
  disclaimer: ''
})

// 默认截图数据（后端无数据时使用）
const defaultScreenshots: Screenshot[] = [
  { id: 1, url: 'https://sc2cloudsave.cn-sy1.rains3.com/QQ20250702-014436.png', title: '游戏主界面', description: '易星际客户端主界面展示' },
  { id: 2, url: 'https://sc2cloudsave.cn-sy1.rains3.com/QQ20250702-014445.png', title: '存档管理', description: '便捷的存档管理功能' },
  { id: 3, url: 'https://sc2cloudsave.cn-sy1.rains3.com/地图封面.jpg', title: '地图支持', description: '支持多种热门地图' },
  { id: 4, url: 'https://sc2cloudsave.cn-sy1.rains3.com/空间站icon.png', title: '云端同步', description: '安全可靠的云端存档同步' }
]

// 版本更新公告数据
const versionUpdates = ref<VersionUpdate[]>([])
const announcements = ref<Announcement[]>([])
const latestVersion = ref<VersionUpdate | null>(null)



// 获取版本更新数据
const getVersionUpdates = async () => {
  try {
    const response = await clientVersionAPI.getVersions({ limit: 6 })
    if (response.success) {
      versionUpdates.value = response.data.versions
    }
  } catch (error) {
    console.error('获取版本更新失败:', error)
    // 保留原有的默认数据作为fallback
    versionUpdates.value = [
      {
        _id: '1',
        version: 'v1.0.0',
        title: '正式版发布',
        release_date: '2024-01-15',
        description: '1.正式版本发布，功能稳定可靠\n2.完善的用户界面和交互体验',
        download_url: 'http://103.149.201.158:10888/down/R5emvJy2CUI5.zip',
        is_latest: true
      }
    ]
  }
}

// 获取最新版本
const getLatestVersionInfo = async () => {
  try {
    const response = await clientVersionAPI.getLatestVersion()
    if (response.success) {
      latestVersion.value = response.data
    }
  } catch (error) {
    console.error('获取最新版本失败:', error)
  }
}

// 获取公告数据
const getAnnouncements = async () => {
  try {
    const response = await announcementAPI.getAnnouncements({ limit: 5, pinned_first: true })
    if (response.success) {
      announcements.value = response.data.announcements
    }
  } catch (error) {
    console.error('获取公告失败:', error)
  }
}

// 获取统计数据
const getStatsData = async () => {
  try {
    // 调用后端SC2CloudServer的统计接口
    const response = await statsAPI.getStats()
    const backendData = response.data
    
    // 根据后端返回的数据结构映射到前端显示
    statsData.value = {
      userCount: backendData.totalUsers || 0,
      saveCount: backendData.totalCloudSaves || 0,
      saveFileCount: backendData.totalSaveFiles || 0,
      packageCount: backendData.totalCloudPackages || 0
    }
  } catch (error) {
    console.error('获取统计数据失败:', error)
    // 如果API失败，使用默认数据
    statsData.value = {
      userCount: 10000,
      saveCount: 50000,
      saveFileCount: 25000,
      packageCount: 5000
    }
  }
}

// 格式化数字显示
const formatNumber = (num: number): string => {
  if (num >= 10000) {
    return Math.floor(num / 1000) + 'K+'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// 获取活动列表
const getActivityList = async () => {
  try {
    const response = await axios.get('/api/activities?populate=*')
    activityList.value = response.data.data.map((item: any) => ({
      id: item.id,
      name: item.attributes.name,
      quota: item.attributes.quota,
      href: item.attributes.href,
      imageSrc: item.attributes.cover?.data?.attributes?.url || ''
    }))
  } catch (error) {
    console.error('获取活动列表失败:', error)
    // 如果API失败，使用默认数据 - 恢复原来的三个地图信息
    activityList.value = [
      {
        id: 1,
        name: '感染狂潮',
        quota: '665070668',
        href: 'https://qm.qq.com/cgi-bin/qm/qr?k=xxx',
        imageSrc: 'https://sc2cloudsave.cn-sy1.rains3.com/地图封面.jpg'
      },
      {
        id: 2,
        name: '直升机大战',
        quota: '123456789',
        href: 'https://qm.qq.com/cgi-bin/qm/qr?k=yyy',
        imageSrc: 'https://sc2cloudsave.cn-sy1.rains3.com/直升机大战.jpg'
      },
      {
        id: 3,
        name: '合作任务',
        quota: '987654321',
        href: 'https://qm.qq.com/cgi-bin/qm/qr?k=zzz',
        imageSrc: 'https://sc2cloudsave.cn-sy1.rains3.com/合作任务.jpg'
      }
    ]
  }
}

// API基础地址和URL处理
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:3002'

const getFullUrl = (url: string) => {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${API_BASE}${url}`
}

// 下载最新版本
const downloadLatestVersion = () => {
  if (latestVersion.value?.download_url) {
    window.open(getFullUrl(latestVersion.value.download_url), '_blank')
  } else {
    // 如果没有最新版本信息，使用默认下载链接
    window.open('http://103.149.201.158:10888/down/R5emvJy2CUI5.zip', '_blank')
  }
}

// 下载应用（保持兼容性）
const downloadApp = () => {
  downloadLatestVersion()
}

// 获取截图数据
const getScreenshots = async () => {
  try {
    const response = await screenshotAPI.getScreenshots()
    if (response.success && response.data.screenshots.length > 0) {
      screenshots.value = response.data.screenshots.map((s: any, index: number) => ({
        id: index + 1,
        url: getFullUrl(s.url),
        title: s.title,
        description: s.description
      }))
    } else {
      screenshots.value = defaultScreenshots
    }
  } catch (error) {
    console.error('获取截图失败:', error)
    screenshots.value = defaultScreenshots
  }
}

// 获取网站配置
const getSiteConfig = async () => {
  try {
    const response = await siteConfigAPI.getAll()
    if (response.success && response.data) {
      Object.assign(siteConfig.value, response.data)
    }
  } catch (error) {
    console.error('获取网站配置失败:', error)
  }
}

onMounted(() => {
  getVersionUpdates()
  getLatestVersionInfo()
  getAnnouncements()
  getActivityList()
  getSiteConfig()
  getStatsData()
  getScreenshots()
})



</script>

<template>
  <div class="home">
    <!-- 英雄区域 -->
    <section class="hero-section">
      <div class="hero-background">
        <video preload="auto" autoplay loop playsinline webkit-playsinline>
          <source :src="videoSrc" type="video/mp4">
        </video>
        <div class="hero-overlay"></div>
      </div>
      
      <div class="hero-content">
        <div class="hero-logo">
          <img src="./../assets//空间站icon.png" alt="星际云存档" class="logo-image" />
        </div>
        
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="title-main">{{ siteConfig.site_title }}</span>
            <span class="title-sub">{{ siteConfig.site_slogan }}</span>
          </h1>
          

          
          <div class="hero-actions">
            <button class="download-btn" @click="downloadLatestVersion">
              立即下载客户端
            </button>
          </div>
          
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number">{{ formatNumber(statsData.userCount) }}</span>
              <span class="stat-label">注册用户</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ formatNumber(statsData.saveCount) }}</span>
              <span class="stat-label">云存档</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ formatNumber(statsData.saveFileCount) }}</span>
              <span class="stat-label">存档文件</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ formatNumber(statsData.packageCount) }}</span>
              <span class="stat-label">存档包</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 游戏截图轮播区域 -->
    <section class="gallery-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">应用截图</h2>
          <p class="section-subtitle">体验易星际的强大功能</p>
        </div>
        
        <div class="carousel-wrapper">
          <el-carousel 
            :interval="4000" 
            :arrow="'hover'" 
            indicator-position="outside"
            height="400px"
            class="screenshot-carousel"
          >
            <el-carousel-item v-for="screenshot in screenshots" :key="screenshot.id">
              <div class="carousel-slide">
                <div class="screenshot-wrapper">
                  <img :src="screenshot.url" :alt="screenshot.title" class="screenshot-image" />
                  <div class="screenshot-overlay">
                    <div class="screenshot-info">
                      <h3 class="screenshot-title">{{ screenshot.title }}</h3>
                      <p class="screenshot-description">{{ screenshot.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </section>

    <!-- 版本更新公告区域 -->
    <section class="announcement-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">版本更新</h2>
          <p class="section-subtitle">持续优化，为您提供更好的体验</p>
        </div>
        
        <div class="updates-grid">
          <div 
            v-for="update in versionUpdates" 
            :key="update._id" 
            class="update-card"
            :class="{ 'latest': update.is_latest }"
          >
            <div class="update-header">
              <div class="version-info">
                <span class="version-tag" :class="{ 'latest-tag': update.is_latest }">
                  {{ update.version }}
                </span>
                <span class="latest-badge" v-if="update.is_latest">最新版本</span>
              </div>
              <span class="update-date">{{ new Date(update.release_date).toLocaleDateString('zh-CN') }}</span>
            </div>
            
            <div class="update-content">
              <h3 class="update-title">{{ update.title }}</h3>
              <div class="update-description">
                <p v-for="(line, index) in update.description.split('\n')" :key="index" class="description-line">
                  {{ line }}
                </p>
              </div>
            </div>
            
            <div class="update-actions" v-if="update.download_url">
              <a :href="getFullUrl(update.download_url)" class="download-link" target="_blank">
                <el-button type="primary" class="download-button">
                  <span class="download-icon">⬇</span>
                  下载 {{ update.version }}
                </el-button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 支持的地图区域 -->
    <section class="maps-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">支持的地图</h2>
          <p class="section-subtitle">覆盖热门地图，满足不同玩家需求</p>
        </div>
        
        <div class="maps-grid">
          <div class="map-card" v-for="map in activityList" :key="map.name">
            <div class="map-image-wrapper">
              <img :src="map.imageSrc" :alt="map.name" class="map-cover" />
              <div class="map-overlay">
                <a :href="map.href" class="map-link">查看详情</a>
              </div>
            </div>
            <div class="map-info">
              <h3 class="map-name">《{{map.name}}》</h3>
              <p class="map-description">官方QQ群 {{map.quota}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 公告区域 -->
    <section class="announcements-section" v-if="announcements.length > 0">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">最新公告</h2>
          <p class="section-subtitle">了解最新动态和重要通知</p>
        </div>
        
        <div class="announcements-list">
          <div 
            v-for="announcement in announcements" 
            :key="announcement._id" 
            class="announcement-card"
            :class="{ 'pinned': announcement.is_pinned }"
          >
            <div class="announcement-header">
              <h3 class="announcement-title">
                <span v-if="announcement.is_pinned" class="pin-badge">📌 置顶</span>
                {{ announcement.title }}
              </h3>
              <span class="announcement-date">{{ new Date(announcement.publish_date).toLocaleDateString('zh-CN') }}</span>
            </div>
            <p class="announcement-summary">{{ announcement.summary || announcement.content.slice(0, 100) + '...' }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚区域 -->
    <footer class="site-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-info">
            <p v-if="siteConfig.qq_group">官方QQ群: {{ siteConfig.qq_group }}</p>
            <p v-if="siteConfig.contact_email">联系邮箱: {{ siteConfig.contact_email }}</p>
          </div>
          <div class="footer-copyright">
            <p>{{ siteConfig.copyright }}</p>
            <p class="disclaimer" v-if="siteConfig.disclaimer">{{ siteConfig.disclaimer }}</p>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>

<style scoped lang="less">
.home {
  min-height: 100vh;
  background: #0a0a0a;
}

/* 公告区域 */
.announcements-section {
  background: #0a0a0a;
  padding: 80px 0;
}

.announcements-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.announcement-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.announcement-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(0, 212, 255, 0.3);
}

.announcement-card.pinned {
  border-color: rgba(255, 193, 7, 0.5);
  background: rgba(255, 193, 7, 0.05);
}

.announcement-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.announcement-title {
  font-size: 1.2rem;
  color: white;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.pin-badge {
  font-size: 0.9rem;
}

.announcement-date {
  color: #888;
  font-size: 0.9rem;
}

.announcement-summary {
  color: #b0b0b0;
  line-height: 1.6;
  margin: 0;
}

/* 页脚区域 */
.site-footer {
  background: #050505;
  padding: 40px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-content {
  text-align: center;
}

.footer-info {
  margin-bottom: 20px;
}

.footer-info p {
  color: #888;
  margin: 5px 0;
}

.footer-copyright p {
  color: #666;
  margin: 5px 0;
  font-size: 0.9rem;
}

.footer-copyright .disclaimer {
  font-size: 0.8rem;
  color: #555;
}

/* 英雄区域 */
.hero-section {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.hero-background video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 20px;
}

.hero-logo {
  margin-bottom: 30px;
}

.logo-image {
  width: 80px;
  height: 80px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
}

.hero-title {
  margin-bottom: 20px;
}

.title-main {
  display: block;
  font-size: 4rem;
  font-weight: 700;
  background: linear-gradient(135deg, #00d4ff, #0099cc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
}

.title-sub {
  display: block;
  font-size: 1.5rem;
  font-weight: 300;
  color: #e0e0e0;
  opacity: 0.9;
}

.hero-description {
  font-size: 1.2rem;
  color: #b0b0b0;
  margin-bottom: 40px;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 60px;
  flex-wrap: wrap;
}

.download-btn, .learn-more-btn, .cta-button {
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.download-btn, .cta-button {
  background: linear-gradient(135deg, #00d4ff, #0099cc);
  color: white;
  box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
}

.download-btn:hover, .cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 212, 255, 0.4);
}

.learn-more-btn {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.learn-more-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 60px;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: #00d4ff;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9rem;
  color: #b0b0b0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* 通用容器和区域样式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

section {
  padding: 80px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 15px;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #b0b0b0;
  max-width: 600px;
  margin: 0 auto;
}

/* 应用截图轮播区域 */
.gallery-section {
  background: #111;
}

.carousel-wrapper {
  max-width: 1000px;
  margin: 0 auto;
}

.screenshot-carousel {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.carousel-slide {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.screenshot-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.screenshot-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.screenshot-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 30px;
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.screenshot-wrapper:hover .screenshot-image {
  transform: scale(1.05);
}

.screenshot-info {
  color: white;
}

.screenshot-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #00d4ff;
}

.screenshot-description {
  font-size: 1rem;
  color: #e0e0e0;
  line-height: 1.5;
}

/* Element Plus 轮播图样式覆盖 */
:deep(.el-carousel__indicator) {
  background-color: rgba(255, 255, 255, 0.3) !important;
}

:deep(.el-carousel__indicator.is-active) {
  background-color: #00d4ff !important;
}

:deep(.el-carousel__arrow) {
  background-color: rgba(0, 0, 0, 0.5) !important;
  color: white !important;
  border: none !important;
}

:deep(.el-carousel__arrow:hover) {
  background-color: rgba(0, 212, 255, 0.8) !important;
}

/* 版本更新公告区域 */
.announcement-section {
  background: #0a0a0a;
}

.updates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
  max-width: 1200px;
  margin: 0 auto;
}

.update-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 25px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.update-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #00d4ff, #0099cc);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.update-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.04));
  border-color: rgba(0, 212, 255, 0.3);
}

.update-card:hover::before {
  opacity: 1;
}

.update-card.latest {
  border-color: rgba(0, 212, 255, 0.5);
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 153, 204, 0.05));
}

.update-card.latest::before {
  opacity: 1;
}

.update-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.version-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.version-tag {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  color: #e0e0e0;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.version-tag.latest-tag {
  background: linear-gradient(135deg, #00d4ff, #0099cc);
  color: white;
  border-color: transparent;
}

.latest-badge {
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.update-date {
  color: #888;
  font-size: 0.9rem;
}

.update-content {
  margin-bottom: 20px;
}

.update-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: white;
  margin-bottom: 15px;
}

.update-description {
  color: #b0b0b0;
  line-height: 1.6;
}

.description-line {
  margin-bottom: 5px;
  font-size: 0.95rem;
}

.update-actions {
  display: flex;
  justify-content: flex-end;
}

.download-link {
  text-decoration: none;
}

.download-button {
  background: linear-gradient(135deg, #00d4ff, #0099cc) !important;
  border: none !important;
  border-radius: 25px !important;
  padding: 10px 20px !important;
  font-weight: 600 !important;
  transition: all 0.3s ease !important;
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
}

.download-button:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 20px rgba(0, 212, 255, 0.4) !important;
}

.download-icon {
  font-size: 1.1rem;
}

/* 地图区域 */
.maps-section {
  background: #111;
}

.maps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.map-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.map-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.08);
}

.map-image-wrapper {
  position: relative;
  overflow: hidden;
}

.map-cover {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.map-card:hover .map-overlay {
  opacity: 1;
}

.map-card:hover .map-cover {
  transform: scale(1.1);
}

.map-link {
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  background: rgba(0, 212, 255, 0.8);
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.map-link:hover {
  background: #00d4ff;
}

.map-info {
  padding: 20px;
}

.map-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: white;
  margin-bottom: 8px;
}

.map-description {
  color: #b0b0b0;
  font-size: 0.95rem;
}

/* CTA区域 */
.cta-section {
  background: linear-gradient(135deg, #0a0a0a, #1a1a1a);
  text-align: center;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 20px;
}

.cta-description {
  font-size: 1.2rem;
  color: #b0b0b0;
  margin-bottom: 40px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .title-main {
    font-size: 2.5rem;
  }
  
  .title-sub {
    font-size: 1.2rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-stats {
    gap: 30px;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .carousel-wrapper {
    margin: 0 10px;
  }
  
  .screenshot-carousel {
    height: 300px !important;
  }
  
  .screenshot-overlay {
    padding: 20px;
  }
  
  .screenshot-title {
    font-size: 1.2rem;
  }
  
  .updates-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .update-card {
    padding: 20px;
  }
  
  .update-header {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
  
  .maps-grid {
    grid-template-columns: 1fr;
  }
  
  section {
    padding: 60px 0;
  }
  
  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .title-main {
    font-size: 2rem;
  }
  
  .logo-image {
    width: 60px;
    height: 60px;
  }
  
  .download-btn, .learn-more-btn, .cta-button {
    padding: 12px 24px;
    font-size: 1rem;
  }
  
  .screenshot-carousel {
    height: 250px !important;
  }
  
  .screenshot-title {
    font-size: 1rem;
  }
  
  .screenshot-description {
    font-size: 0.9rem;
  }
  
  .update-title {
    font-size: 1.2rem;
  }
  
  .version-info {
    flex-wrap: wrap;
  }
  
  .hero-content {
    padding: 0 15px;
  }
  
  .container {
    padding: 0 15px;
  }
}
</style>