document.addEventListener("DOMContentLoaded", ()=> {

    const url = "http://localhost:3000/pups/"
    const dogBar = document.querySelector("#dog-bar")
    const dogInfo = document.querySelector("#dog-info")
    const filter = document.querySelector("#good-dog-filter")
    let goodDogsOn = false
    
    function fetchButtons(){
        fetch(url)
        .then(res => res.json())
        .then(pups => addPupButtons(pups))
    }
    fetchButtons()

    filter.addEventListener("click", () =>{
        event.preventDefault()
        if (!goodDogsOn) {
            goodDogsOn = !goodDogsOn
            filter.innerText = "Filter good dogs: ON"
            dogBar.innerHTML = ""
            fetchButtons()
        } else {
            goodDogsOn = !goodDogsOn
            filter.innerText = "Filter good dogs: OFF"
            dogBar.innerHTML = ""
            fetchButtons()
        }
            
    }) 


    function addPupButtons(pups) {

        pups.forEach(pup => {
            if (!goodDogsOn){
                addPupButton(pup)
            } else {
                if (pup.isGoodDog){
                    addPupButton(pup)
                }
            }
        })
    }

    function addPupButton(pup){
        let span = document.createElement("span")
        span.innerText = `${pup.name}`
        dogBar.append(span)
        
        span.addEventListener("click", ()=> {
            dogInfo.innerHTML = "";
            fetch(url+`${pup.id}`)
            .then(res => res.json())
            .then(pupInfo => {postPupInfo(pupInfo)})
        })
        
        function postPupInfo(pupInfo) {
            let img = document.createElement("img")
            img.src = `${pupInfo.image}`
            let h2 = document.createElement("h2")
            h2.innerText = `${pupInfo.name}`
            let btn = document.createElement("button")
            (pupInfo.isGoodDog) ? btn.innerText = "Good Dog!" : btn.innerText="Bad Dog!"
            dogInfo.append(img, h2, btn)
        
        
            btn.addEventListener("click", () => {
                config = {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        isGoodDog: !pup.isGoodDog
                    })
                }
                fetch(url+`${pup.id}`, config)
                .then(res => res.json())
                .then(updatedPup => {
                    pup = updatedPup
                    if (pup.isGoodDog) {
                        btn.innerText = "Good Dog!"
                    } else {
                        btn.innerText = "Bad Dog!"
                    };
                })
            })
        }
    }   
})