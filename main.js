const container = document.getElementById('pokemon-container');
const searchInput = document.getElementById('search');
const maxPokemon = 151; // você pode mudar para mostrar mais

const typeColors = {
  fire: '#F08030',
  grass: '#78C850',
  electric: '#F8D030',
  water: '#6890F0',
  ground: '#E0C068',
  rock: '#B8A038',
  fairy: '#EE99AC',
  poison: '#A040A0',
  bug: '#A8B820',
  dragon: '#7038F8',
  psychic: '#F85888',
  flying: '#A890F0',
  fighting: '#C03028',
  normal: '#A8A878'
};

let allPokemons = [];

async function fetchPokemons() {
  for (let i = 1; i <= maxPokemon; i++) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const data = await res.json();
      allPokemons.push(data);
      createPokemonCard(data);
    } catch (error) {
      console.error('Erro ao buscar Pokémon:', error);
    }
  }
}

function createPokemonCard(pokemon) {
  const card = document.createElement('div');
  card.classList.add('pokemon-card');

  const type = pokemon.types[0].type.name;
  card.style.backgroundColor = typeColors[type] || '#777';

  card.innerHTML = `
    <h3>#${pokemon.id} ${pokemon.name}</h3>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <div class="pokemon-type">${type}</div>
  `;

  container.appendChild(card);
}

searchInput.addEventListener('input', (e) => {
  const search = e.target.value.toLowerCase();
  container.innerHTML = '';
  const filtered = allPokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search)
  );
  filtered.forEach(createPokemonCard);
});

fetchPokemons();
