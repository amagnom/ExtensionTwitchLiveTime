var timeStampLive = "Live time not informed";
var textHtml = "";

chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action == "getSource") {
        timeStampLive = request.source;
        document.querySelector('#result').innerHTML = timeStampLive;
    }
});

function onWindowLoad() {
    var resultFinally = "";
    var dataSaved = "";
    var message = document.querySelector('#message');
    document.querySelector('#btnsave').addEventListener('click', onclicksave, false)
    document.querySelector('#btndownload').addEventListener('click', onclickdownload, false)
    document.querySelector('#btnclear').addEventListener('click', onclickclear, false)

    chrome.tabs.executeScript(null, {
        file: "getPagesSource.js"
    }, function () {
        if (chrome.runtime.lastError) {
            message.innerText = 'Not in a live';
        }
    });

    chrome.storage.sync.get(['twitchtimestamp'], function (items) {
        if (items.twitchtimestamp) {
            dataSaved = items.twitchtimestamp;
        }
    });

    function onclicksave() {
        let text = "";
        let timeStamp = "";
        textHtml = document.querySelector('#text').value;
        if (timeStampLive) {
            timeStamp = timeStampLive;
        }
        else {
            timeStamp = "Live time not informed";
        }

        if (textHtml) {
            text = textHtml;
        }
        else {
            text = "Text not informed";
        }
        resultFinally = text + " - " + timeStamp + "\n";
        document.querySelector('#result').innerHTML = resultFinally;
        
        chrome.storage.sync.get(['twitchtimestamp'], function (items) {
            if (items.twitchtimestamp) {
                dataSaved = items.twitchtimestamp;
            }
        });
    
        let newItemSave = dataSaved + resultFinally;
        chrome.storage.sync.set({ 'twitchtimestamp': newItemSave }, function () {
            console.log('Settings saved');
        });
    }

    function onclickdownload() {
        var textToDownload = "";
        chrome.storage.sync.get(['twitchtimestamp'], function (items) {
            textToDownload = items.twitchtimestamp;
            dataSaved = dataSaved + textToDownload;
            var blob = new Blob([dataSaved], { type: "text/plain" });
            var url = URL.createObjectURL(blob);
            chrome.downloads.download({
                url: url,
                filename: 'Texto.txt'
            });
        });
    }

    function onclickclear() {
        chrome.storage.local.remove(["twitchtimestamp"], function () {
            var error = chrome.runtime.lastError;
            if (error) {
                console.error(error);
            }
            resultFinally = "";
            dataSaved = "";
        })
        chrome.storage.sync.set({ 'twitchtimestamp': "" }, function () {
            console.log('Settings saved');
        });
    }
}

window.onload = onWindowLoad;


