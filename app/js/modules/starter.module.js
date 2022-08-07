import { Loader } from "google-maps";
import { MAP_SETTINGS } from "../constants";
import { createMap, setup } from "./loadedMap.module";

const mapLoader = new Loader(MAP_SETTINGS.key, MAP_SETTINGS.options);
let google;

const start = () => {
  setup();

  createMap();
};

export const init = async () => {
  if (!document.getElementById("fence-estimator-map")) {
    return false;
  }

  if (!google) {
    google = await mapLoader.load();
  }

  start();
};

export { google };
