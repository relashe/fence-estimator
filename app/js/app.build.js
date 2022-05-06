import { init as loadedMapModule } from "./modules/starter.module";

const mapStarter = (timing = 200) => {
  setTimeout(() => {
    loadedMapModule();
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
