const baseUrl = `${location.protocol}//${location.host}`;

const keys = {
  googleMaps: window.globals ? window.globals.googleMaps : "AIzaSyAUKRpb10Wh8VaN255y5Md_KiY-LH4FnkE"
};

export default {
  baseUrl,
  endpoints: {
    googleMaps: `https://maps.googleapis.com/maps/api/js?key=${keys.googleMaps}&v=3.exp&libraries=drawing,places`
  },
  keys
};
