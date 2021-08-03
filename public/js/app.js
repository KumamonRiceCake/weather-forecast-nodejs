const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const searchCurrentLocation = document.querySelector('#my-location')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value
    const weatherUrl = '/weather?address=' + location

    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch(weatherUrl).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })
})

searchCurrentLocation.addEventListener('click', (e) => {
    e.preventDefault()
    
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        const weatherUrl = `/weather/current?latitude=${latitude}&longitude=${longitude}`

        message1.textContent = 'Loading...'
        message2.textContent = ''
    
        fetch(weatherUrl).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    message1.textContent = data.error
                } else {
                    message1.textContent = data.location
                    message2.textContent = data.forecast
                }
            })
        })
    })
})