let activeTabId = null;
let startTime = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  trackTime(tab.url);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === "complete") {
    trackTime(tab.url);
  }
});

function trackTime(url) {
  const now = Date.now();
  if (activeTabId && startTime) {
    const timeSpent = Math.floor((now - startTime) / 1000); // in seconds
    const domain = new URL(url).hostname;

    chrome.storage.local.get(["sites"], (result) => {
      const sites = result.sites || {};
      if (!sites[domain]) sites[domain] = 0;
      sites[domain] += timeSpent;
      chrome.storage.local.set({ sites });
    });
  }
  startTime = now;
  activeTabId = true;
}
