import { BASE_URL, getOption } from "./config.js";
import { selectedAgency } from "./agency.js";

export const downloadStopTimes = document.getElementById("download-stop-times");
export async function fetchStopTimes(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, getOption());
    const data = await response.json();
    console.log(data);
    function createLink() {
      let stopTimes = JSON.stringify(data, null, 2);
      let blob = new Blob([stopTimes], { type: "application/json" });
      downloadStopTimes.href = URL.createObjectURL(blob);
      downloadStopTimes.download = `[zeusdata.dev]_${selectedAgency}_${endpoint}.json`;

      URL.revokeObjectURL(downloadStopTimes.href);
      console.log("blob", blob);
    }

    downloadStopTimes.addEventListener("click", function () {
      createLink();
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}
