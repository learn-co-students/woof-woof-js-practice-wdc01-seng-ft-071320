const dogInfoDiv = document.querySelector('div#dog-info')
const dogBarDiv = document.querySelector('div#dog-bar')
const url = 'http://localhost:3000/pups/'
getAllDogs()

function getAllDogs() {
    fetch(url)
    .then(resp => resp.json())
    .then(dogs => dogs.forEach((dog => displayDog(dog))))
}

// if (filterBtn.innerText === "Filter good dogs: OFF"){displayDog(dog)}
// else if (filterBtn.innerText === "Filter good dogs: ON" && dog.isGoodDog == true){displayDog(dog)}

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

const filterBtn = document.querySelector('#good-dog-filter')

filterBtn.addEventListener('click', () => {
   
    if (filterBtn.innerText === "Filter good dogs: OFF"){
        filterBtn.innerText = "Filter good dogs: ON"
    }


    else {
        filterBtn.innerText = "Filter good dogs: OFF"
    }

    
})

