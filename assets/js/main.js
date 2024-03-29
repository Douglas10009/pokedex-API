const pokemonList = document.getElementById("pokemonsList")
const loadMoreButton = document.getElementById('loadMore')
const maxRecords = 151
const limit = 20
let offset = 0



function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHTML = pokemons.map((pokemon) => `
        <a id='poke-details' onclick='window.location.href = "assets/pages/details.html?id=${pokemon.number}"'>
            <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class='type ${type}'>${type}</li>`).join('')}
                        </ol>

                        <img src="${pokemon.photo}"
                            alt="${pokemon.name} image">
                    </div>
                </li>
        </a>
    `).join('')
        pokemonList.innerHTML += newHTML
    })
}

loadPokemonItens(offset, limit)



loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordsNextPage = offset + limit

    if (qtdRecordsNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
