import { init as initMap } from "./modules/starter.module";

const mapStarter = (timing = 200) => {
  setTimeout(() => {
    initMap();
  }, timing);
};

var fenceEstimatorTrigger = document.getElementById("fence-estimator-trigger");

fenceEstimatorTrigger &&
  fenceEstimatorTrigger.addEventListener("click", () => {
    mapStarter();
  });

document.addEventListener("DOMContentLoaded", () => {
  mapStarter(1200);
});
