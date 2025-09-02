chrome.storage.local.get(["openTab"], (data) => {
  if (!data.openTab) return;

  let processed = false;

  function walk(node) {
    if (processed) return;

    node.childNodes.forEach(child => {
      if (processed) return;

      if (child.nodeType === Node.TEXT_NODE) {
        const steamRegex = /steam:\/\/[^\s]+/g;
        const matches = child.nodeValue.match(steamRegex);

        if (matches && matches.length > 0) {
          window.open(matches[0], "_blank"); // 첫 번째 링크만 새 탭 열기
          processed = true;
        }
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    });
  }

  walk(document.body);
});
