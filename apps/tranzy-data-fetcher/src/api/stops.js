import { BASE_URL, getOption } from "./config.js";
import { selectedAgency } from "./agency.js";

export const downloadStops = document.getElementById("download-stops");
export async function fetchStops(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, getOption());
    const data = await response.json();
    console.log(data);
    function createLink() {
      let stops = JSON.stringify(data, null, 2);
      let blob = new Blob([stops], { type: "application/json" });
      downloadStops.href = URL.createObjectURL(blob);
      downloadStops.download = `[zeusdata.dev]_${selectedAgency}_${endpoint}.json`;

      URL.revokeObjectURL(downloadStops.href);
      console.log("blob", blob);
    }

    downloadStops.addEventListener("click", function () {
      createLink();
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}
