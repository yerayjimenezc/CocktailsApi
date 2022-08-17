const selectedSearch = document.getElementById('select-search')
const inputSearch = document.getElementById('input-search')
const btnSearch = document.getElementById('button-search')
const cardsContainer = document.getElementById('wrapper-cards')
let statuses = 'random'
let id = 0 
let randomId = 0

selectedSearch.onchange = ((e) => {
    statuses = e.target.value
})

function getRandom(res){
    let nameDrink = res.data.drinks[0].strDrink
            let categoryDrink = res.data.drinks[0].strCategory
            let imgDrink = res.data.drinks[0].strDrinkThumb
            let instructionsDrink = res.data.drinks[0].strInstructions
            let newCard = document.createElement('div')
            newCard.setAttribute('class','card mb-4 p-2')
            newCard.setAttribute('id','card')
            newCard.innerHTML = `
            <div class="row g-0">
                  <div class="col-md-4 d-flex align-items-center">
                    <img src="${imgDrink}" class="img-fluid rounded" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${nameDrink}</h5>
                      <div class="card-text row d-flex">
                        <ul class="col" id='measures${id}'>
                        </ul>
                        <ul class="col" id='ingredients${id}'>
                        </ul>
                      </div>
                      <p class="card-text">${instructionsDrink}</p>
                      <p class="card-text"><small class="text-muted">${categoryDrink}</small></p>
                    </div>
                  </div>
                </div>
            `
            cardsContainer.appendChild(newCard)
            let measureContainer = document.getElementById(`measures${id}`)
            let ingredientsContainer = document.getElementById(`ingredients${id}`)

            for(let i = 0; i < 10; i++){
                let measureOz = res.data.drinks[0][`strMeasure${i}`]
                let measureLi = document.createElement('li')
                measureLi.innerHTML =`${measureOz}`
                if (measureOz != null){
                    measureContainer.appendChild(measureLi)
                }
            }
            for(let i = 0; i < 10; i++){
                let ingredients = res.data.drinks[0][`strIngredient${i}`]
                let ingredientsLi = document.createElement('li')
                ingredientsLi.innerHTML=`${ingredients}`
                if (ingredients != null){
                    ingredientsContainer.appendChild(ingredientsLi)
                }
            }

            id++
}
function getByName(res) {
    for (let x = 0; res.data.drinks.length > x; x++){
        let nameDrink = res.data.drinks[x].strDrink
            let categoryDrink = res.data.drinks[x].strCategory
            let imgDrink = res.data.drinks[x].strDrinkThumb
            let instructionsDrink = res.data.drinks[x].strInstructions
            let newCard = document.createElement('div')
            newCard.setAttribute('class','card mb-4 p-2')
            newCard.setAttribute('id','card')
            newCard.innerHTML = `
            <div class="row g-0">
                  <div class="col-md-4 d-flex align-items-center">
                    <img src="${imgDrink}" class="img-fluid rounded" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${nameDrink}</h5>
                      <div class="card-text row d-flex">
                        <ul class="col" id='measures${id}'>
                        </ul>
                        <ul class="col" id='ingredients${id}'>
                        </ul>
                      </div>
                      <p class="card-text">${instructionsDrink}</p>
                      <p class="card-text"><small class="text-muted">${categoryDrink}</small></p>
                    </div>
                  </div>
                </div>
            `
            cardsContainer.appendChild(newCard)
            let measureContainer = document.getElementById(`measures${id}`)
            let ingredientsContainer = document.getElementById(`ingredients${id}`)

            for(let i = 0; i < 10; i++){
                let measureOz = res.data.drinks[x][`strMeasure${i}`]
                let measureLi = document.createElement('li')
                measureLi.innerHTML =`${measureOz}`
                if (measureOz != null){
                    measureContainer.appendChild(measureLi)
                }
            }
            for(let i = 0; i < 10; i++){
                let ingredients = res.data.drinks[x][`strIngredient${i}`]
                let ingredientsLi = document.createElement('li')
                ingredientsLi.innerHTML=`${ingredients}`
                if (ingredients != null){
                    ingredientsContainer.appendChild(ingredientsLi)
                }
            }

            id++
    }

}
function methodSearch(){
    let inputValue = inputSearch.value
    inputSearch.value = ''
    cardsContainer.innerHTML = ''
    if(statuses === 'random'){
        axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then((res) => {
            getRandom(res)
        })
    } else if (statuses === 'name') {
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then((res) => {
            getByName(res)
        })
    } else if (statuses === 'ingredient') {
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`)
        .then((res) => {
            getByName(res)
        })
    } else if (statuses === 'letter') {
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`)
        .then((res) => {
            getByName(res)
        })
    }
}

inputSearch.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        methodSearch()
    }
})  
btnSearch.onclick = (() => {
    methodSearch()
})
