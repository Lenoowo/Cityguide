<template>
  <div id="app">
    <div class="header">
      <h1>CityGuider</h1>
      <!-- 搜索组件 -->
      <SearchBar @citySelected="setCity" @dateSelected="setDate" :city="city" :date="date"/>
    </div>
    <div class="button-container">
      <button @click="showContent('weather')">Weather and Calendar</button>
      <button @click="showContent('news')">News</button>
      <button @click="showContent('map')">Map</button>
      <button @click="clearSearch">Clear Search</button> <!-- 清空按钮 -->
    </div>
    
    <div class="info-container">
      <!-- 根据按钮选择显示不同的组件 -->
      <div v-if="activeComponent === 'weather' && city && date" class="info-container">
        <div class="weather-container">
          <WeatherInfo :city="city" :date="date" />
        </div>
        <div class="weather-container">
          <CalendarInfo :date="date" />
        </div>
      </div>
      <div v-if="activeComponent === 'news' && city && date" class="weather-container">
        <p>News content will be displayed here.</p>
      </div>
      <div v-if="activeComponent === 'map' && city && date" class="weather-container">
        <p>Map content will be displayed here.</p>
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
      activeComponent: 'null', // 控制显示的组件，默认为 'weather'
    };
  },
  methods: {
    setCity(selectedCity) {
      this.city = selectedCity; // 更新城市名称
    },
    setDate(selectedDate) {
      this.date = selectedDate; // 更新格式化日期
    },
    showContent(componentName) {
      this.activeComponent = componentName; // 根据按钮选择要显示的内容
    },
    clearSearch() {
      this.city = ''; // 清空城市
      this.date = ''; // 清空日期
      this.activeComponent = 'null'; // 重置显示为默认组件
    },
  },
  components: {
    SearchBar,
    WeatherInfo,
    CalendarInfo,
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

.header {
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
  color: white; 
  font-family: 'Dancing Script', cursive;
  font-size: 36px;
}
.info-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
}
.weather-container {
  background-color: rgba(255, 255, 255, 0.8);
  border: 2px solid #42b983;
  border-radius: 8px; 
  padding: 20px; 
  margin: 20px 0 0px 10px; 
  width: 45%; 
  height: 20%;
}

.button-container {
  margin: 20px 0;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  margin: 0 10px;
}

button:hover {
  background-color: #369966;
}
</style>
