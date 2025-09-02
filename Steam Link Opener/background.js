chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
      openTab: false // 기본 OFF
    });
  });
  
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "toggleFeature") {
      chrome.storage.local.get(["openTab"], (data) => {
        const newState = !data.openTab;
        chrome.storage.local.set({ openTab: newState }, () => {
          sendResponse({ enabled: newState });
        });
      });
      return true; // 비동기 응답 허용
    }
  });
  