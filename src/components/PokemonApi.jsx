export default function fetchData(url) {
  if (url === '/generation/') {
    return fetchGeneration();
  } else if (url.startsWith('/generation/generation-')) {
    // console.log('API ' + url);
    return fetchGenerationPokemon(url);
  } else {
    console.log('Error with ' + url);
  }
  
}

// Generation pokemon
async function fetchGenerationPokemon(gen) {
  try {
    const response = await fetch('https://pokeapi.co/api/v2' + gen + '/', {mode: 'cors'});
    const pokemonGen = await response.json();
    // console.log(pokemonGen);

    return pokemonGen;
  } catch (error) {
    console.log('Error: ' + error + '. Received: ' + gen);
  }
}

// Generations
async function fetchGeneration() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/generation/', {mode: 'cors'});
    const generationList = await response.json();
    // console.log(generationList);

    return generationList;
  } catch (error) {
    console.log('Error: ' + error);
  }
}