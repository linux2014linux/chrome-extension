function searchWord() {
    let iframeId = "hanDianOnlineSearc";
    let iframe = document.getElementById(iframeId);
    if (iframe != undefined) {
        document.body.removeChild(iframe);
    }

    let selection = window.getSelection();
    let selectedText = selection.toString();
    let oRange = selection.getRangeAt(0);
    let oRect = oRange.getBoundingClientRect();

    iframe = document.createElement("iframe");
    iframe.id = iframeId;
    iframe.width = "400px";
    iframe.height = "500px";
    iframe.style.zIndex = "9999";
    iframe.style.position = "absolute";
    iframe.style.left = oRect.x + oRect.width + 5 + "px";
    iframe.style.top = window.scrollY + oRect.y + 5 + "px";
    iframe.frameBorder = "0";
    iframe.src = 'https://www.zdic.net/hans/' + encodeURIComponent(selectedText || '汉典');
    document.body.appendChild(iframe);
    document.body.addEventListener("click", function () {
        if (document.getElementById(iframeId) != null) {
            document.body.removeChild(iframe);
        }
    });
    return selection;
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        "id": "v3HanDian",
        "title": "中文查词: %s",
        "contexts": ["selection"]
    });
});


chrome.contextMenus.onClicked.addListener((info, tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: searchWord
    });
});