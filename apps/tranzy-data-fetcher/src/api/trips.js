import { BASE_URL, getOption } from "./config.js";
import { selectedAgency } from "./agency.js";

export const downloadTrips = document.getElementById("download-trips");
export async function fetchTrips(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, getOption());
    const data = await response.json();
    console.log(data);
    function createLink() {
      let trips = JSON.stringify(data, null, 2);
      let blob = new Blob([trips], { type: "application/json" });
      downloadTrips.href = URL.createObjectURL(blob);
      downloadTrips.download = `[zeusdata.dev]_${selectedAgency}_${endpoint}.json`;

      URL.revokeObjectURL(downloadTrips.href);
      console.log("blob", blob);
    }

    downloadTrips.addEventListener("click", function () {
      createLink();
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}
