import { useState, useEffect } from "react";
import fetchData from './PokemonApi'
import { backgroundImg } from './LocalData';
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
      
    numArray.includes(num) ? numItens += 1 : numArray.push(num);
  }
  
  return numArray;
}

function createPokemonArray(pokeArray, pokemonIndex) {
  const pokemon = [];

  pokemonIndex.forEach((number) => {
    // Pokemon names was causing too many errors, pokemon-species was better because of their ID related to numbers on end point

    // const pokeName = pokeArray.at(number).name;
    const pokeURL = pokeArray.at(number).url;
    const pokeSliced = pokeURL.slice(41);
    const pokeNumber = pokeSliced.replace(/[^0-9]/g, '');

    // console.log(pokeSliced);
    // pokemon.push(pokeName);
    pokemon.push(pokeNumber);
  });

  return pokemon;
}


export default function GameTable() {
  const [selectGen, setSelectGen] = useState('generation-i');
  const [generationList, setGenerationList] = useState(null);
  const [pokeSpecies, setPokeSpecies] = useState(null);
  const [pokeRandomNames, setPokeRandomNames] = useState(null);
  const [currentPokeInfo, setCurrentPokeInfo] = useState(null);
  const [isReset, setIsReset] = useState(false);  
  

  useEffect(() => {
    // Background image change alongside current generation
    function changeBackground(imagePath) {      
      const bodyStyle = document.body.style;
      // console.log(imagePath);
  
      if (selectGen === 'generation-i') {
        bodyStyle.background = `url(${backgroundImg["generation-i"].path}) center`;
        bodyStyle.backgroundSize = 'cover';
      } else {
        bodyStyle.background = `url(${backgroundImg[imagePath].path}) center`;
        bodyStyle.backgroundSize = 'cover';
      }
    }
    changeBackground(selectGen);
  }, [selectGen]);

  // Populate an array with API's generation data to use in Generation component
  useEffect(() => {
    let ignore = false;
    setGenerationList(null);

    fetchData('/generation/').then(result => {
      if(!ignore) {
        // console.log('Fetching generation list');
        let nextId = 1;
        const tempArray = [];
        result.results.forEach(gen => {
          tempArray.push({ id: nextId++, name: gen.name });
        });
        setGenerationList(tempArray);
        // console.log(tempArray);
      }
    });

    return () => ignore = true;
  }, []);


  // Get pokemon from current generation
  useEffect(() => {
    let ignore = false;
    setPokeSpecies(null);

    const apiGeneration = async () => {
      try {
        if(!ignore || isReset) {
          // console.log('Fetching pokemon from "' + selectGen + '".');

          const response = await fetchData('/generation/' + selectGen);
          const generationInfo = response;
          
          // console.log(generationInfo.pokemon_species);
          setPokeSpecies(generationInfo.pokemon_species);
        }
      } catch (error) {
        console.log(error)
      }      
    }
    apiGeneration();
    setIsReset(false);

    return () => ignore = true;
  }, [selectGen, isReset]);


  // Update pokeRandomNames with current generation Species
  useEffect(() => {
    let ignore = false;
    setPokeSpecies(null);
    
    if (!ignore) {
      if (pokeSpecies === null) return;

      if (pokeSpecies.length > 0) {
        getRandomPokemon(pokeSpecies);
      }
    }
    
    
    return () => ignore = true;
  }, [pokeSpecies]);


  // Fetch data of all 9 random pokemon of current generation
  useEffect(() => {
    let ignore = false;
    setCurrentPokeInfo(null);


    if (pokeRandomNames === null) return;

    if (pokeRandomNames.length > 0) {
      // Fetch pokemon's info from API
      const apiPokemonInfo = async (url) => {
        try {
          if (!ignore) {
            // API problems with 'wishiwashi', adding '-solo' to fix it
            if (url === 'wishiwashi') url = url + '-solo';
            if (url === 'eiscue') url = url + '-ice';
            if (url === 'mimikyu') url = url + '-disguised';
            if (url === 'basculegion') url = url + '-male';
            if (url === 'toxtricity') url = url + '-amped';

            
            const response = await fetchData('/pokemon/' + url)
            const currentPokemon = await response;

            // console.log(currentPokemon);
            return currentPokemon;
          }
        } catch (error) {
          console.log(error)
        }
      }
      // apiPokemonInfo('eiscue');
      // Map through array of pokemon names to fetch each individual data
      const arrayInfo = async (arrayName) => {
        if (!ignore) {
          const pokeInfo = await Promise.all(arrayName.map((name) => apiPokemonInfo(name)));
          setCurrentPokeInfo(pokeInfo);
          // console.log(pokeInfo);
        }
      }
      arrayInfo(pokeRandomNames);
    }

    return () => ignore = true;
  }, [pokeRandomNames]);


  // Handling Generation choice
  function handleSelectGeneration(event) {
    setSelectGen(event.target.value);
    // changeBackground(selectGen);
  }


  // Select 9 random pokemon from current generation
  function getRandomPokemon(currentPokeSpecies) {
    // get max pokemon - 1 (array starts with 0) to be used in random generator integer
    const currentPokeSpeciesMax = currentPokeSpecies.length - 1;

    // number of cards to be displayed in the game
    const numItens = 9;
    const pokemonIndex = getRandomInt(currentPokeSpeciesMax, numItens);
    // console.log('Index of random pokemon ' + pokemonIndex);

    const pokemonListId = createPokemonArray(currentPokeSpecies, pokemonIndex);
    // console.log(`Link of index [${pokemonIndex}] with pokemon names [${pokemonListId}].`);

    // 
    setPokeRandomNames(pokemonListId);
    // console.log(pokemonListId);
  }

  function gameReset() {
    setIsReset(true);
  }


  return (
    <>
      <GenerationBox 
        generationList={generationList}
        handleRadio={handleSelectGeneration}
      />
      <BoardGame 
        pokemonList={currentPokeInfo}
        isReset={isReset}
        gameReset={gameReset}
      />
    </>
  );
}