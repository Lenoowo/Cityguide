<template>
  <div id="app">
    <div class="header">
      <h1>CityGuider</h1>
      <!-- 搜索组件，传递 clearInputFlag -->
      <SearchBar @citySelected="setCity" @dateSelected="setDate" :city="city" :date="date" :clear="clearInputFlag" />
    </div>
    <div class="button-container">
      <button @click="showContent('weather')">今日天时</button>
      <button @click="showContent('map')">今日地利</button>
      <button @click="showContent('news')">今日人和</button>
      <button @click="clearSearch">Clear</button> 
    </div>
    
    <div>
      <!-- 根据按钮选择显示不同的组件 -->
      <div v-if="activeComponent === 'weather' && city" class="info-container">
        <div class="weather-container">
          <WeatherInfo :city="city":date="date"/>
        </div>
        <div class="weather-container">
          <CalendarInfo :date="date" />
        </div>
      </div>
      <div v-if="activeComponent === 'news' && city" class="wiki-container">
          <WikiInfo :city="city" />
      </div>
      <div v-if="activeComponent === 'map' && city" class="wiki-container">
        <p>Map content will be displayed here.</p>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue';
import WeatherInfo from './components/WeatherInfo.vue';
import CalendarInfo from './components/CalendarInfo.vue';
import WikiInfo from './components/WikiInfo.vue';

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
  justify-content: center; /* 水平居中 */
  gap: 20px; /* 子元素间距 */
  width: 100%; /* 或者设置成一个适合的固定宽度 */
  max-width: 1200px; /* 设置最大宽度以避免过宽 */
  margin: 0 auto; /* 自动左右边距以实现居中 */
  min-width: 1000px; /* 设置最小宽度以避免过窄 */
}

.weather-container {
  background-color: rgba(255, 255, 255, 0.8);
  border: 2px solid #42b983;
  border-radius: 8px; 
  padding: 20px; 
  margin: 20px; /* 调整外边距 */
  width: 85%; /* 可以适当调整以满足需求 */
  height: auto; /* 根据内容自适应高度 */
}
.wiki-container {
  background-color: rgba(255, 255, 255, 0.8);
  border: 2px solid #42b983;
  border-radius: 8px; 
  width: 90%; /* 可以适当调整以满足需求 */
  height: auto; /* 根据内容自适应高度 */
  margin: 0 auto; /* 添加这一行以使其居中 */
  display: flex; /* 如果需要使用flex布局 */
  justify-content: center; /* 水平居中内容 */
  padding: 20px; /* 添加一些内边距，使内容不紧贴边框 */
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
