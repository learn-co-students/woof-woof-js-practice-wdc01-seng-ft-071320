const dogInfoDiv = document.querySelector('div#dog-info')
const dogBarDiv = document.querySelector('div#dog-bar')
const url = 'http://localhost:3000/pups/'
getAllDogs()

function getAllDogs() {
    fetch(url)
    .then(resp => resp.json())
    .then(dogs => dogs.forEach((dog => displayDog(dog))))
}

const filterBtn = document.querySelector('#good-dog-filter')
filterBtn.innerText = "Filter good dogs: OFF"

filterBtn.addEventListener('click', () => {

    if (filterBtn.innerText === "Filter good dogs: OFF"){
        filterBtn.innerText = "Filter good dogs: ON" 
        dogBarDiv.innerHTML = ""           //sort ON show only good dogs
        fetch(url)
        .then(resp => resp.json())
        .then(dogs => dogs.forEach((dog => {
            if (dog.isGoodDog === true){
            displayDog(dog)}
        })) )
        }
    else {
        filterBtn.innerText = "Filter good dogs: OFF"
        dogBarDiv.innerHTML = ""
        getAllDogs()
        }
})


function displayDog(dog){
        const span = document.createElement('span')
        span.innerText = dog.name
        dogBarDiv.append(span)

    span.addEventListener('click', () => {
        dogInfoDiv.innerText = ""
            const image = document.createElement('img')
            image.src = dog.image
                const h2 = document.createElement('h2')
                h2.innerText = dog.name
                    const btn = document.createElement('button')
                    dog.isGoodDog ? btn.innerText = "Make Bad Dog!" : btn.innerText = "Make Good Dog!"
                    
                    btn.addEventListener('click', () => {        
                            const configObj = {
                                method: "PATCH",
                                headers: {"Content-Type": "application/json", "Accept": "application/json"},
                                body: JSON.stringify({isGoodDog: !dog.isGoodDog})
                            }
                            fetch(url+dog.id, configObj)
                            .then(res => res.json())
                            .then(updatedDog => {updatedDog.isGoodDog ? btn.innerText = "Make Bad Dog!" : btn.innerText = "Make Good Dog!"})
                    })
        
                    dogInfoDiv.append(image, h2, btn)
    })
}



