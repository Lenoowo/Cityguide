<template>
  <div id="app">
    <div class="header">
      <h1>城市信息查询助手</h1>
      <!-- 搜索组件 -->
      <SearchBar @citySelected="setCity" />
    </div>
    <div class="weather-container">
      <WeatherInfo :city="city" />
    </div>
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue';
import WeatherInfo from './components/WeatherInfo.vue';

export default {
  name: 'App',
  data() {
    return {
      city: '', // 存储输入的城市名称
    };
  },
  methods: {
    setCity(selectedCity) {
      this.city = selectedCity; // 更新城市名称
    },
  },
  components: {
    SearchBar,
    WeatherInfo,
  },
};
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  margin-top: 20px;
}

/* 添加居中和浅绿色背景 */
.header {
  background-color: #d4edda; /* 浅绿色背景 */
  padding: 20px 0;
  text-align: center;
  width: 100%;
  position: relative;
  margin-top: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
}

.weather-container {
  border: 2px solid #42b983; /* 边框颜色 */
  border-radius: 8px; /* 边框圆角 */
  padding: 20px; /* 内边距 */
  margin: 20px 0 20px 20px; /* 上、右、下、左的外边距 */
  width: 80%; /* 限制宽度 */
  max-width: 600px; /* 最大宽度 */
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
