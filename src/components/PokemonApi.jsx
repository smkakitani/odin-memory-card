export default function fetchData(generation) {
  if (generation > 9) {
    throw Error("This generation doesn't exist");
  } else {
    fetchGeneration(generation);
  }
  
}

// Only first generation pokemon
async function fetchGeneration(gen) {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/generation/' + gen + '/', {mode: 'cors'});
    const firstGen = await response.json();

    console.log(firstGen);
  } catch (error) {
    // throw error
    // console.log('Error: ' + error);
  }
}