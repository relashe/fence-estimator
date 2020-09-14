import { init as loadedMapModule } from "./modules/loadedMapModule";

var fenceEstimatorTrigger = document.getElementById("fence-estimator-trigger");

fenceEstimatorTrigger &&
  fenceEstimatorTrigger.addEventListener("click", () => {
    setTimeout(() => {
      loadedMapModule();
    }, 200);
  });
