console.log("JAVASCRIPT LOADED")

const form = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')


form.addEventListener('submit',(e)=>{
    $("#overlay").show()
    e.preventDefault()
    message1.textContent = "Loading..."
    message2.textContent = ''
    const location = search.value
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message1.textContent = data.error
                $("#overlay").hide()
            }
            else{
                $("#overlay").hide()
                message1.textContent = data.location
                message2.textContent = data.dataForecast
            }
        })
    })
})