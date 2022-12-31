 const getIngredients = () => {
  console.log("looking for ingredients")
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

let ingredients  

  try {
    ingredients = getIngredients()
    
  } catch (error) {
    console.log(error)
  }


if (ingredients) {
  console.log("ingredients evaluated")
    // Inform the background page that 
// this tab should have a page-action.
chrome.runtime.sendMessage({
  sender: 'content',
  type: 'recipe',
  payload: {
    recipe: { ingredients}
  }
})

} else {
  // console.log('no recipe - sending message')
  chrome.runtime.sendMessage({
    sender: 'content',
    type: 'no-recipe',
  })
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      // console.log("MESSAGE IN CONTENT", request)
      if (request.type === "send-message-clicked") {

        const ingredients = getIngredients()
        sendResponse({status: ingredients ? ingredients : "no ingredients error"});
      }
      if (request.type === "TAB_ACTIVATED") {
        console.log("TAB RELOADED - IN CONTENT")
        ingredients = getIngredients()
        if (ingredients) {
          chrome.runtime.sendMessage({
            sender: 'content',
            type: 'recipe',
            payload: {
              recipe: { ingredients }
            }
          })
        }
      } 
    }
  );
