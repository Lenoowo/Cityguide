<template>
    <div >
      <h2>今日天气</h2>
    </div>
  <div v-if="city" >
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
</template>

<script>
export default {
  props: {
    city: String, // 从父组件接收的城市名称
  },
  data() {
    return {
      weather: null, // 存储天气信息
      error: null,   // 存储错误信息
    };
  },
  watch: {
    city(newCity) {
      if (newCity) {
        this.fetchWeather(newCity); // 当城市变化时重新获取天气信息
      }
    },
  },
  methods: {
    async fetchWeather(city) {
      try {
        this.error = null;
        this.weather = null;
        const apiKey = 'fe946225a249b7cf1f11063c774b080d'; // 请替换为你自己的API密钥
        const response = await fetch(
          `/api/simpleWeather/query?city=${encodeURIComponent(city)}&key=${apiKey}`
        );
        const data = await response.json();
        if (data.error_code === 0) {
          this.weather = data.result.realtime;
        } else {
          this.error = data.reason;
        }
      } catch (err) {
        this.error = "无法获取天气信息，请检查网络或稍后重试。";
      }
    },
  },
};
</script>

<style scoped>
.weather-container {
  margin-top: 20px;
  font-size: 18px;
  
}
.weather-info {
  text-align: left; /* 使文本靠左对齐 */
}
</style>
