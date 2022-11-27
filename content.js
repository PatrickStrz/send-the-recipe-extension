console.log("content.js")

 const getIngredients = () => {
        const script = document.querySelector('script[type="application/ld+json"]')
        const ingredients = JSON.parse(script.innerText)['@graph'].find((item)=> item["@type"] === 'Recipe').recipeIngredient.join("\r\n")
        return ingredients
     }

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.type === "send-message-clicked") {
        console.log("PAYLOAD:", request.payload)
        const ingredients = getIngredients()
        sendResponse({status: ingredients ? ingredients : "no ingredients error"});
      }
    }
  );