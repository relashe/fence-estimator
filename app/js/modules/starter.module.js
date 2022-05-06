import { createMap, setup } from "./loadedMap.module";
import { Loader } from "google-maps";
import { MAP_SETTINGS } from "../constants";

const mapLoader = new Loader(MAP_SETTINGS.key, MAP_SETTINGS.options);
let google;

const start = () => {
  setup(google);

  createMap();
};

export const init = () => {
  if (!document.getElementById("fence-estimator-map")) {
    return false;
  }

  if (!google) {
    mapLoader.load().then((googleAPI) => {
      google = googleAPI;

      start(google);
    });
  } else {
    start(google);
  }
};
