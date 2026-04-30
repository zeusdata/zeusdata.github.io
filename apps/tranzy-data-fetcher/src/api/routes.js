import { BASE_URL, getOption } from "./config.js";
import { selectedAgency } from "./agency.js";

export const downloadRoutes = document.getElementById("download-routes");
export async function fetchRoutes(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, getOption());
    const data = await response.json();
    console.log(data);
    function createLink() {
      let routes = JSON.stringify(data, null, 2);
      let blob = new Blob([routes], { type: "application/json" });
      downloadRoutes.href = URL.createObjectURL(blob);
      downloadRoutes.download = `[zeusdata.dev]_${selectedAgency}_${endpoint}.json`;

      URL.revokeObjectURL(downloadRoutes.href);
      console.log("blob", blob);
    }

    downloadRoutes.addEventListener("click", function () {
      createLink();
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}
