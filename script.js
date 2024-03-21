let pokemonContainer = document.querySelector("#card_Container");
let searchInput = document.getElementById("search");
// console.log(searchInput.value);
let filterBtn = document.querySelector("#filter");
let type = document.querySelector( "#type" );
let colors={
    normal:"#95afc0",
    fighting:"#30336b",
    flying:"#81ecec",
    poison:"#6c5ce7",
    ground:"#EFB549",
    rock:"#2d3436",
    bug:"#26de81",
    ghost:"#a55eea",
    steel: "#ab9df2",
    fire: "#ff6a3d",
    water:"#4db8ff",
    grass:"#00b894",
    electric:"#fed330",
    psychic:"#a29bfe",
    ice:"#74b9ff",
    dragon:"#ffeaa7",
    dark: " #333333",
    fairy:"#FF0069",
    shadow:" #1F1F1F"
}
// createpokemoncard detail are stored in main parent container thats  card_container
function createpokemoncard(details) {
  let card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
<div class ="card-inner">
    <div class="card-front">
        <div class="id">ID : ${details.id}</div>
        <img src=${details.sprites.front_default} class="img">  
        <div class="type">${details.types[0].type.name}</div>
        <div class ="name">${details.species.name}</div> 
    </div>
    
        <div class = "back-card">
            <img src =${details.sprites.back_default}>
            <div class ="ability">${details.abilities[0].ability.name}</div>
            <div class ="name">${details.species.name}</div> 
        </div>
    </div>`
    card.querySelector(".card-front").style.backgroundColor = colors[details.types[0].type.name];
    card.querySelector(".back-card").style.backgroundColor = colors[details.types[0].type.name];

return card;
 
}
searchInput.addEventListener('input', ()=>{
let allCards = document.querySelectorAll('.card');
let pokeArr = Array.from(allCards);
pokeArr.forEach((ele)=>{
    let pokeName= ele.children[0].children[0].children[2].innerText;
    // console.log(pokeName);
    if(pokeName.startsWith(searchInput.value)){
        ele.style.display='inline-block';
    }else{
        ele.style.display='none'
    }
})
})

filterBtn = document.addEventListener("click",()=>{

    let allCard =document .querySelectorAll('.card');
let pokeArray = Array.from(allCard);
pokeArray.forEach((ele)=>{
    let pokeType= ele.children[0].children[0].children[2].innerText;
    // console.log(pokeType);
if(pokeType === type.value){
    ele.style.display="inline-block";
   } else {
       ele.style.display ="none"
}
});
});
async function fetchPokemon(i) {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
  let result = await response.json();
  console.log(result);
  return result;
  
  
}
async function fetchmainpage() {
  for (let i = 1; i <= 200; i++) {
    let pokemon = await fetchPokemon(i);
    // console.log(pokemon);

    let card = createpokemoncard(pokemon);
    pokemonContainer.appendChild(card);
    

    
  }
}
fetchmainpage();

let reset = document.getElementById("reset");
reset.addEventListener("click",()=>{
    pokemonContainer.innerText = "";
    run();
})

//   function filterBtn(event) {
//     event.preventDefault(); // prevent the form from resetting immediately
//     if (confirm("Are you sure you want to reset the form?")) {
//       reset(); // reset the form
//     }
//   }