document.addEventListener("DOMContentLoaded", () =>{
    const dogBar = document.querySelector("#dog-bar")
    const url = "http://localhost:3000/pups/"
    const filterBtn = document.querySelector('#good-dog-filter')
    const dogInfo = document.getElementById("dog-info")

    fetch(url)
    .then(res => res.json())
    .then(dogs => {
        addAllDogs(dogs)
    })

    function addName(dog){
        let name = dog.name
        let nameSpan = document.createElement("SPAN")
        nameSpan.innerText = name
        //nameSpan.style.display = "none"
        dog.isGoodDog? nameSpan.className = "good-dog" : nameSpan.className = "bad-dog"
        dogBar.append(nameSpan)


        nameSpan.addEventListener("click", function(){
            
            dogInfo.innerHTML = ""

            fetch(url + dog.id)
            .then(res => res.json())
            .then(dogInfo => console.log(dogInfo))

            let imageTag = document.createElement("IMG")
            imageTag.src = dog.image

            let hTag = document.createElement("H2")
            hTag.innerText = name 

            let btn = document.createElement("BUTTON")
            dog.isGoodDog? btn.innerText = "Good Dog!" : btn.innerText = "Bad Dog!"
            

            // if (filterBtn.id = "filter-on" && dog.isGoodDog === false){
            //     nameSpan.style.display = "none"
            // }

            btn.addEventListener("click",()=>{

                let configObj = {
                    method:"PATCH",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                        isGoodDog: !dog.isGoodDog
                    })
                }
                fetch(url + dog.id, configObj)
                .then(res => res.json())
                .then(updatedDog => {
                    updatedDog.isGoodDog? btn.innerText = "Good Dog!" : btn.innerText = "Bad Dog!"
                    dog = updatedDog
                    dog.isGoodDog? nameSpan.className = "good-dog" : nameSpan.className = "bad-dog"
                })
            })
            dogInfo.append(imageTag, hTag, btn)
            
        })
    }

    function addAllDogs(dogs){
        dogs.forEach(dog => {
            addName(dog)
        })
    }
    let filterOn = false

    filterBtn.addEventListener("click", function(e){
        e.preventDefault
        dogInfo.innerHTML = ""
         filterOn = !filterOn
         filterOn ? filterBtn.innerText = "Filter good dogs: ON" : filterBtn.innerText = "Filter good dogs: OFF"
         filterOn ? filterBtn.id = "filter-on" : filterBtn.id = "filter-off"
         if (filterOn === true){
             document.querySelectorAll(".bad-dog").forEach(dog => {
                dog.style.display = "none"
             })}
        else {
            document.querySelectorAll("span").forEach(dog => {
                dog.style.display = "block"
            })
        }
    }       
    )
})