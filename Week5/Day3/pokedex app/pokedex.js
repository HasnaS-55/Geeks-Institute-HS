const API = "https://pokeapi.co/api/v2/pokemon"



const randomBtn = document.getElementById("btn-random")
const prevoiusBtn = document.getElementById("btn-prev")
const nextBtn = document.getElementById("btn-next")
const infoDiv = document.querySelector('.pokemon-info')
let random = 5

function display(json) {
    


    infoDiv.innerHTML = `
    <img src="${json.sprites.other['official-artwork'].front_default}"
    <h1>${json.name}</h1>
    <h4>${json.id}</h4>
    <h4>Height: ${json.height}</h4>
    <h4>Weight: ${json.weight}</h4>
    <div>Type: ${json.types.map(t => t.type.name).join(' ')}</div>
    `

}

async function retrieve(num) {
    
 
    try{
        const response = await fetch(`${API}/${num}`)
        if (!response) throw new Error(`HTTP Error: ${response.status}, ${response.text}`) 

        const data = await response.json()
        display(data)
    }catch (err) {
        console.error("Failed to fetch Pokémon:", err)
        document.querySelector('.info').innerHTML = `<p>Oh no! That Pokemon isn’t available…</p>`
    }
}

randomBtn.addEventListener("click", () => {
    const randomNum = Math.floor(Math.random() * 20) + 1
    random = randomNum 
    
    retrieve(randomNum)

})


prevoiusBtn.addEventListener("click", () => {
    if (!random) console.log("Empty")

    const preRandom = random - 1
    random = preRandom
    
    retrieve(preRandom)
})

nextBtn.addEventListener("click", () => {
    if (!random) console.log("Empty")

    const nextRandom = random + 1
    random = nextRandom
    
    
    retrieve(nextRandom)
})