chrome.runtime.sendMessage({ command: "clearMap" }); // Removes tabId from Map if it was On before reload

let params = new URLSearchParams(document.location.search);
let isRedirectedByDiv = params.get("redirectedByDiv");
console.log(isRedirectedByDiv);

if (isRedirectedByDiv) {
    const newURL = removeParam("redirectedByDiv", document.location.href);
    window.history.pushState({}, '', newURL);
    chrome.runtime.sendMessage({ command: "displaySearchResult" });
}

chrome.runtime.onMessage.addListener(receiver);
function receiver(message, sender, sendResponse) {
    switch (message.command) {
        case "launch":
            setBlurBody(3);
            launchSearchBar();
            break;

        case "displaySearchResult":
            setBlurBody(3);
            displaySearchResult();
            break;
        

        case "close":
            setBlurBody(0);
            clearEverything();
            break;
    }
}

function setBlurBody(px) {
    document.body.childNodes.forEach(function(item){
        if(item!=undefined && item!=null && item.style!=undefined)
            item.style.filter="blur("+px+"px)";
    })
}

function clearEverything() {
    var searchBar = document.getElementById("searchBarId");
    var searchResultOuterDiv = document.getElementById("searchResultOuterDiv");
    searchBar?.parentNode?.removeChild(searchBar);
    searchResultOuterDiv?.parentNode?.removeChild(searchResultOuterDiv);
}

function styleSearchResultOuterBox(divSearchResultOuter) {
    divSearchResultOuter.id = "searchResultOuterDiv";
    divSearchResultOuter.style.zIndex = "15";
    divSearchResultOuter.style.top = "20%";
    divSearchResultOuter.style.left = "60%";
    divSearchResultOuter.style.width = "35%";
    divSearchResultOuter.style.height = "50%";
    divSearchResultOuter.style.backgroundColor = "#353b48";
    divSearchResultOuter.style.borderRadius = "30px"
    divSearchResultOuter.style.margin = "auto";
    divSearchResultOuter.style.position = "fixed";

    return divSearchResultOuter;
}

function styleSearchResultItem(divSearchResultItem) {
    divSearchResultItem.style.backgroundColor = "#e6e6ff";
    divSearchResultItem.style.borderRadius = "30px";
    divSearchResultItem.style.height = "15%";
    divSearchResultItem.style.width = "80%";
    divSearchResultItem.style.marginTop = "10%";
    divSearchResultItem.style.marginLeft = "10%";

    return divSearchResultItem;
}

// outer box contains three a elements
// each a element contains a div which is the search result item
function displaySearchResult() {

    var divSearchResultOuter = document.createElement("div");
    divSearchResultOuter = styleSearchResultOuterBox(divSearchResultOuter);

    var clicableSearchResultItem = document.createElement("a");
    clicableSearchResultItem.href = "http://frontdoor.xyz?redirectedByDiv=1";
    
    var divSearchResultItem = document.createElement("div");
    divSearchResultItem = styleSearchResultItem(divSearchResultItem)

    clicableSearchResultItem.appendChild(divSearchResultItem);

    // creating three identical search result items
    divSearchResultOuter.innerHTML += clicableSearchResultItem.outerHTML + clicableSearchResultItem.outerHTML + clicableSearchResultItem.outerHTML;
    document.body.appendChild(divSearchResultOuter);
}

function styleSearchDiv(divSearch) {
    divSearch.id = "searchBarId";
    divSearch.style.zIndex = "150000";
    divSearch.style.top = "40%";
    divSearch.style.left = "35%";
    divSearch.style.height = "25px";
    divSearch.style.margin = "auto";
    divSearch.style.position = "fixed";
    divSearch.style.backgroundColor = "#353b48";
    divSearch.style.borderRadius = "30px";
    divSearch.style.padding = "20px";
    divSearch.style.backdropFilter="blur(3px)";

    return divSearch;
}

function styleTextInputDiv(innerDivSearch) {
    innerDivSearch.type = "text";
    innerDivSearch.placeholder = ""
    innerDivSearch.style.color = "white";
    innerDivSearch.style.border = "0";
    innerDivSearch.style.outline = "0";
    innerDivSearch.style.background = "none";
    innerDivSearch.style.width = "550px";
    innerDivSearch.style.caretColor = "white";
    innerDivSearch.style.transition = "width 0.4s linear";
    innerDivSearch.style.padding = "0px 10px";
    innerDivSearch.style.marginTop = "-20px";
    

    return innerDivSearch;
}

function launchSearchBar() {

    console.log("Blur done");
    var divSearch = document.createElement("div");
    divSearch = styleSearchDiv(divSearch);
    var innerDivSearch = document.createElement("input");
    innerDivSearch = styleTextInputDiv(innerDivSearch);
    divSearch.appendChild(innerDivSearch);

    document.body.appendChild(divSearch);

    divSearch.addEventListener('keypress', function (e) {
        if (e.key == "Enter") {
            divSearch.parentNode.removeChild(divSearch);
            // divSearch.style.visibility = "hidden";
            displaySearchResult();
        }
    });
}

function removeParam(key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        if (params_arr.length) rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}