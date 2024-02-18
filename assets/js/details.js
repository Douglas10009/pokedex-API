// pokeApi.getPokemon(1)
// debugger

const url = new URLSearchParams(window.location.search);
const idPokemon = url.get(`id`);


async function main() {
    const pokemon = await pokeApi.getPokemon(idPokemon);

    const nome = document.getElementById('nome');
    nome.innerText = pokemon.name;

    const numero = document.querySelector('.number');
    numero.innerText += pokemon.number;

    const listaTipos = document.querySelector('.types')
    listaTipos.innerHTML = pokemon.types.map((type) => `<li class='type'>${type}</li>`).join(' ');

    const imagem = document.querySelector('.pokemonImg');
    imagem.src = pokemon.photo;

    const specie = document.querySelector('.specie');
    specie.innerText += pokemon.specie;

    const height = document.querySelector('.height');
    height.innerText += pokemon.height + ' kg';

    const weight = document.querySelector('.weight');
    weight.innerText += pokemon.weight + ' cm';

    const abilities = document.querySelector('.abilities');
    abilities.innerText += pokemon.abilities.map((ability) => ability).join(',');

    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = pokemon.icon;

    const corFundo = document.querySelector('.main');
    console.log(corFundo);
    corFundo.classList.add(pokemon.type);
}

main()




// debugger