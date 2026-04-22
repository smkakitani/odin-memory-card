// React
import { useState, useEffect } from "react";
// Data
import fetchData from './PokemonApi';
import { backgroundImg } from './LocalData';
// Components
import GenerationBox from "./Generation";
import BoardGame from "./Board";
import Modal from "./Modal";
// Styles
import '../styles/Game.css';



// 
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
    const pokeURL = pokeArray.at(number).url;
    const pokeSliced = pokeURL.slice(41);
    const pokeNumber = pokeSliced.replace(/[^0-9]/g, '');
    
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



// 
export default function GameTable() {
  // API state
  const [selectGen, setSelectGen] = useState('generation-i');
  const [generationList, setGenerationList] = useState(() => JSON.parse(localStorage.getItem("generations"))); // Cached data on localStorage
  const [pokeSpecies, setPokeSpecies] = useState(null);
  const [pokeRandomNames, setPokeRandomNames] = useState(null);
  const [currentPokeInfo, setCurrentPokeInfo] = useState(null);
  // Game state
  const [modal, setModal] = useState(false);
  const [playerWin, setPlayerWin] = useState(true);
  const [game, setGame] = useState({
    idCards: [],
    current_score: 0,
    highest_score: 0,
  });



  // React hooks
  // Populate an array with API's generations data
  useEffect(() => {
    const hasLocalGen = JSON.parse(localStorage.getItem("generations"));
    // console.log(hasLocalGen);
    if (!hasLocalGen) {
      const generations = async () => {
        try {
          const gen = await fetchData('/generation/');

          setGenerationList(gen);
          // Set localStorage with API generations
          localStorage.setItem("generations", JSON.stringify(gen));
        } catch (error) {
          console.error(error);
        }
      } 
      generations();
    } 
    
  }, []);

  // Get pokemon from current generation
  useEffect(() => {
    const apiGeneration = async () => {
      const data = await fetchData('/generation/' + selectGen);
      const pokemonGen = data.pokemon_species;

      setPokeSpecies(pokemonGen);
      getRandomPokemon(pokemonGen);
    }

    apiGeneration();
  }, [selectGen]);

  // Fetch data of all 9 random pokemon of current generation
  useEffect(() => {
    if (pokeRandomNames === null) return;

    if (pokeRandomNames.length > 0) {
      const fetchRandomPoke = async (pokeId) => {
        const data = await fetchData('/pokemon/' + pokeId);

        return data;
      }

      // Map through array of pokemon names to fetch each individual data
      const pokemonArray = async (pokemonId) => {
        const pokemon = await Promise.all(pokemonId.map(pokeId => fetchRandomPoke(pokeId)));

        setCurrentPokeInfo(pokemon);
      }
      pokemonArray(pokeRandomNames);
    }
  }, [pokeRandomNames]);



  // Game 
  function resetScore() {
    setGame({
      ...game,
      idCards: [],
      current_score: 0,
    });
  }

  function addCurrentScore() {
    setGame(g => ({
      ...g,
      current_score: g.current_score + 1,
    }));
  }

  function addHighestScore() {
    setGame(g => ({
      ...g,
      highest_score: g.highest_score + 1,
    }));
  }

  function addPokemonId(cardID) {
    setGame(g => ({
      ...g,
      idCards: [
        ...g.idCards,
        cardID
      ]
    }));
  }

  function shuffleCards() {
    const copyPokemon = [...currentPokeInfo];
    const suffledPokemon = shuffle(copyPokemon);

    setCurrentPokeInfo(suffledPokemon);
  }

  // Events
  function handleCards(pokemon) {
    if (game.idCards.includes(pokemon.id)) {
      setPlayerWin(false);

      // Bring new random array of pokemon from current generation
      gameReset();
    } else if (game.current_score === 8) {
      // player wins
      setPlayerWin(true);
      addHighestScore();      

      // Bring new random array of pokemon from current generation
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

  function handleSelectGeneration(event) {
    setSelectGen(event.target.value);
    resetScore();
    
    // Body's background
    const bodyStyle = document.body.style;
    bodyStyle.background = `url(${backgroundImg[event.target.value].path}) center`;
    bodyStyle.backgroundSize = 'cover';
  }


  // Select 9 random pokemon from current generation
  function getRandomPokemon(currentPokeSpecies) {
    const currentPokeSpeciesMax = currentPokeSpecies.length - 1;

    // number of cards to be displayed in the game
    const numItens = 9;
    const pokemonIndex = getRandomInt(currentPokeSpeciesMax, numItens);

    const pokemonListId = createPokemonArray(currentPokeSpecies, pokemonIndex);
    
    setPokeRandomNames(pokemonListId);
  }
  
  function gameReset() {
    resetScore();
    setModal(true);
    getRandomPokemon(pokeSpecies);
  }

  return (
    <main>
      {generationList && <GenerationBox 
        generationList={generationList}
        handleRadio={handleSelectGeneration}
      />}

      {currentPokeInfo && <BoardGame 
        displayCards={currentPokeInfo}
        handleClick={handleCards}
        game={game} 
      />}

      <Modal 
      openModal={modal}
      closeModal={() => setModal(false)}
      playerWin={playerWin} />
    </main>
  );
}