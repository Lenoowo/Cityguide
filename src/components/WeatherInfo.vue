<template>
  <div>
    <h2>今日天气</h2>
    <div v-if="city">
      <h2>城市：{{ city }}</h2>
      <div v-if="weather" class="weather-info">
        <p>天气：{{ weather.info }}</p>
        <p>温度：{{ weather.temperature }}°C</p>
        <p>湿度：{{ weather.humidity }}%</p>
        <p>风向：{{ weather.direct }}</p>
        <p>风力：{{ weather.power }}</p>
        <p>空气质量：{{ weather.aqi }}</p>
      </div>
      <div v-if="error">
        <p style="color: red;">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    city: String, // 从父组件接收的城市名称
  },
  data() {
    return {
      weather: null, 
      error: null,  
    };
  },
  watch: {
    city(newCity) {
      if (newCity) {
        this.fetchWeather(newCity); // 当城市变化时重新获取天气信息
      }
    },
  },
  mounted() {
    if (this.city) {
      this.fetchWeather(this.city);
    }
  },
  methods: {
    async fetchWeather(city) {
      if (!city) {
        this.error = "请输入一个有效的城市名称。";
        return;
      }
      try {
        this.error = null;
        this.weather = null;
        const apiKey = 'fe946225a249b7cf1f11063c774b080d'; 
        const response = await fetch(
          `/weatherApi/simpleWeather/query?city=${city}&key=${apiKey}`
        );
        const data = await response.json();      
        if (data.error_code === 0) {
          this.weather = data.result.realtime; 
        } else {
          this.error = data.reason || "无法获取天气信息，请检查城市名称。";
        }
      } catch (err) {
        this.error = "无法获取天气信息，请检查网络或稍后重试。";
      }
    },
  },
};
</script>

<style scoped>
.date-display {
  margin-bottom: 10px; /* 确保日期和输入框之间有一些间距 */
  font-size: 30px;
  color: #333;
}
.search-bar {
  width: 60%;
  padding: 10px;
  margin: 10px;
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
.weather-info {
    line-height: 0.9; /* 设置行距 */
    font-size: 18px; /* 设置字体大小 */
    text-align: left; /* 使文本靠左对齐 */

  }
</style>
