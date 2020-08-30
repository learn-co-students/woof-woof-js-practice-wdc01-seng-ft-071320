let url = 'http://localhost:3000/pups/'
let dogBar = document.querySelector('div#dog-bar')
let dogInfo = document.getElementById('dog-info')
let isGoodDog = false

fetch(url)
.then(res => res.json())
.then(dogArray => dogArray.forEach(dog => showDog(dog)))

function showDog(dog){
    const span = document.createElement('span')
    dogBar.append(span)
    span.innerText = dog.name

    span.addEventListener('click', () =>{
        dogInfo.innerHTML = ""
        const img = document.createElement('image')
        img.src = dog.image

        const h2 = document.createElement('h2')
        h2.innerText = dog.name

        fetch(url + dog.id)
        .then(res => res.json())
        .then(dogInfo => console.log(dogInfo)) 
    
        const btn = document.createElement('button')
        if (isGoodDog = !isGoodDog)
            btn.innerText = 'Good Dog!'
        else
        isGoodDog = isGoodDog
            btn.innerText = 'Bad Dog!'
            
            btn.addEventListener('click', () =>{
                configObj = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    },
                    body: JSON.stringify({
                        isGoodDog: !dog.isGoodDog
                    })
                }
               fetch(url + dog.id, configObj)
               .then(res => res.json())
               .then(updatedDog => dog.isGoodDog? btn.innerText = 'Good Dog!' : btn.innerText = 'Bad Dog!')

            })
            dogInfo.append(img, h2, btn)
    })


}

