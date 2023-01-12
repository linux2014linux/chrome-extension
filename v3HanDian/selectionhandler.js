let entranceElementId = "hanDianEntrance";
let detailElementId = "hanDianDetail";

function whetherChinese(text) {
	let pattern = /^[\u4E00-\u9FA5\uF900-\uFA2D]{1,}$/;
    return pattern.test(text);
}

function wordDetail(selectedText, xOffset, yOffset) {
    let detailElement = document.createElement("iframe");
    detailElement.id = detailElementId;
    detailElement.width = "400px";
    detailElement.height = "500px";
    detailElement.style.zIndex = "99999";
    detailElement.style.position = "absolute";
    detailElement.style.left = xOffset;
    detailElement.style.top = yOffset;
    detailElement.frameBorder = "0";
    detailElement.src = 'https://www.zdic.net/hans/' + encodeURIComponent(selectedText || '汉典');
    document.body.appendChild(detailElement);
}

function wordEntrance() {
    let selection = document.getSelection();
    let selectedText = selection.toString();
    if (selectedText != "" && whetherChinese(selectedText)) {
        let oRect = selection.getRangeAt(0).getBoundingClientRect();
        let xOffset = oRect.x + oRect.width + 7 + "px";
        let yOffset = window.scrollY + oRect.y + 7 + "px";

        let entranceElement = document.createElement("div");
        entranceElement.id = entranceElementId;
        entranceElement.innerText = "汉";
        entranceElement.style.lineHeight = "35px";
        entranceElement.style.left = xOffset;
        entranceElement.style.top = yOffset;
        entranceElement.style.width = "35px";
        entranceElement.style.height = "35px";
        entranceElement.style.borderRadius = "30px";
        entranceElement.style.textAlign = "center";
        entranceElement.style.zIndex = "9999";
        entranceElement.style.position = "absolute";
        entranceElement.style.backgroundColor = "rgb(200, 244, 255)";
        entranceElement.style.cursor = "pointer";
        entranceElement.style.boxShadow = "2px 2px 1px rgb(200 200 200)";
        entranceElement.addEventListener("mousedown", () => {
            wordDetail(selectedText, xOffset, yOffset);
        });
        document.body.appendChild(entranceElement);
    }
}

function init() {
    document.onmouseup = wordEntrance;
    document.onmousedown = (e) => {
        if (e.target.id != entranceElementId && e.target.id != detailElementId) {
            let entranceElement = document.getElementById(entranceElementId);
            if (entranceElement) {
                entranceElement.parentNode.removeChild(entranceElement);
            }

            let detailElement = document.getElementById(detailElementId);
            if (detailElement) {
                detailElement.parentNode.removeChild(detailElement);
            }
        }
    }
}
init();