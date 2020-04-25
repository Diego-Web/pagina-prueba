const pokedex = document.getElementById("pokedex");
const pokeCache = {};
//console.log(pokedex);

const fetchPokemon = async() => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=150`
    const res = await fetch(url);
    const data = await res.json();
    const pokemon = data.results.map((results, index) =>
    ({
        //name: results.name,
        ...results,
        id: index + 1,
        image : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`
    }));
    //console.log(data.results);
    displayPokemon(pokemon);
};    
                    
    
const displayPokemon = (pokemon) => {
    //console.log(pokemon);
    const pokemonHTMLString = pokemon.map( poketemp => `
    <li class="card" onclick="elegirPokemon(${poketemp.id})">
            <img class="card-image" src="${poketemp.image}" />
            <h2 class="card-title">${poketemp.id}. ${poketemp.name} </h2>            
    </li>
    `).join('');
    pokedex.innerHTML = pokemonHTMLString;
}

const elegirPokemon = async(id) => {
    if (!pokeCache[id]){

        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const payload = await res.json();
        pokeCache[id] = payload;
        //console.log(pokeCache);
        displayPopup(payload);
    }
    else{
        displayPopup(pokeCache[id]);
    }
};

const displayPopup = (poketemp) => {
    //console.log(poketemp)    
    const type = poketemp.types.map( type =>
        type.type.name).join(', ');
    const image = poketemp.sprites['front_default'];
    //console.log(type);
    const htmlString =  `
        <div class="popup"> 
            <button id="closeBtn"
            onclick = "closePopup()">Close</button>
            <div class="card">
                    <img class="card-image" src="${image}" />
                    <h2 class="card-title">${poketemp.id}. ${poketemp.name} </h2>  
                    <p><small>Height: </small>${poketemp.height} | <small>Weight: </small>${poketemp.weight} | 
                    <small>Type: </small>${type}                
                    </p>          
            </div>
        </div>
    `;
    pokedex.innerHTML = htmlString + pokedex.innerHTML;
    //console.log(htmlString);
};

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
};

fetchPokemon();