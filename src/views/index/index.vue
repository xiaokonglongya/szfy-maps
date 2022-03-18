<template>
  <div class="pages">
    <div class="date" :class="{ date__hidden: hiddenMenu }">
      <!-- <div class="close-icon" @click="hiddenMenu = true">
          <n-icon size="22">
            <CloseCircleOutline />
          </n-icon>
        </div> -->
      <n-h4 prefix="bar" align-text> 切换日期 </n-h4>
      <n-date-picker
        v-model:value="timestamp"
        type="date"
        :on-update:value="dateChange"
      />
      <n-h4 prefix="bar" align-text> 确诊人员 </n-h4>
      <div class="people-list">
        <n-scrollbar style="max-height: calc(100%)" v-if="peopleData.length">
          <div
            class="date-people-item"
            v-for="item in peopleData"
            :key="item._id"
          >
            病例{{ item.no }} {{ item.address }}
          </div>
        </n-scrollbar>
        <n-empty description="暂无更多数据" v-else>
          <template #extra>
            <!-- <n-button size="small"> 看看别的 </n-button> -->
          </template>
        </n-empty>
      </div>
    </div>
    <div class="map">
      <Map ref="mapRef" @markerClick="showNatification" />
    </div>
  </div>
  <div class="helper-tips" @click="hiddenMenu = !hiddenMenu">
    <n-icon size="32" color="#fff">
      <BuildSharp />
    </n-icon>
  </div>
</template>
<script lang="ts" setup>
import Map from "@/components/maps/map.vue";
import { getMapsDateByDate } from "@/api/home";
import { onMounted, ref, defineExpose, h, computed } from "vue";
import { useNotification, useMessage, NAvatar } from "naive-ui";
import { isYesterday, addDays } from "date-fns";
import { CloseCircleOutline, BuildSharp } from "@vicons/ionicons5";
const mapRef = ref();
const message = useMessage();
const notification = useNotification();
const timestamp = ref(new Date().getTime());
interface PeopleTypes {
  _id: string;
  gender: string;
  lonLat: string;
  address: string;
  no: string;
  age: string;
  date: string;
}
const peopleData = ref<PeopleTypes[]>([]);
const hiddenMenu = ref(true);
onMounted(() => {
  getData();
});
const dateChange = (value) => {
  timestamp.value = value;
  clearMarkers(peopleData.value);
  getData(value);
};
const getData = async (date?) => {
  let result = await getMapsDateByDate<{ rows: PeopleTypes[] }>({
    pageSize: 999,
    date,
  });
  let { rows = [] } = result;
  peopleData.value = rows;
  setTimeout(() => {
    addMarker(rows);
  }, 1000);
};
const addMarker = (data: PeopleTypes[]) => {
  for (let i = 0; i < data.length; i++) {
    let lnglat = data[i].lonLat.split(",").map((e) => Number(e));
    mapRef.value.addMarker(lnglat, data[i].address, data[i]);
  }
};
const clearMarkers = (data: PeopleTypes[]) => {
  // for (let i = 0; i < data.length; i++) {
  // let lnglat = data[i].lonLat.split(",").map((e) => Number(e));
  mapRef.value.clearMarkers();
  // }
};
const showNatification = (data) => {
  let lonLat = data.lonLat;
  let result = peopleData.value.filter((e) => e.lonLat === lonLat);
  if (!result) return;
  let title = result.map((e) => e.no).join(",");
  let content = result
    .map((e) => `病例${e.no}(${e.age},${e.gender})`)
    .join(" ; ");
  let meta = result[0].date;
  let description = result[0].address;
  notification.create({
    type: "warning",
    title: `病例${title}`,
    duration: 5000,
    description,
    content,
    meta: meta,
  });
  // let
};
</script>
<style lang="less">
.pages {
  display: flex;
  min-height: 100vh;
  .date {
    @media screen and (max-device-width: 960px) {
      width: 200px;
    }
    @media screen and (min-width: 1200px) {
      width: 300px;
    }
    padding: 20px;
    position: absolute;
    transition: all 0.3s;
    z-index: 99;
    background: #fff;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .people-list {
      flex: 1;
      padding-bottom: 10px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__hidden {
      transform: translate(-250px, 0);
      width: 0;
      padding: 0;
    }
    .close-icon {
      position: absolute;
      right: 20px;
      top: 20px;
    }
    &-people {
      &-item {
        padding: 10px 0;
        cursor: grab;
      }
    }
  }
  .map {
    flex: 1;
    height: inherit;
  }
}
.helper-tips {
  @distance: 50px;
  width: @distance + 10px;
  height: @distance + 10px;
  background: rgb(72, 72, 78);
  box-shadow: 0 2px 12px 0px rgba(0, 0, 0, 0.18);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 999;
  right: @distance - 10px;
  bottom: @distance;
  border-radius: 50%;
  transition: all 0.5s;
  &:active {
    transform: scale(0.9);
  }
}
</style>
