function searchWord() {
    let selection = window.getSelection();
    let selectedText = selection.toString();
    console.log("已选文本: " + selectedText);

    let oRange = selection.getRangeAt(0);
    let oRect = oRange.getBoundingClientRect();
    console.log(oRect);
    console.log(window.scrollY);

    let iframeId = "hanDianOnlineSearc";
    let iframe = document.getElementById(iframeId);
    if (iframe != undefined) {
        document.body.removeChild(iframe);
    }
    iframe = document.createElement("iframe");
    iframe.id = iframeId;
    iframe.width = "400px";
    iframe.height = "500px";
    iframe.style.zIndex = "9999";
    iframe.style.position = "absolute";
    iframe.style.left = oRect.x + oRect.width + 2 + "px";
    iframe.style.top = window.scrollY + oRect.y + "px";
    iframe.frameBorder = "0";
    iframe.src = 'https://www.zdic.net/hans/' + encodeURIComponent(selectedText || '汉典');
    document.body.appendChild(iframe);
    document.body.onclick = function () {
        document.body.removeChild(iframe);
    };
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