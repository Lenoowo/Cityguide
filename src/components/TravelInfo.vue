<template>
    <div>
      <h1>旅游信息</h1>
      
      <div v-if="loading">加载中...</div>
      <div v-if="error">{{ error }}</div>
      
      <ul v-if="Array.isArray(results) && results.length > 0">
        <li v-for="item in results" :key="item.id">
          <h3>{{ item.title }}</h3>
          <img v-if="item.picUrl" :src="item.picUrl" alt="图片" />
          <p>{{ item.description }}</p>
          <a :href="item.url" target="_blank">阅读更多</a>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      city: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        results: [],
        loading: false,
        error: null,
      };
    },
    methods: {
      async fetchData() {
        this.loading = true;
        this.error = null;
        const apiKey = 'ba1c279aa82e15112fc84da336e68066'; 
        const requestUrl = `https://apis.tianapi.com/travel/index?key=${apiKey}&num=10&word=${encodeURIComponent(this.city)}`;
        try {
            const response = await fetch(requestUrl);
          
          if (!response.ok) {
            throw new Error('请求失败，状态码：' + response.status);
          }
          
          const data = await response.json();
          
          if (data.code === 200) {
            this.results = data.result.newslist; // 确保获取到的新闻列表
          } else {
            this.error = data.msg;
          }
        } catch (err) {
          this.error = '请求失败，请稍后重试';
        } finally {
          this.loading = false;
        }
      },
    },
    watch: {
      city(newCity) {
        this.fetchData(); // 每次城市变化时重新获取数据
      },
    },
    mounted() {
      this.fetchData(); // 初次加载时获取数据
    },
  };
  </script>
  <style scoped>
h1 {
  font-size: 24px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
}

img {
  width: 100%; /* 设置图片宽度为100% */
  max-width: 400px; /* 设置最大宽度，避免图片过大 */
  height: auto; /* 保持图片比例 */
}

p {
  text-align: left; /* 文字向左对齐 */
  margin: 10px 0; /* 增加段落之间的间距 */
}

a {
  display: inline-block; /* 使链接成为块级元素，便于点击 */
  margin-top: 5px; /* 添加顶部间距 */
}
</style>

  