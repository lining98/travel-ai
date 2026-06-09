<template>
  <div class="page-container">
    <div class="page-header">
      <van-nav-bar title="智能旅游助手" />
    </div>
    <div class="page-content">
      <van-notice-bar left-icon="info-o" text="基于 AI 的智能景点介绍与行程规划系统" style="margin-bottom: 16px" />

      <div class="card search-card">
        <div class="section-title">规划你的旅程</div>
        <van-field
          @click="showCityPicker = true"
          is-link
          readonly
          v-model="formData.city"
          label="目的地"
          placeholder="请选择城市"
        />
        <van-field type="number" v-model="formData.budget" label="预算(元)" placeholder="请输入预算金额" :border="false" />
        <van-field type="digit" v-model="formData.days" label="天数" placeholder="请输入天数" :border="false" style="" />
        <van-button type="primary" size="large" round :loading="isLoading" @click="handleSubmit"> 开始规划 </van-button>
      </div>
      <div class="card quick-actions">
        <div class="section-title">快捷入口</div>
        <van-grid :column-num="2" :gutter="12">
          <van-grid-item @click="goPage('/chat')" icon="chat-o" text="AI 对话" />
          <van-grid-item @click="goPage('/profile')" icon="user-o" text="我的" />
        </van-grid>
      </div>
      <div class="card popular-destinations">
        <div class="section-title">热门目的地</div>
        <van-grid :column-num="4" :gutter="8">
          <van-grid-item @click="selectedCity(city)" v-for="(city, index) in popularCities" :key="index">
            <div class="city-tag" :class="{ active: city === formData.city }">
              {{ city }}
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <van-popup round v-model:show="showCityPicker" position="bottom">
      <van-picker title="选择目的地" :columns="cityColumns" @confirm="handleCityConfirm" @cancel="showCityPicker = false" />
    </van-popup>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { showToast } from 'vant';

const router = useRouter();
//旅游规划表单数据
const formData = reactive({
  city: '',
  budget: '',
  days: '',
});
//城市选择器显示状态
const showCityPicker = ref(false);

const allCities = [
  '北京',
  '上海',
  '广州',
  '深圳',
  '成都',
  '杭州',
  '西安',
  '重庆',
  '南京',
  '武汉',
  '苏州',
  '长沙',
  '天津',
  '郑州',
  '济南',
  '青岛',
  '大连',
  '沈阳',
  '哈尔滨',
  '长春',
  '福州',
  '厦门',
  '南昌',
  '合肥',
  '昆明',
  '贵阳',
  '南宁',
  '桂林',
  '海口',
  '三亚',
  '丽江',
  '大理',
  '西安',
  '兰州',
  '乌鲁木齐',
  '拉萨',
  '呼和浩特',
  '太原',
  '石家庄',
];
const popularCities = ['北京', '上海', '广州', '深圳', '成都', '杭州', '西安', '重庆'];

const cityColumns = allCities.map((city) => ({ text: city, value: city }));

//处理城市选择确认
const handleCityConfirm = ({ selectedOptions }) => {
  formData.city = selectedOptions[0].value;
  showCityPicker.value = false;
};

//加载状态
const isLoading = ref(false);

//提交表单
const handleSubmit = () => {
  //判断目的地
  if (!formData.city) {
    showToast('请选择目的地');
    return;
  }
  //判断预算
  if (!formData.budget || formData.budget < 100) {
    showToast('预算不能小于100元');
    return;
  }
  //判断天数
  if (!formData.days || formData.days < 1 || formData.days > 30) {
    showToast('天数必须在1-30天之间');
    return;
  }
  isLoading.value = true;
  //提交表单
  router.push({
    path: '/detail',
    query: {
      city: formData.city,
      budget: formData.budget,
      days: formData.days,
    },
    success: () => {
      isLoading.value = false;
    },
  });
};
//处理表单数据
const handleFormData = () => {
  return {
    city: formData.city,
    budget: formData.budget,
    days: formData.days,
  };
};

//跳转页面
const goPage = (path) => {
  router.push(path);
};
//选择城市
const selectedCity = (city) => {
  formData.city = city;
};
</script>

<style scoped>
.van-field {
  background-color: #f7f8fa;
  border-radius: 8px;
  margin-bottom: 12px;
}
.search-card {
  margin-bottom: 16px;
}
.city-tag {
  padding: 8px;
  border-radius: 10px;
  font-size: 14px;
  color: #666;
  background: #f7f8fa;
  transition: all 0.3s;
}
.city-tag.active {
  background: #007aff;
  color: #fff;
}
</style>
