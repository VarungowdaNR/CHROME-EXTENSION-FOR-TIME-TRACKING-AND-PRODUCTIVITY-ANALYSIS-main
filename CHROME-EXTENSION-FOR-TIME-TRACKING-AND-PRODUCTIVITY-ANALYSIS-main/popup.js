const PRODUCTIVE = ["github.com", "stackoverflow.com"];
const UNPRODUCTIVE = ["facebook.com", "instagram.com", "youtube.com"];

chrome.storage.local.get("sites", (result) => {
  const list = document.getElementById("siteList");
  const sites = result.sites || {};

  for (const domain in sites) {
    const li = document.createElement("li");
    li.textContent = `${domain}: ${sites[domain]}s`;
    if (PRODUCTIVE.includes(domain)) {
      li.className = "productive";
    } else if (UNPRODUCTIVE.includes(domain)) {
      li.className = "unproductive";
    }
    list.appendChild(li);
  }
});
