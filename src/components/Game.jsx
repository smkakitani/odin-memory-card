import { useState, useEffect } from "react";
import fetchData from './PokemonApi'
import { backgroundImg } from './LocalData';
import GenerationBox from "./Generation";
import BoardGame from "./Board";
import Modal from "./Modal";

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

// Shuffle using Fisher-Yates sorting algorithm
function shuffle(array) {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


export default function GameTable() {
  // API state
  const [selectGen, setSelectGen] = useState('generation-i');
  const [generationList, setGenerationList] = useState(null);
  const [pokeSpecies, setPokeSpecies] = useState(null);
  const [pokeRandomNames, setPokeRandomNames] = useState(null);
  const [currentPokeInfo, setCurrentPokeInfo] = useState(null); 

  // Game state
  const [modal, setModal] = useState(false);
  const [playerWin, setPlayerWin] = useState(true);
  const [isReset, setIsReset] = useState(false);
  const [displayCards, setDisplayCards] = useState(null);
  const [game, setGame] = useState({
    idCards: [],
    current_score: 0,
    highest_score: 0,
  });


  // Game 
  function resetScore() {
    setGame(prevState =>{
      return {
        idCards: [],
        current_score: 0,
        highest_score: prevState.highest_score,
      }
    });
  }

  function addCurrentScore() {
    setGame(prevState =>{
      return {
        ...prevState,
        idCards: [
          ...prevState.idCards,
        ],
        current_score: prevState.current_score + 1,
        highest_score: prevState.highest_score,
      }
    });
  }

  function addHighestScore() {
    setGame(prevState =>{
      return {
        ...prevState,
        idCards: [
          ...prevState.idCards,
        ],
        current_score: prevState.current_score,
        highest_score: prevState.highest_score + 1,
      }
    });
  }

  function addPokemonId(cardID) {
    setGame(prevState =>{
      return {
        ...prevState,
        idCards: [
          ...prevState.idCards,
          cardID,
        ],
        current_score: prevState.current_score,
        highest_score: prevState.highest_score,
      }
    });
  }

  function shuffleCards() {
    const nextDisplayCards = [...displayCards];
    const shuffledArr = shuffle(nextDisplayCards);

    setDisplayCards(shuffledArr);    
  }

  // Player click
  function handleCards(pokemon) {
    // console.log(pokemon.id);

    if (game.idCards.includes(pokemon.id)) {
      setPlayerWin(false);

      // call new pokemon list from current generation
      gameReset();
    } else if (game.current_score === 8) {
      // player wins
      setPlayerWin(true);
      addHighestScore();      

      // call new pokemon 
      gameReset();
    } else {
      addPokemonId(pokemon.id);
      addCurrentScore();

      if (game.highest_score <= game.current_score) {
        addHighestScore();    
        shuffleCards();
      } else {
        shuffleCards();
      }
    }
  }


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


  // Populate an array with API's generations data
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
            const response = await fetchData('/pokemon/' + url)
            const currentPokemon = await response;

            // console.log(currentPokemon);
            return currentPokemon;
          }
        } catch (error) {
          console.log(error)
        }
      }

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


  // Data to display cards
  useEffect(() => {
    let ignore = false;

    if(!ignore) {
      if (currentPokeInfo === null) return;

      if (currentPokeInfo.length > 0) {
        let initialList = currentPokeInfo.slice();
        const tempCards = [...initialList];

        setDisplayCards(() => tempCards);
      }
    }
    
    return () => {
      ignore = false;
    }    
  }, [currentPokeInfo]);


  // Handling Generation choice
  function handleSelectGeneration(event) {
    setSelectGen(event.target.value);
    resetScore();
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
    resetScore();
    setIsReset(true);
    setModal(true);    
  }


  return (
    <main>
      <GenerationBox 
        generationList={generationList}
        handleRadio={handleSelectGeneration} />

      <BoardGame 
        displayCards={displayCards}
        handleCards={handleCards}
        game={game} />

      <Modal 
      openModal={modal}
      closeModal={() => setModal(false)}
      playerWin={playerWin} />
    </main>
  );
}