import { BASE_URL, getOption } from "./config.js";
import { selectedAgency } from "./agency.js";

export const downloadShapes = document.getElementById("download-shapes");
export async function fetchShapes(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, getOption());
    const data = await response.json();
    console.log(data);
    function createLink() {
      let shapes = JSON.stringify(data, null, 2);
      let blob = new Blob([shapes], { type: "application/json" });
      downloadShapes.href = URL.createObjectURL(blob);
      downloadShapes.download = `[zeusdata.dev]_${selectedAgency}_${endpoint}.json`;

      URL.revokeObjectURL(downloadShapes.href);
      console.log("blob", blob);
    }

    downloadShapes.addEventListener("click", function () {
      createLink();
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}
