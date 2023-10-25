import { useState, useEffect } from "react";
import fetchData from './PokemonApi'
import { backgroundImg, glitchPokemon } from './LocalData';
import GenerationBox from "./Generation";
import BoardGame from "./Board";

// CSS import
import '../styles/Game.css'


// functions
function getRandomInt(max, numItens) {
  const min = 0;
  max = Math.floor(max);
  const numArray = [];

  for (let i = 0; i < numItens; i++) {
    let num = Math.floor(Math.random() * (max - min + 1) + min);
    
    /* if (!numArray.includes(num)) {
      numArray.push(num);
    } else {
      while (numArray.includes(num)) {
        num = Math.floor(Math.random() * (max - min + 1) + min);
        if (!numArray.includes(num)) {
          numArray.push(num);
        }
      }
    } */    
    numArray.includes(num) ? numItens += 1 : numArray.push(num);
  }
  
  return numArray;
}

function createPokemonArray(pokeArray, pokemonIndex) {
  const pokemon = [];
  pokemonIndex.forEach((number) => {
    const poke = pokeArray.at(number).name;
    pokemon.push(poke);
  });

  return pokemon;
}

export default function GameTable() {
  const [generationList, setGenerationList] = useState([]);
  const [selectGen, setSelectGen] = useState('generation-i');

  // store pokemon from current generation
  const [pokeSpecies, setPokeSpecies] = useState(null);
  const [pokeRandomNames, setPokeRandomNames] = useState(null);

  // Store info from pokeRandomNames and verify
  const [currentPokeInfo, setCurrentPokeInfo] = useState(null);
  const [isCurrentPokeInfo, setIsCurrentPokeInfo] = useState(false);

  // Background image change alongside current generation
  function changeBackground(imagePath) {
    const bodyStyle = document.body.style;

    if (selectGen === 'generation-i') {
      bodyStyle.background = `url(${backgroundImg["generation-i"].path}) center`;
      bodyStyle.backgroundSize = 'cover';
    } else {
      bodyStyle.background = `url(${backgroundImg[imagePath].path}) center`;
      bodyStyle.backgroundSize = 'cover';
    }
  }

  useEffect(() => {
    if (selectGen !== '') {
      changeBackground(selectGen);
      // console.log('change bg?');
    }

  }, [selectGen]);

  // Populate an array with API's generation data to use in Generation component
  useEffect(() => {
    let ignore = false;

    fetchData('/generation/').then(result => {
      if(!ignore) {
        console.log('Fetched generation list from useEffect');
        let nextId = 1;
        const tempArray = [];
        result.results.forEach(gen => {
          tempArray.push({ id: nextId++, name: gen.name });
        });
        setGenerationList(tempArray);
        // console.log(generationList);
      }
    });

    return () => ignore = true;
  }, []);


  // Get pokemon from current generation
  useEffect(() => {
    console.log(selectGen + ' from API call.');
    const apiGeneration = async () => {
      try {
        const response = await fetchData('/generation/' + selectGen);
        console.log('Fetching "' + selectGen + '".');
        const generationInfo = response;
        
        // console.log(generationInfo.pokemon_species);
        setPokeSpecies(generationInfo.pokemon_species);
      } catch (error) {
        console.log(error)
      }      
    }
    apiGeneration();
  }, [selectGen]);


  // Update pokeRandomNames with current generation Species
  useEffect(() => {
    if (pokeSpecies === null) return;
    
    if (pokeSpecies.length > 0) {
      getRandomPokemon(pokeSpecies);
    }    
  }, [pokeSpecies]);


  // Fetch data of all 9 random pokemon of current generation
  useEffect(() => {
    if (pokeRandomNames === null) return;

    if (pokeRandomNames.length > 0) {
      // Fetch pokemon's info from API
      const apiPokemonInfo = async (url) => {
        try {
          const response = await fetchData('/pokemon/' + url)
          const currentPokemon = await response;

          // console.log(currentPokemon);
          return currentPokemon;
        } catch (error) {
          console.log(error)
        }
      }

      // Map through array of pokemon names to fetch each individual data
      const arrayInfo = async (arrayName) => {
        const pokeInfo = await Promise.all(arrayName.map((name) => apiPokemonInfo(name)));
        setCurrentPokeInfo(pokeInfo);
        console.log(pokeInfo);
      }
      arrayInfo(pokeRandomNames);
    }
  }, [pokeRandomNames]);


  // Handling Generation choice
  function handleSelectGeneration(event) {
    setSelectGen(event.target.value);
  }

  // Select 9 random pokemon from current generation
  function getRandomPokemon(currentPokeSpecies) {
    // get max pokemon - 1 (array starts with 0) to be used in random generator integer
    const currentPokeSpeciesMax = currentPokeSpecies.length - 1;

    // number of cards to be displayed in the game
    const numItens = 9;
    const pokemonIndex = getRandomInt(currentPokeSpeciesMax, numItens);
    // console.log('Index of random pokemon ' + pokemonIndex);

    const pokemonListName = createPokemonArray(currentPokeSpecies, pokemonIndex);
    console.log(`Link of index [${pokemonIndex}] with pokemon names [${pokemonListName}].`);

    // 
    setPokeRandomNames(pokemonListName);
    // console.log(pokemonListName);
  }


  return (
    <>
      <GenerationBox 
        generationList={generationList}
        handleRadio={handleSelectGeneration}
      />
      <BoardGame />
    </>
  );
}