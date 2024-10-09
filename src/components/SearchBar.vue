<template>
  <div>
    <div class="date-display">{{ formattedDate }}</div>
    <input
      v-model="inputCity"
      @keyup.enter="searchCity"
      placeholder="输入城市名称"
      class="search-bar"
    />
    <button @click="searchCity">查询</button>
  </div>
</template>

<script>
export default {
  props: {
    clear: { // 监控父组件传递的 clear 状态
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inputCity: '', // 用户输入的城市
      date: new Date(), // 当前日期
    };
  },
  computed: {
    formattedDate() {
      const year = this.date.getFullYear();
      const month = String(this.date.getMonth() + 1).padStart(2, '0'); // 月份从0开始
      const day = String(this.date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
  },
  methods: {
    searchCity() {
      if (this.inputCity.trim()) {
        this.$emit('citySelected', this.inputCity); // 传递输入的城市信息到父组件
        this.$emit('dateSelected', this.formattedDate); // 传递格式化的日期到父组件
      }
    },
    clearInput() {
      this.inputCity = ''; // 清空输入框
    },
  },
  watch: {
    clear(newValue) {
      if (newValue) {
        this.clearInput(); // 当 clear prop 为 true 时，清空输入框
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
  margin-left: 5px; /* 增加按钮间隔 */
}

button:hover {
  background-color: #358d72;
}
</style>
