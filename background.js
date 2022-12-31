console.log("Background script works")
console.log("CHROME", chrome)


// background.js

chrome.tabs.onActivated.addListener(function(activeInfo) {
  // console.log("tab activated:", activeInfo.tabId)
  // console.log("disabling")
  chrome.action.disable();

  // console.log("sending message")
  chrome.tabs.sendMessage( activeInfo.tabId, {
    type: "TAB_ACTIVATED", payload: {}}, function(response) {
    sendText(phone, response.status)
    console.log(response.status);
    alert(`SEENT$ ingredients to ${phone}: \n ------------- \n ${response.status}`)
})

})




chrome.runtime.onMessage.addListener((msg, sender) => {
    // First, validate the message's structure.
    console.log("MESSAGE LISTENER IN BACKGROUND.JS")
    
    if (msg.type === 'no-recipe') {
      console.log("setting popup to empty state")
      chrome.action.disable();
      chrome.action.setPopup({ popup: 'emptyState.html'})

      // Enable the page-action for the requesting tab.

      // chrome.action.openPopup({tabId:sender.tab.id },);
    }
    if (msg.type === 'recipe') {
      console.log("recipe")
      // new chrome.declarativeContent.ShowAction()

      chrome.action.enable()
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
