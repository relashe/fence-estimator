import { Loader } from "google-maps";
import { init as startFenceEstimatorMap } from "./loadedMapModule";

const mapSetup = {
  key: "AIzaSyAUKRpb10Wh8VaN255y5Md_KiY-LH4FnkE",
  options: {
    libraries: ["drawing", "places"],
    version: "3"
  }
};

const mapLoader = new Loader(mapSetup.key, mapSetup.options);

export const init = () => {
  mapContainer = document.getElementById("fence-estimator-map");

  if (!mapContainer) {
    return false;
  }

  // Cache the map elements -
  mapElements = Array.prototype.slice.call(mapContainer);
  mapLoader.load().then(google => {
    startFenceEstimatorMap(google);
  });
};
