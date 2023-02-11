var isSearchBarActive = false;

chrome.commands.onCommand.addListener((command) => {
    console.log(`Command: ${command}`);

    if(command === "launch") {
        chrome.tabs.executeScript({
            file: "insertSearchBar.js"
        });
    }

    isSearchBarActive = true;
});

chrome.tabs.onRemoved.addListener(function(tabid, removed) {
    alert("tab closed")
});
   
