function getTimeStampFromSource(document_root) {
    var time = document.getElementsByClassName("live-time");
    var response = "";

    if (time[0]) {
        response = time[0].innerHTML;
    }
    return response;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: getTimeStampFromSource(document)
});