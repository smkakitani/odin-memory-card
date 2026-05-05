export default function fetchData(url: string){
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
export interface PokemonFromGeneration {
  name: string;
  url: string;
};
async function fetchGenerationPokemon(gen: string) {
  try {
    const response = await fetch('https://pokeapi.co/api/v2' + gen + '/', {mode: 'cors'});
    const { pokemon_species }: { pokemon_species: PokemonFromGeneration[] } = await response.json();

    return pokemon_species;
  } catch (error) {
    console.error('Error: ' + error + '. Received: ' + gen);
  }
}

// Generations
export type GenerationData = {
  id: number;
  name: string;
};
async function fetchGeneration() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/generation/', { mode: 'cors' });

    if (!response.ok) throw new Error(response.statusText);

    const { results } = await response.json();
    const generationData: GenerationData[] = results.map((gen: { name: string; url: string }, index: number) => ({ id: index + 1, name: gen.name }));

    return generationData;
  } catch (error) {
    console.error('Error fetching generations: ' + error);
  }
}

// Pokemon
export interface PokemonData {
  id: number;
  name: string;
  sprite: string;
};
async function fetchPokemon(pokemon: string) {
  try {
    const response = await fetch('https://pokeapi.co/api/v2' + pokemon + '/', {mode: 'cors'});

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    const pokemonInfo: PokemonData = {
      id: data.id,
      name: data.name,
      sprite: data.sprites.other["official-artwork"].front_default,
    };

    return pokemonInfo;
  } catch (error) {
    console.error('Error fetching pokemon: ' + error + '. Received' + pokemon);
  }
}