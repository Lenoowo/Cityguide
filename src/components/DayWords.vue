<template>
  <div class="footer">
    <div class="content">
      <p>每日一言：{{ quote }}</p>
      <p>{{ author }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quote: '',
      author: '',
      date: this.getCurrentDate(), // 计算并设置当前日期
    };
  },
  mounted() {
    this.fetchQuote();
  },
  methods: {
    getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); 
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`; // 格式化为 YYYY-MM-DD
    },
    async fetchQuote() {
      try {
        const formattedDate = this.date; 
        const response = await fetch(`https://apis.tianapi.com/one/index?key=ba1c279aa82e15112fc84da336e68066&date=${formattedDate}`);
        const data = await response.json();
        
        if (data.code === 200) {
          this.quote = data.result.word;
          this.author = data.result.wordfrom;
        } else {
          console.error(`Error: ${data.msg}`);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
  }
};
</script>

<style scoped>
.p {
  font-size: 30px;
  text-align: left; 
}
.footer {
  height: 30px; 
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
  background-size: cover;
}

.content {
  padding: 20px;
  border-radius: 10px;
}
</style>
