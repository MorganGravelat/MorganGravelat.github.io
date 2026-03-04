let apiUrl = "https://pokeapi.co/api/v2/pokemon/"

let queryInput = document.querySelector("#query")
let findBtn = document.querySelector("#findBtn")
let addBtn = document.querySelector("#addBtn")
let msg = document.querySelector("#errorMsg")
let sprite = document.querySelector("#sprite")
let cry = document.querySelector("#cry")
let placeholder = document.querySelector("#placeholder")
let move1 = document.querySelector("#m1")
let move2 = document.querySelector("#m2")
let move3 = document.querySelector("#m3")
let move4 = document.querySelector("#m4")

let currPoke = null
let team = []

function setError(text){
    if(text){
        msg.textContent = text
        msg.style.color = "red"
    } else {
        msg.textContent = ""
    }
}

function togglePlaceholder(show) {
    if(show) {
        placeholder.style.display = "block"
        sprite.style.display = "none"
        cry.style.display = "none"
    } else {
        placeholder.style.display = "none"
    }
}

function clearMoves(){
    let allSelects = [move1, move2, move3, move4]
    for(let i = 0; i < allSelects.length; i++) {
        allSelects[i].innerHTML = ""
        let opt = document.createElement("option")
        opt.value = ""
        opt.textContent = "-- choose a move --"
        allSelects[i].appendChild(opt)
    }
}

function fillMoves(moveList){
    clearMoves()
    let allSelects = [move1, move2, move3, move4]
    for(let i = 0; i < moveList.length; i++){
        for(let j = 0; j < allSelects.length; j++){
            let opt = document.createElement("option")
            opt.value = moveList[i]
            opt.textContent = moveList[i]
            allSelects[j].appendChild(opt)
        }
    }
}

function getSelectedMoves(){
    let moves = []
    let allSelects = [move1, move2, move3, move4]
    for(let i = 0; i < allSelects.length; i++){
        if(allSelects[i].value != ""){
            moves.push(allSelects[i].value)
        }
    }
    return moves
}

async function getPoke(query){
    let key = "poke_" + query
    let cached = localStorage.getItem(key)
    if(cached){
        return JSON.parse(cached)
    }

    let response = await fetch(apiUrl + query)
    if(!response.ok){
        throw new Error("Pokemon not found.")
    }

    let data = await response.json()
    localStorage.setItem(key, JSON.stringify(data))
    return data
}

function showPoke(data){
    currPoke = data

    let img = data.sprites.other["official-artwork"].front_default
    if(!img){
        img = data.sprites.front_default
    }

    togglePlaceholder(false)
    sprite.src = img
    sprite.style.display = "inline-block"

    if(data.cries && data.cries.latest){
        cry.src = data.cries.latest
        cry.style.display = "inline-block"
    } else {
        cry.style.display = "none"
    }

    let moveNames = []
    for(let i = 0; i < data.moves.length; i++){
        moveNames.push(data.moves[i].move.name)
    }
    fillMoves(moveNames)

    addBtn.disabled = false
    setError()
}

function loadTeam(){
    let teamList = document.querySelector("#teamList")
    teamList.innerHTML = ""

    for(let i = 0; i < team.length; i++){
        let card = document.createElement("div")
        card.className = "teamCard"

        let img = document.createElement("img")
        img.src = team[i].sprite
        img.width = 72

        let info = document.createElement("div")

        let title = document.createElement("strong")
        title.textContent = team[i].name
        info.appendChild(title)

        let moveBox = document.createElement("div")
        for(let j = 0; j < team[i].moves.length; j++){
            let pill = document.createElement("span")
            pill.className = "moveLabel"
            pill.textContent = team[i].moves[j]
            moveBox.appendChild(pill)
        }
        info.appendChild(moveBox)

        let removeBtn = document.createElement("button")
        removeBtn.textContent = "Remove"
        removeBtn.setAttribute("data-index", i)
        removeBtn.onclick = function(){
            let idx = this.getAttribute("data-index")
            team.splice(idx, 1)
            loadTeam()
        }
        info.appendChild(removeBtn)

        card.appendChild(img)
        card.appendChild(info)
        teamList.appendChild(card)
    }
}

async function findPoke(){
    let q = queryInput.value.trim().toLowerCase()
    if(q == ""){
        setError("Enter a name or ID.")
        return
    }

    setError()
    addBtn.disabled = true
    clearMoves()
    togglePlaceholder(true)

    try {
        let data = await getPoke(q)
        showPoke(data)
    } catch(err){
        setError(err.message)
    }
}

function addPoke(){
    if(currPoke == null) return

    let chosen = getSelectedMoves()
    if(chosen.length != 4){
        setError("Pick all 4 moves.")
        return
    }

    let pokeSprite = currPoke.sprites.other["official-artwork"].front_default
    if(!pokeSprite){
        pokeSprite = currPoke.sprites.front_default
    }

    team.push({
        name: currPoke.name,
        sprite: pokeSprite,
        moves: chosen
    })

    loadTeam()
    setError()
}

findBtn.onclick = findPoke
addBtn.onclick = addPoke

queryInput.onkeydown = function(e){
    if(e.key == "Enter") findPoke()
}

clearMoves()
togglePlaceholder(true)
