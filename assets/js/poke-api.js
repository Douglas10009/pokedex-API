const pokeApi = {}


//Reduzir todo o excesso de informações
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.specie = pokeDetail.species.name;

    pokemon.height = pokeDetail.height;

    pokemon.weight = pokeDetail.weight;

    const abilities = pokeDetail.abilities.map((typeSlot) => typeSlot.ability.name);
    const [ability] =  abilities;
    pokemon.abilities = abilities;
    pokemon.ability = ability;


    pokemon.icon = pokeDetail.sprites.front_default;

    return pokemon
}

pokeApi.getPokemonsDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonResponse) => jsonResponse.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetails))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)

        .catch((error) => console.error(error))
}

pokeApi.getPokemon = async function (idPokemon) {
    const url = `https://pokeapi.co/api/v2/pokemon/${idPokemon}/`

    return fetch(url)
        .then((response) => response.json())
        .then((responseBody) => convertPokeApiDetailToPokemon(responseBody))
        .then((pokemonJson)=>  pokemonJson)
}
