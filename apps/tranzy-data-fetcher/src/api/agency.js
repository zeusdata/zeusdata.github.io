import { API_KEY, BASE_URL, getOptionAgency } from "./config.js";
// import { checkApiKey } from "../../main.js";
export const selectAgency = document.getElementById("select-agency");
const generateData = document.getElementById("generate-data");
export const statusData = document.getElementById("status-data");
export let selectedAgency = null;
export const selectUi = document.getElementById("select-ui");
export const statusKey = document.getElementById("status-key");
export const apiKeyUi = document.getElementById("api-key-ui");

export async function fetchAgency(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, getOptionAgency());
    const data = await response.json();
    console.log(data);

    data.forEach((agency) => {
      const option = document.createElement("option");
      option.value = agency.agency_id;
      option.textContent = `${agency.agency_id} | ${agency.agency_name}`;

      selectAgency.appendChild(option);
    });
    if (data) {
      apiKeyUi.style.border = "1px solid #67bf82";
      statusKey.style.color = "#67bf82";
      statusKey.textContent = "SUCCESS!";
      statusData.textContent = "";
      // generateData.textContent = "GENERATE DATA()";
    }

    selectAgency.addEventListener("change", function () {
      console.log("agencySelected", this.value);
      selectedAgency = this.value;
      selectUi.style.border = "1px solid #F5B727";
      statusData.textContent = `SELECTED AGENCY ID: ${this.value}`;
      statusData.style.color = "#fff";

      setInterval(() => {
        generateData.textContent = "GENERATE DATA()";
      }, 300);
    });
  } catch (error) {
    console.error(error);
    apiKeyUi.style.border = "1px solid crimson";
    statusKey.textContent = "ERROR:INVALID KEY!";
  }
}
