<template>
  <div id="container"></div>
</template>
<script>
import { getLocation } from "@/utils/getLocation";
import AMapLoader from "@amap/amap-jsapi-loader";
import { shallowRef } from "@vue/reactivity";
import { onMounted, ref, defineExpose, h } from "vue";
import { useNotification, useMessage, NAvatar } from "naive-ui";
import { s } from "../../../dist/assets/vendor.051b052d";
export default {
  name: "mapcomtaint",
  setup() {
    const map = shallowRef(null);

    return {
      map,
    };
  },
  mounted() {
    //DOM初始化完成进行地图初始化
    this.ininMap();
  },
  create() {},
  methods: {
    ininMap() {
      AMapLoader.load({
        key: "6e359c308ca7e5b390676c97add0f064", //设置您的key
        version: "1.4.15",
        plugins: ["AMap.ToolBar", "AMap.Driving", "AMap.MarkerClusterer"],
        AMapUI: {
          version: "1.1",
          plugins: [],
        },
        Loca: {
          version: "1.4.15",
        },
      })
        .then((AMap) => {
          this.map = new AMap.Map("container", {
            viewMode: "3D",
            zoom: 11,
            zooms: [2, 22],
            center: [114.053722, 22.546857],
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addMarker(lnglat, title = "测试", info) {
      var circleMarker = new AMap.CircleMarker({
        center: lnglat,
        radius: 10, //3D视图下，CircleMarker半径不要超过64px
        strokeColor: "white",
        strokeWeight: 2,
        strokeOpacity: 0.5,
        fillColor: "rgba(231,50,45,1)",
        fillOpacity: 0.5,
        zIndex: 10,
        bubble: true,
        cursor: "pointer",
        clickable: true,
      });
      circleMarker.setMap(this.map);
      circleMarker.on("click", (event) => {
        this.$emit("markerClick", info);
      });
    },
    createMapMarkerClusterer(markers) {
      let newMarkers = markers.map((e) => {
        let position = e.lonLat.split(",");
        let result = new AMap.Marker({
          position,
          content:
            '<div style="background-color: rgba(231,50,45,1); height: 12px; width:12px; border: 1px solid #fff; border-radius: 12px; "></div>',
          // offset: new AMap.Pixel(-15, -15),
        });

        result.on("click", ({lnglat}) => {
          this.$emit("markerClick", e);
        });
        return result;
      });
      let clusterer = new AMap.MarkerClusterer(this.map, newMarkers, {
        gridSize: 80,
      });
      clusterer.on("click", ({ lnglat }) => {
        let info = {
          lonLat: `${lnglat.lng},${lnglat.lat}`,
        };
        this.$emit("markerClick", info);
      });
    },
    clearMarkers(lnglat) {
      this.map.clearMap();
      //   this.map.remove(lnglat);
    },
  },
};
</script>
<style scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
}
</style>
