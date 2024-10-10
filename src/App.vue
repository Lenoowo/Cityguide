<template>
  <div id="app">
    <div class="header">
      <img src=".\imgs\logo-title.png" alt="Logo" class="logo" />
      <SearchBar @citySelected="setCity" @dateSelected="setDate" :city="city" :date="date" :clear="clearInputFlag" />
    </div>
    <div class="button-container">
      <button @click="showContent('weather')">
        <img src=".\imgs\weather-logo.png" alt="Weather Logo" class="icon" />气象快报</button>
      <button @click="showContent('news')">
        <img src=".\imgs\news-logo.png" alt="Weather Logo" class="icon" />新闻速递</button>     
      <button @click="showContent('history')">
        <img src=".\imgs\history-logo.png" alt="Weather Logo" class="icon" />历史人文</button>
      <button @click="showContent('map')">
        <img src=".\imgs\map-logo.png" alt="Weather Logo" class="icon" />地图略览</button>
      <button @click="showContent('images')">
          <img src=".\imgs\map-logo.png" alt="Weather Logo" class="icon" />眼观丽景</button>
      <button @click="clearSearch">Clear</button> 
    </div>
    
    <div class="mainpart">
      <!-- 根据按钮选择显示不同的组件 -->
      <div v-if="activeComponent === 'weather' && city" class="info-container">
        <div class="weather-container">
          <WeatherInfo :city="city":date="date"/>
        </div>
        <div class="weather-container">
          <CalendarInfo :date="date" />
        </div>
      </div>
      <div v-if="activeComponent === 'history' && city" class="wiki-container">
          <WikiInfo :city="city" />
      </div>
      <div v-if="activeComponent === 'news' && city" class="wiki-container">
        <TravelInfo :city="city" />
      </div> 
      <div v-if="activeComponent === 'map' && city" class="info-container">
        <BaiduMap :city="city" />
      </div> 
      <div v-if="activeComponent === 'images' && city" class="info-container">
        <CityImages :city="city" />
      </div> 
    </div>
    <div class="day-words-container">
      <DayWords :date="date"/>
    </div>
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue';
import WeatherInfo from './components/WeatherInfo.vue';
import CalendarInfo from './components/CalendarInfo.vue';
import WikiInfo from './components/WikiInfo.vue';
import TravelInfo from './components/TravelInfo.vue';
import DayWords from './components/DayWords.vue';
import BaiduMap from './components/BaiduMap.vue';
import CityImages from './components/CityImages.vue';

export default {
  name: 'App',
  data() {
    return {
      city: '', // 存储输入的城市名称
      date: '', // 存储格式化的日期
      activeComponent: 'null', // 控制显示的组件
      clearInputFlag: false, // 控制清空状态
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
      this.clearInputFlag = true; // 触发清空输入框
      this.$nextTick(() => {
        this.clearInputFlag = false; // 清空后重置状态
      });
    },
  },
  components: {
    SearchBar,
    WeatherInfo,
    CalendarInfo,
    WikiInfo,
    TravelInfo,
    DayWords,
    BaiduMap,
    CityImages,
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
.logo {
  width: 200px; /* 根据需求设置 logo 的宽度 */
  height: auto; /* 保持纵横比 */
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
  font-family: 'Lobster', cursive;
}
.header h1 {
  color: rgb(255, 255, 255); 
  font-family: 'Lobster', cursive;
  font-size: 36px;
}
.mainpart{
  margin-bottom: 100px; /* 确保与页脚留出空间 */
}
.info-container {
  display: flex;
  justify-content: center; 
  gap: 20px; 
  width: 100%; 
  max-width: 1200px;
  margin: 0 auto;
  min-width: 1000px; 
}

.weather-container {
  background-color: rgba(255, 255, 255, 0.8);
  border: 2px solid #42b983;
  border-radius: 8px; 
  padding: 20px; 
  margin: 10px; 
  width: 85%; 
  height: auto;
}
.wiki-container {
  background-color: rgba(255, 255, 255, 0.8);
  border: 2px solid #42b983;
  border-radius: 8px; 
  width: 90%; 
  height: auto; 
  margin: 0 auto; 
  display: flex; 
  justify-content: center; 
  padding: 20px; 
}

.button-container {
  margin: 15px 0;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #24cd92;
  color: white;
  border: none;
  cursor: pointer;
  margin: 0 10px;
}

button:hover {
  
  background-color: #369966c7;
}

.day-words-container{
  background-image: url('.\imgs\footer.png'); 
  bottom: 0;
  background-size: cover; 
  background-position: center; 
  position: fixed; 
  bottom: 0; 
  left: 0; 
  right: 0; 
}
.icon {
  width: 18px; /* 根据需求设置图标的宽度 */
  height: auto; /* 保持纵横比 */
  margin-right: 4px; /* 添加右侧间距，分隔图标和文字 */
}
</style>
