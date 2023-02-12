const isSearchBarActiveMap = new Map();
isSearchBarActiveMap.set(-1, false); // Map<int:bool>

chrome.commands.onCommand.addListener(async (command) => {
    console.log(`Command: ${command}`);
    const tab = await getCurrentTab();
    isSearchBarActive = isSearchBarActiveMap.get(tab.id);

    if (!isSearchBarActive && command === "launch") {
        isSearchBarActiveMap.set(tab.id, true);
        sendMessageToContent(tab.id, command);
    }

    else if (command === "close") {
        isSearchBarActiveMap.set(tab.id, false);
        sendMessageToContent(tab.id, command);
    }
});

// if chrome tab is closed, set search bar for that tab to false
chrome.tabs.onRemoved.addListener(function (tabid, removed) {
    isSearchBarActiveMap.set(tab.id, false);
});

chrome.runtime.onMessage.addListener(receiver);
function receiver(message, sender, sendResponse) {
    switch (message.command) {
        case "clearMap":
            isSearchBarActiveMap.set(sender.tab.id, false);
            break;
        case "displaySearchResult":
            isSearchBarActiveMap.set(sender.tab.id, true);
            sendMessageToContent(sender.tab.id, "displaySearchResult");
            break;
    }
    return true;
}

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

function sendMessageToContent(tabId, command) {
    chrome.tabs.sendMessage(tabId, {
        command: command,
    });
}


