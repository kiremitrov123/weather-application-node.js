console.log('Client side js file is loaded')


const weatherForm = document.querySelector('form')
const searchValue = document.querySelector('input')
const messageOne = document.querySelector('#firstMessage')
const messageTemperature = document.querySelector('#messageTemperature')
const messageTwo = document.querySelector('#secondMessage')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = searchValue.value
    messageOne.textContent = 'Loading..'

    fetch('/weather/?address='+location).then((response) => {
    response.json().then((data) => {

            if (data.error) {
                messageOne.textContent = data.error      
            } else {
                messageOne.textContent = "Location: " + data.location
                messageTemperature.textContent = "Temperature: " + data.forecast.temperature + "°F"
                messageTwo.textContent = "Summary: " + data.forecast.summary
            }
        })
    })
})