// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);


function getTimeStampFromSource(document_root) {
    var html = document_root.documentElement.outerHTML;
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