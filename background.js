console.log("Background script works")
console.log("CHROME", chrome)


    
chrome.runtime.onMessage.addListener((msg, sender) => {
    // First, validate the message's structure.
    console.log("MESSAGE LISTENER IN BACKGROUND.JS")
    
    if (msg.type === 'no-recipe') {
      console.log("setting popup to empty state")
      chrome.action.setPopup({ popup: 'emptyState.html'})

      // Enable the page-action for the requesting tab.

      // chrome.action.openPopup({tabId:sender.tab.id },);
    }
    if (msg.type === 'recipe') {
      console.log("setting popup")
      chrome.action.setPopup({ popup: 'popup.html'})

      // Enable the page-action for the requesting tab.
      console.log("MESSAGE", msg)
      console.log("sender:", sender)
      console.log("chrome:",chrome)
      console.log("action:", chrome.action)
      // chrome.action.openPopup({tabId:sender.tab.id },);
    }
  });
