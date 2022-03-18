function onSuccess(response) {
  let crd = response.coords;
  console.log("Your current position is:");
  console.log("Latitude : " + crd.latitude);
  console.log("Longitude: " + crd.longitude);
  console.log("More or less " + crd.accuracy + " meters.");
}
const onError = (error) => {
  console.log("🚀 ~ file: getLocation.ts ~ line 15 ~ onError ~ error", error);
};

export function getLocation() {
  const option = {
    enableHighAccuracy: true,
    maximumAge: 1000,
  };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, option);
  } else {
    console.error("不支持定位");
  }
}
