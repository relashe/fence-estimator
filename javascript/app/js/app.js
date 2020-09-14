import { init as loadedMapModule } from "./modules/loadedMapModule";

document.addEventListener("DOMContentLoaded", () => {
  // loadedMapModule();

  $("#exampleModal").on("shown.bs.modal", function(e) {
    loadedMapModule();
  });
});
