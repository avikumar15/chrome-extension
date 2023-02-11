var divSearch=document.createElement("div");

divSearch.style.zIndex="15";

divSearch.style.top="30%";
divSearch.style.left="20%";
divSearch.style.height="30px";
divSearch.style.margin="auto";
divSearch.style.position="absolute";
divSearch.style.backgroundColor="#353b48";
divSearch.style.borderRadius="30px";
divSearch.style.padding="10px";

document.body.appendChild(divSearch);

var innerDivSearch=document.createElement("input");

innerDivSearch.type = "text";
innerDivSearch.placeholder = "Searching"
innerDivSearch.style.color="white";
innerDivSearch.style.border="0";
innerDivSearch.style.outline="0";
innerDivSearch.style.background="none";
innerDivSearch.style.width="550px";
innerDivSearch.style.caretColor="transparent";
innerDivSearch.style.lineHeight="30px";
innerDivSearch.style.transition="width 0.4s linear";
innerDivSearch.style.padding="0 10px";



divSearch.appendChild(innerDivSearch);


divSearch.addEventListener('keypress', function(e) {
    if(e.key == "Enter") {

        var divSearchResultOuter=document.createElement("div");

        divSearchResultOuter.style.zIndex="15";

        divSearchResultOuter.style.top="20%";
        divSearchResultOuter.style.left="60%";
        divSearchResultOuter.style.width="35%";
        divSearchResultOuter.style.height="50%";
        divSearchResultOuter.style.backgroundColor="#353b48";
        divSearchResultOuter.style.borderRadius="30px"
        divSearchResultOuter.style.margin="auto";
        divSearchResultOuter.style.position="absolute";

        var clicableSearchResultItem=document.createElement("a");

        var divSearchResultItem=document.createElement("div");

        divSearchResultItem.style.backgroundColor="#e6e6ff";
        divSearchResultItem.style.borderRadius="30px";
        divSearchResultItem.style.height="20%";
        divSearchResultItem.style.width="80%";
        divSearchResultItem.style.marginTop="10%";
        divSearchResultItem.style.marginLeft="10%";

        clicableSearchResultItem.href="http://frontdoor.xyz/";

        clicableSearchResultItem.appendChild(divSearchResultItem);
        
        divSearchResultOuter.innerHTML += clicableSearchResultItem.outerHTML + clicableSearchResultItem.outerHTML + clicableSearchResultItem.outerHTML;
        
        document.body.appendChild(divSearchResultOuter);

        divSearch.style.visibility="hidden";

    }
})
