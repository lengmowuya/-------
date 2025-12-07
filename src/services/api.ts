import request from '@/net/net.js';

// 客户端版本相关API
export const clientVersionAPI = {
  // 获取版本列表
  getVersions: (params?: { page?: number; limit?: number; active_only?: boolean }) => {
    return request.get('/api/client-versions', { params });
  },
  
  // 获取最新版本
  getLatestVersion: () => {
    return request.get('/api/client-versions/latest');
  }
};

// 公告相关API
export const announcementAPI = {
  // 获取公告列表
  getAnnouncements: (params?: { page?: number; limit?: number; pinned_first?: boolean }) => {
    return request.get('/api/announcements', { params });
  },
  
  // 获取公告详情
  getAnnouncementDetail: (id: string) => {
    return request.get(`/api/announcements/${id}`);
  }
};

// 统计数据API（公开接口）
export const statsAPI = {
  // 获取统计数据
  getStats: () => {
    return request.get('/api/stats');
  }
};

// 活动相关API（保持现有的）
export const activityAPI = {
  // 获取活动列表
  getActivities: () => {
    return request.get('/api/activities?populate=*');
  }
};

// 截图相关API
export const screenshotAPI = {
  // 获取截图列表
  getScreenshots: () => {
    return request.get('/api/screenshots');
  }
};

// 网站配置API
export const siteConfigAPI = {
  // 获取所有配置
  getAll: () => {
    return request.get('/api/site-config');
  }
};