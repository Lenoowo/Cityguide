<template>

  <div id="app">
    <div class="header">
      <h1>CityGuider</h1>
      <!-- 搜索组件 -->
      <SearchBar @citySelected="setCity" @dateSelected="setDate" />
    </div>
    <div class="info-container">
      <div class="weather-container">
        <WeatherInfo :city="city" :date="date" />
      </div>
      <div class="weather-container">
      <CalendarInfo :date="date" />
    </div>
    </div>
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue';
import WeatherInfo from './components/WeatherInfo.vue';
import CalendarInfo from './components/CalendarInfo.vue';

export default {
  name: 'App',
  data() {
    return {
      city: '', // 存储输入的城市名称
      date: '', // 存储格式化的日期
    };
  },
  methods: {
    setCity(selectedCity) {
      this.city = selectedCity; // 更新城市名称
    },
    setDate(selectedDate) {
      this.date = selectedDate; // 更新格式化日期
    },
  },
  components: {
    SearchBar,
    WeatherInfo,
    CalendarInfo ,
  },
};
</script>

<style>

html, body {
  height: 100%;
  margin: 0;
}

#app {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; 
  background: url('.\imgs\bg.jpg') no-repeat center center fixed; 
  background-size: cover; 
}

/* 添加居中和浅绿色背景 */
.header {
  /*background-color: #d4edda;  浅绿色背景 */
  padding: 20px 0;
  text-align: center;
  width: 100%;
  position: relative;
  margin-top: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
}
.header h1 {
  color: white; /* 设置字体颜色为白色 */
  font-family: 'Dancing Script', cursive; /* 设置花体字体 */
  font-size: 36px; /* 字体大小 */
}
.info-container {
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  gap: 20px; /* 组件间距 */
  width: 100%; /* 限制宽度 */
}
.weather-container {
  background-color: rgba(255, 255, 255, 0.8);
  border: 2px solid #42b983; /* 边框颜色 */
  border-radius: 8px; /* 边框圆角 */
  padding: 20px; /* 内边距 */
  margin: 20px 0 0px 10px; /* 上、右、下、左的外边距 */
  width: 45%; /* 限制宽度 */
  height: 20%;
}
/* 确保搜索框适应两边 */
input {
  width: 60%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #358d72;
}
</style>
