import { BASE_URL, getOption } from "./config.js";
import { selectedAgency } from "./agency.js";

export const downloadVehicles = document.getElementById("download-vehicles");
export async function fetchVehicles(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, getOption());
    const data = await response.json();
    console.log(data);
    function createLink() {
      let vehicles = JSON.stringify(data, null, 2);
      let blob = new Blob([vehicles], { type: "application/json" });
      downloadVehicles.href = URL.createObjectURL(blob);
      downloadVehicles.download = `[zeusdata.dev]_${selectedAgency}_${endpoint}.json`;
      // downloadVehicles.click();

      URL.revokeObjectURL(downloadVehicles.href);
      console.log("blob", blob);
    }

    downloadVehicles.addEventListener("click", function () {
      createLink();
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}
