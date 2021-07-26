const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const message1=document.querySelector('#message1')
const message2=document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    //console.log(location,'is here')

    fetch('http://localhost:3001/weather?address='+location).then(resp => {
    resp.json().then((data) => {
        if(data.error){
            return console.log(data)
        }
        message1.innerHTML = 'Location: '+ data.location
        message2.innerHTML = 'Weather: '+ data.forecast
            
    })
})
})

