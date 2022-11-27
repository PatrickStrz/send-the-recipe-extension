async function sendText(phone, ingredients) {
    console.log("should make request")
        try {
          console.log("requesting")
          const res=await fetch ("https://mmfu3ya9sh.execute-api.us-east-1.amazonaws.com/dev/send-message", {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //   mode: 'cors', // no-cors, *cors, same-origin
        //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //   credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify({"message": ingredients, phone}) // body data type must match "Content-Type" header
        } );
          const record=await res.json();
          console.log('hihi data:',record);
        } catch(e) {
          console.log("ERRR:",e)
        }
      }
      
  




window.addEventListener("DOMContentLoaded", () => {  
    // console.log(getIngredients())
    const button = document.getElementById('send-recipe-btn')
    const getPhoneNumber = () => document.getElementById('phone-input').value
    button.addEventListener('click', (e) => {
        const phone = getPhoneNumber()
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: "send-message-clicked", payload: { phone
        }}, function(response) {
            sendText(phone, response.status)
              console.log(response.status);
              alert(`sent ingredients to ${phone}: \n ------------- \n ${response.status}`)
            });
          });
    } )
})

