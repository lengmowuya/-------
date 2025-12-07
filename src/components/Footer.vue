<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- 主要内容区域 -->
      <div class="footer-content">
        <!-- 品牌信息 -->
        <div class="footer-section">
          <div class="footer-logo">
            <img src="@/assets/空间站icon.png" alt="星际云存档" class="footer-logo-img" />
            <h3 class="footer-brand">星际云存档</h3>
          </div>
          <p class="footer-description">
            专业的星际争霸2存档管理平台，为玩家提供安全可靠的云端存档服务。
          </p>
          <div class="social-links">
            <a href="#" class="social-link" title="QQ群">
              <el-icon><ChatDotRound /></el-icon>
            </a>
            <a href="#" class="social-link" title="微信群">
              <el-icon><Message /></el-icon>
            </a>
            <a href="#" class="social-link" title="官方网站">
              <el-icon><Link /></el-icon>
            </a>
          </div>
        </div>

        <!-- 快速链接 -->
        <div class="footer-section">
          <h4 class="footer-title">快速链接</h4>
          <ul class="footer-links">
            <li><router-link to="/">首页</router-link></li>
            <li><a href="#" @click="downloadApp">下载客户端</a></li>
          </ul>
        </div>



        <!-- 联系信息 -->
        <div class="footer-section">
          <h4 class="footer-title">联系我们</h4>
          <div class="contact-info">
            <div class="contact-item">
              <el-icon><User /></el-icon>
              <span>QQ: 3537168410</span>
            </div>
            <div class="contact-item">
              <el-icon><Message /></el-icon>
              <span>官方QQ群</span>
            </div>

          </div>
        </div>
      </div>

      <!-- 底部版权信息 -->
      <div class="footer-bottom">
        <div class="footer-copyright">
          <p>&copy; 2024 星际云存档 版权所有 | 冷漠乌鸦工作室</p>
          <p class="footer-disclaimer">
            本站与暴雪娱乐无关，仅为星际争霸2玩家提供存档管理服务
          </p>
        </div>
        

      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ChatDotRound, Message, Link, User, Clock } from '@element-plus/icons-vue'

// 下载应用
const downloadApp = () => {
  window.open('http://103.149.201.158:10888/down/R5emvJy2CUI5.zip', '_blank')
}
</script>

<style scoped lang="less">
.footer {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  color: #e0e0e0;
  padding: 60px 0 20px;
  border-top: 1px solid rgba(0, 212, 255, 0.2);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

.footer-logo {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.footer-logo-img {
  width: 32px;
  height: 32px;
  margin-right: 10px;
  border-radius: 6px;
}

.footer-brand {
  font-size: 1.3rem;
  font-weight: 700;
  color: #00d4ff;
  margin: 0;
}

.footer-description {
  color: #b0b0b0;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 0.95rem;
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 50%;
  color: #00d4ff;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 212, 255, 0.2);
    border-color: #00d4ff;
    transform: translateY(-2px);
  }

  .el-icon {
    font-size: 18px;
  }
}

.footer-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 20px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 30px;
    height: 2px;
    background: linear-gradient(90deg, #00d4ff, transparent);
  }
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 12px;

    a {
      color: #b0b0b0;
      text-decoration: none;
      transition: all 0.3s ease;
      font-size: 0.95rem;

      &:hover {
        color: #00d4ff;
        padding-left: 5px;
      }
    }
  }
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #b0b0b0;
  font-size: 0.95rem;

  .el-icon {
    color: #00d4ff;
    font-size: 16px;
  }
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  flex-wrap: wrap;
  gap: 20px;
}

.footer-copyright {
  flex: 1;

  p {
    margin: 0;
    color: #888;
    font-size: 0.9rem;
    line-height: 1.5;

    &.footer-disclaimer {
      font-size: 0.8rem;
      opacity: 0.7;
      margin-top: 5px;
    }
  }
}

.footer-links-bottom {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 0.9rem;

  a {
    color: #888;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #00d4ff;
    }
  }

  .separator {
    color: #555;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer {
    padding: 40px 0 20px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
    text-align: center;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .footer-links-bottom {
    justify-content: center;
  }

  .social-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer-container {
    padding: 0 15px;
  }

  .footer-content {
    gap: 25px;
  }

  .footer-links-bottom {
    flex-direction: column;
    gap: 10px;

    .separator {
      display: none;
    }
  }
}
</style>