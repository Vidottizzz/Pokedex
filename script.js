const pokeNum = document.querySelector('.pokemon-number');
const pokeName = document.querySelector('.pokemon-name');
const pokeImg = document.querySelector('.pokemons');
const input = document.querySelector('.input-search')
const prevEvo = document.querySelector('.prev-evo');
const currEvo = document.querySelector('.curr-evo');
const nextEvo = document.querySelector('.next-evo');
const form = document.querySelector('.form');
const actualPoke = document.querySelector('.actual-poke');
const prevPoke = document.querySelector('.prev-poke');
const prevBtn = document.querySelector('.btn-prev');
const nextBtn = document.querySelector('.btn-next');
const pokeInfo = document.querySelector('.poke-info');

let searchPokemon = 1;


const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
    
    
    
    // PEGOU A EVOLUÇÃO ANTERIOR
    
    if(APIResponse.status = 200) {
        
        const data = await APIResponse.json();
        return data;
        
    }
    return prev_evo;
    
}


const renderPokemon = async (pokemon) => {

    pokeName.innerHTML = "Não encontrado";
    pokeNum.innerHTML = '';
    pokeNum.innerHTML = '#???'
    pokeImg.src = '';
    
    
    
    const data = await fetchPokemon(pokemon);
    
    
    if (data) {
        pokeImg.style.display = 'block';
        pokeName.innerHTML = data.name;
        pokeNum.innerHTML = '#'+ (data.id);
        pokeImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    }else {
        pokeImg.style.display = 'none';
        pokeName.innerHTML = "Não encontrado"
        pokeNum.innerHTML = '22'
    }
    
    
    const APIResponse2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`);
    const data2 = await APIResponse2.json();
    var prev_evo = data2.evolves_from_species.name;
    if (data2) {
        prevEvo.innerHTML = prev_evo;
        currEvo.innerHTML = data.name;
        
    }else {
        console.log(data2);

    }

    const APIResponse3 = await fetch(`https://pokeapi.co/api/v2/characteristic/${pokemon}/`);
    const data3 = await APIResponse3.json();
    var description = data3.descriptions[7];
    pokeInfo.innerHTML = `" ${description.description} "`;


}

form.addEventListener('submit', (event) => {
    
    event.preventDefault();
    
    renderPokemon(input.value.toLowerCase());
    
});   
prevBtn.addEventListener('click', (event) => {
    if(searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
    
});   
nextBtn.addEventListener('click', (event) => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});   
renderPokemon(searchPokemon);


