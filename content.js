
/* 

cases

- type is ['recipe']
- type is 'Recipe'
- type is schema 
  - schema includes recipe 

*/


/*  TODO
 Deal with multiple ld/json ( get POTENTIAL recipe script ) type = "@"
 */


const isTypeRecipe = (type) => {
  console.log('checking type for', type, typeof type)
  if (Array.isArray(type)) {
    // console.log('type is array')
    const recipe = type.find(item => item.toLowerCase() === 'recipe')
    return Boolean(recipe)
  } 
  if (typeof type === "string") 
    return type.toLowerCase() === ('recipe')
}


 const getLDJSONScript = () => document.querySelector('script[type="application/ld+json"]')
 const getRecipe = () => {
  const script = JSON.parse(getLDJSONScript().innerText)
  if (!script) return null

  if (Array.isArray(script)) {
    // console.log('isArray')
    // console.log('script',script)
    return script.find((item)=> isTypeRecipe(item["@type"]))
  }
  if (typeof script['@type'] == 'string' && isTypeRecipe(script['@type'])) {
    return script
  }
  if (script["@graph"]) {
    return script['@graph'].find((item)=> isTypeRecipe(item["@type"]))
  }
 }
 
//  console.log('recipe')

 const getIngredients = () => {
  console.log("looking for ingredients")
  const recipe = getRecipe()
  // console.log('recipe: ', recipe)
  if (recipe) {
    const ingredients = recipe.recipeIngredient.join("\r\n")
    return ingredients
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
