console.log("tranzy data fetcher");
import { fetchAgency } from "./src/api/agency.js";
import { fetchVehicles } from "./src/api/vehicles.js";
// import { API_KEY } from "./src/api/config.js";
import { selectAgency } from "./src/api/agency.js";
// await fetchAgency("agency");
import { selectUi } from "./src/api/agency.js";
import { statusData } from "./src/api/agency.js";
import { selectedAgency } from "./src/api/agency.js";
import { downloadVehicles } from "./src/api/vehicles.js";
import { statusKey } from "./src/api/agency.js";
import { apiKeyUi } from "./src/api/agency.js";
import { downloadRoutes, fetchRoutes } from "./src/api/routes.js";
import { downloadShapes, fetchShapes } from "./src/api/shapes.js";
import { downloadStopTimes, fetchStopTimes } from "./src/api/stopTimes.js";
import { downloadStops, fetchStops } from "./src/api/stops.js";
import { downloadTrips, fetchTrips } from "./src/api/trips.js";
const statusDownload = document.getElementById("status-download");
const statusZip = document.getElementById("status-zip");
const saveUi = document.getElementById("save-ui");

const checkApiKey = document.getElementById("check-api-key");
const downloadFilesUi = document.getElementById("download-files-ui");
checkApiKey.addEventListener("click", async function () {
  selectAgency.innerHTML = "<option>Choose an agency</option>";
  await fetchAgency("agency");
});

async function createZip() {
  const zip = new JSZip();
  const folder = zip.folder("zeusdata");

  let vehicles = await fetchVehicles("vehicles");
  let routes = await fetchRoutes("routes");
  let trips = await fetchTrips("trips");
  let shapes = await fetchShapes("shapes");
  let stops = await fetchStops("stops");
  let stopTimes = await fetchStopTimes("stop_times");

  folder.file("vehicles.json", JSON.stringify(vehicles, null, 2));
  folder.file("routes.json", JSON.stringify(routes, null, 2));
  folder.file("trips.json", JSON.stringify(trips, null, 2));
  folder.file("shapes.json", JSON.stringify(shapes, null, 2));
  folder.file("stops.json", JSON.stringify(stops, null, 2));
  folder.file("stopTimes.json", JSON.stringify(stopTimes, null, 2));

  const content = await zip.generateAsync({ type: "blob" });
  // let blob = new Blob([vehicles], { type: "application/json" });
  return content;
  // const a = document.createElement("a");
  //
  // a.href = url;
  // a.download = "zeus_data_tranzty_files.zip";
  // a.click();
  //
  // URL.revokeObjectURL(url);
}

const generateData = document.getElementById("generate-data");

console.log("mainSelectedAgency", selectedAgency);
generateData.addEventListener("click", async function () {
  if (selectedAgency === null) {
    statusData.textContent = "ERROR: AGENCY REQUIRED!";
    selectUi.style.border = "1px solid crimson";
  } else {
    createZip();
    statusData.textContent = "Fetching vehicles...";
    await fetchVehicles("vehicles");
    statusData.textContent = "Fetching routes...";
    await fetchRoutes("routes");
    statusData.textContent = "Fetching trips...";
    await fetchTrips("trips");
    statusData.textContent = "Fetching shapes...";
    await fetchShapes("shapes");
    statusData.textContent = "Fetching stops...";
    await fetchStops("stops");
    statusData.textContent = "Fetching stops...";
    await fetchStopTimes("stop_times");

    selectUi.style.border = "1px solid #67bf82";
    statusData.textContent = "DATA GENERATED!";
    statusDownload.style.color = "#fff";
    statusZip.style.color = "#fff";
    statusDownload.textContent = `FILES FOR AGENCY ID: ${selectedAgency}`;
    statusZip.textContent = `ZIP FILE FOR AGENCY ID: ${selectedAgency}`;
    setInterval(() => {
      downloadFilesUi.style.transition = "1s ease-in-out";
      downloadFilesUi.style.border = "1px solid #67bf82";
      saveUi.style.transition = "1s ease-in-out";
      saveUi.style.border = "1px solid #67bf82";
    }, 100);
  }
});

let errorHandler = [
  downloadVehicles,
  downloadRoutes,
  downloadTrips,
  downloadShapes,
  downloadStops,
  downloadStopTimes,
];

errorHandler.forEach((e) => {
  e.addEventListener("click", function () {
    if (
      (selectedAgency === null && statusKey.textContent == "") ||
      statusKey.textContent == "ERROR:INVALID KEY!"
    ) {
      statusDownload.textContent = "ERROR: FILES NOT GENERATED YET!";
      apiKeyUi.style.border = "1px solid crimson";
      selectUi.style.border = "1px solid crimson";
      downloadFilesUi.style.border = "1px solid crimson";
    }
  });
});

selectAgency.addEventListener("click", function () {
  if (
    statusKey.textContent == "" ||
    statusKey.textContent == "ERROR:INVALID KEY!"
  ) {
    selectUi.style.border = "1px solid crimson";
    statusData.textContent = "ERROR: KEY NEEDED!";
  }
});
//
const save = document.getElementById("btn-save");
// save.addEventListener("click", function () {
//   const zip = new JSZip();
//   const folder = zip.folder("zeusdata");
//
//   folder.file("readme", "text");
//   zip.generateAsync({ type: "blob" }).then(function (content) {
//     const url = URL.createObjectURL(content);
//
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "name.zip";
//     a.click();
//
//     URL.revokeObjectURL(url);
//   });
// });
save.addEventListener("click", async function () {
  if (
    (selectedAgency === null && statusKey.textContent == "") ||
    statusKey.textContent == "ERROR:INVALID KEY!"
  ) {
    statusZip.textContent = "ERROR: ZIP NOT GENERATED!";
    apiKeyUi.style.border = "1px solid crimson";
    saveUi.style.border = "1px solid crimson";
    selectUi.style.border = "1px solid crimson";
    downloadFilesUi.style.border = "1px solid crimson";
    saveUi.style.border = "1px solid crimson";
  } else {
    const blob = await createZip();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `[zeusdata.dev]_${selectedAgency}_tranzy_files.zip`;
    a.click();

    setTimeout(() => URL.revokeObjectURL(url), 100);
  }
});
