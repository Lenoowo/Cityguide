<template>
    <div class="weather-container">
      <h1>天气查询</h1>
      <input v-model="city" placeholder="输入城市名称" />
      <button @click="getWeather">查询天气</button>
  
      <div v-if="weather">
        <h2>{{ weather.city }}的天气</h2>
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
    data() {
      return {
        city: "", // 用户输入的城市
        weather: null, // 保存天气信息
        error: null, // 错误信息
      };
    },
    methods: {
      async getWeather() {
        if (!this.city) {
          this.error = "请输入城市名称";
          return;
        }
        this.error = null;
  
        try {
          const response = await fetch(
            `http://apis.juhe.cn/simpleWeather/query?city=${this.city}&key=fe946225a249b7cf1f11063c774b080d`
          );
          const data = await response.json();
  
          if (data.error_code === 0) {
            this.weather = data.result.realtime;
            this.weather.city = data.result.city;
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
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
  }
  input {
    width: 80%;
    padding: 10px;
    margin-bottom: 10px;
  }
  button {
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #358d72;
  }
  </style>
  