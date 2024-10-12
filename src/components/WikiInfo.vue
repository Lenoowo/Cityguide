<template>
    <div>
      <h2>城市信息</h2>
      <div v-if="city">
        <h2>城市：{{ cityWithSuffix }}</h2> <!-- 使用衍生的城市名称 -->
        <div v-if="wikiData" class="wiki-info">
          <p v-html="wikiData.summary"></p>
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
        wikiData: null, // 存储 Wiki 信息
        error: null,    // 存储错误信息
      };
    },
    computed: {
      cityWithSuffix() {
        return this.city ? `${this.city}市` : ''; // 给城市名称加上“市”
      },
    },
    watch: {
      city(newCity) {
        if (newCity) {
          this.fetchWikiData(newCity); 
        }
      },
    },
    mounted() {
      if (this.city) {
        this.fetchWikiData(this.city);
      }
    },
    methods: {
      async fetchWikiData(city) {
        const cityWithSuffix = `${city}市`; 
        if (!cityWithSuffix) {
          this.error = "请输入一个有效的城市名称。";
          return;
        }
        try {
          this.error = null;
          this.wikiData = null;
  
          const response = await fetch(
            `https://zh.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${encodeURIComponent(cityWithSuffix)}&origin=*`
          );
          const data = await response.json();
          
          const page = Object.values(data.query.pages)[0]; // 获取返回页面数据
          if (page && page.extract) {
            this.wikiData = {
              title: page.title,
              summary: page.extract,
            }; // 更新 wikiData 数据
            console.log("Wiki 数据: ", this.wikiData); // 调试用
          } else {
            this.error = "无法获取城市信息，请检查城市名称。";
          }
        } catch (err) {
          this.error = "无法获取城市信息，请检查网络或稍后重试。";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .wiki-info {
    margin-top: 20px;
    text-align: left; /* 使文本靠左对齐 */
  }
  </style>
  