export default function fetchData(url) {
  if (url === '/generation/') {

    return fetchGeneration();
  } else if (url.startsWith('/generation/generation-')) {

    return fetchGenerationPokemon(url);
  } else if (url.startsWith('/pokemon/')) {

    return fetchPokemon(url);
  } else {

    console.error('Error with ' + url);
  }
  
}

// Generation pokemon
async function fetchGenerationPokemon(gen) {
  try {
    const response = await fetch('https://pokeapi.co/api/v2' + gen + '/', {mode: 'cors'});
    const pokemonGen = await response.json();

    return pokemonGen;
  } catch (error) {
    console.error('Error: ' + error + '. Received: ' + gen);
  }
}

// Generations
async function fetchGeneration() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/generation/', { mode: 'cors' });
    const data = await response.json();
    const generationData = data.results.map((gen, index) => ({ id: index + 1, name: gen.name }));

    return generationData;
  } catch (error) {
    console.error('Error fetching generations: ' + error);
  }
}

// Pokemon
async function fetchPokemon(pokemon) {
  try {
    const response = await fetch('https://pokeapi.co/api/v2' + pokemon + '/', {mode: 'cors'});
    const data = await response.json();
    const pokemonInfo = {
      id: data.id,
      name: data.name,
      sprite: data.sprites.other["official-artwork"].front_default,
    };

    return pokemonInfo;
  } catch (error) {
    console.error('Error fetching pokemon: ' + error + '. Received' + pokemon);
  }
}