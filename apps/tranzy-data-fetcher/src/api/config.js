import { selectedAgency } from "./agency.js";

export const BASE_URL = "https://api.tranzy.ai/v1/opendata/";
// export let selectedAgency = null;
export let API_KEY;
export function getOptionAgency() {
  return {
    method: "GET",
    headers: {
      Accept: "application/json",
      "X-API-KEY": API_KEY,
    },
  }; //return end
}
const inputApiKey = document.getElementById("input-api-key");

inputApiKey.addEventListener("input", function (e) {
  API_KEY = e.target.value;
});

export function getOption() {
  return {
    method: "GET",
    headers: {
      "X-Agency-Id": selectedAgency,
      Accept: "application/json",
      "X-API-KEY": API_KEY,
    },
  };
}
