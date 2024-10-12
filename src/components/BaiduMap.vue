<template>
    <div ref="map" style="width: 100%; height: 400px;"></div>
  </template>
  
  <script>
  export default {
    props: {
      city: {
        type: String,
        required: true,
      },
    },
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        const map = new BMap.Map(this.$refs.map);
        const city = this.city;
  
        map.centerAndZoom(city, 12); // 12 -缩放级别
  
        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.ScaleControl());
  
        // 添加标记
        const local = new BMap.LocalSearch(city, {
          onSearchComplete: (results) => {
            if (local.getStatus() === BMAP_STATUS_SUCCESS) {
              const point = results.getPoi(0).point;
              const marker = new BMap.Marker(point);
              map.addOverlay(marker);
              map.panTo(point);
            }
          },
        });
        local.search(city);
      },
    },
  };
  </script>
  
  <style scoped>

  </style>
  