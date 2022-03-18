<template>
  <div>
    <Map ref="mapRef" @markerClick="showNatification" />
  </div>
</template>
<script lang="ts" setup>
import Map from "@/components/maps/map.vue";
import { getMapsDateByDate } from "@/api/home";
import { onMounted, ref, defineExpose, h } from "vue";
import { useNotification, useMessage, NAvatar } from "naive-ui";
const mapRef = ref();
const message = useMessage();
const notification = useNotification();
interface PeopleTypes {
  gender: string;
  lonLat: string;
  address: string;
  no: string;
  age: string;
  date: string;
}
const peopleData = ref<PeopleTypes[]>([]);
onMounted(() => {
  getData();
});
const getData = async () => {
  let result = await getMapsDateByDate({ pageSize: 999 });
  let { rows = [] } = result;
  peopleData.value = rows;
  setTimeout(() => {
    addMarker(rows);
  }, 1000);
  console.log("🚀 ~ file: index.vue ~ line 13 ~ getData ~ result", result);
};
const addMarker = (data: PeopleTypes[]) => {
  for (let i = 0; i < data.length; i++) {
    let lnglat = data[i].lonLat.split(",").map((e) => Number(e));
    mapRef.value.addMarker(lnglat, data[i].address, data[i]);
  }
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
<style lang="less"></style>
