 const getIngredients = () => {
        const script = document.querySelector('script[type="application/ld+json"]')
        if (script) {
          const recipe =  JSON.parse(script.innerText)['@graph'].find((item)=> item["@type"] === 'Recipe')
          if (recipe) {
            const ingredients = recipe.recipeIngredient.join("\r\n")
            return ingredients
          }
        }
        return null
     }

console.log("looking for ingredients")

let ingredients  

  try {
    ingredients = getIngredients()
    
  } catch (error) {
    console.log(error)
  }


if (ingredients) {
    // Inform the background page that 
// this tab should have a page-action.
chrome.runtime.sendMessage({
  sender: 'content',
  type: 'recipe',
  payload: {
    ingredients
  }
})

} else {
  console.log('no recipe - sending message')
  chrome.runtime.sendMessage({
    sender: 'content',
    type: 'no-recipe',
  })
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
