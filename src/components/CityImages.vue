<template>
  <div class="city-images">
    <h2>{{ city }}印象</h2>
    <div v-if="loading">加载中...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div class="images-grid">
      <img v-for="(image, index) in images" :key="index" :src="image.urls.small" alt="City Image" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    city: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      cityInput: this.city,
      images: [],
      loading: false,
      error: ''
    };
  },
  methods: {
    async fetchImages() {
      if (!this.cityInput) return;
      this.loading = true;
      this.error = '';

      const accessKey = '4cKdozWCVTA-j46097jUpc0ScUnc60qqQLjxddQvh30'; // 替换为你的 Unsplash API 密钥

      try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${this.cityInput}&client_id=${accessKey}&per_page=9`);
        const data = await response.json();

        if (data.results.length > 0) {
          this.images = data.results;
        } else {
          this.error = '未找到相关图片。';
          this.images = [];
        }
      } catch (err) {
        this.error = '获取图片失败，请重试。';
        this.images = [];
      } finally {
        this.loading = false;
      }
    }
  },
  watch: {
    city: {
      immediate: true,
      handler(newCity) {
        this.cityInput = newCity;
        this.fetchImages();
      }
    }
  }
};
</script>

<style scoped>
.city-images {
  text-align: center;
}
.images-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 三列 */
  gap: 10px; /* 图片之间的间距 */
  margin-top: 20px;
}
.images-grid img {
  width: 100%; /* 让图片填满单元格 */
  height: auto;
}
.error {
  color: red;
}
h2{
  color: white;
}
</style>
