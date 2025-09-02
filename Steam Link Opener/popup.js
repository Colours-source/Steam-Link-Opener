const button = document.getElementById("toggleBtn");

function updateButton(enabled) {
  if (enabled) {
    button.textContent = "ON";
    button.style.color = "green";
  } else {
    button.textContent = "OFF";
    button.style.color = "red";
  }
}

// 처음 상태 불러오기
chrome.storage.local.get(["openTab"], (data) => {
  if (data.openTab === undefined) data.openTab = false;
  chrome.storage.local.set({ openTab: data.openTab }, () => {
    updateButton(data.openTab);
  });
});

// 버튼 클릭 시 토글
button.addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "toggleFeature" }, (res) => {
    updateButton(res.enabled);
  });
});
