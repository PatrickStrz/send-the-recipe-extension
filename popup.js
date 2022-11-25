async function sendText() {
    console.log("should make request")
        try {
          console.log("requesting")
          const res=await fetch ("http://localhost:3000/dev/hello", {
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
          body: JSON.stringify({"name": "EXTENSH", "phone": "+14168060340"}) // body data type must match "Content-Type" header
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





    
    // const sendMessage = () => chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //     chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    //     //   console.log(response.farewell);
    //     });
    //   });
    // // button.addEventListener('click', (e) => sendText() )
    button.addEventListener('click', (e) => {
        // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        //     const activeTab = tabs[0]
      
        //     chrome.runtime.sendMessage({
        //       type: "send_text_submitted",
        //       data: { value: e.target.value, tabId: activeTab.id },
        //     })
        //   })

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
              console.log(response.farewell);
            });
          });
    } )
})

