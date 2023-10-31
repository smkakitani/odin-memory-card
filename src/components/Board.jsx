import { useEffect, useState, useCallback } from 'react';
import '../styles/Board.css'
import { glitchPokemon, backgroundImg } from './LocalData';


// Functions

// Shuffle using Fisher-Yates sorting algorithm
function shuffle(array) {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


function CreateCard({ pokemon, onClick }) {
  const { name, id, sprite } = pokemon;

  return (
    <div 
    key={pokemon.id}
    className="card-container"
    onClick={onClick}>
      <div className="sprite">
        <img 
        src={pokemon.sprite} 
        alt={pokemon.name}
         />
      </div>
      <p className="pokemon-name">
        {pokemon.name}
      </p>
    </div>
  );
}


/* function useWindowListener(eventType, listener) {
  useEffect(() => {
    window.addEventListener(eventType, listener);

    return () => {
      window.removeEventListener(eventType, listener);
    }
  }, [eventType, listener]);
} */

// Main function
export default function BoardGame({ pokemonList, isReset, gameReset }) {
  // const [currentScore, setCurrentScore] = useState(0);
  // const [highestScore, setHighestScore] = useState(0);
  // to store ID of clicked pokemon
  // const [isShuffle, setIsShuffle] = useState(false);
  const [renderCards, setRenderCards] = useState(null);
  const [isDisplayLoading, setIsDisplayLoading] = useState(true);
  // const useRef = ;

  // trying to group states since they are sync
  // const [isGameReset, setIsGameReset] = useState(false);

  const [isGameRunning, setIsGameRunning] = useState(false);
  const [game, setGame] = useState({
    idCards: [],
    current_score: 0,
    highest_score: 0,
  });


  // Setting renderCards state from Game component
  useEffect(() => {
    let ignore = false;

    if(!ignore) {
      if (pokemonList === null) return;

      if (pokemonList.length > 0) {
        let initialList = pokemonList.slice();
        const tempCards = [...initialList];
        // console.log(tempCards);
        setRenderCards(() => tempCards); //keep update function for posterior api call
        setIsGameRunning(true);
        // shuffleCards(tempCards);
      }
    }
    
    return () => {
      ignore = false;
      setIsGameRunning(false);
    }    
  }, [pokemonList]);

  // Sync functions with Children Components
  /* useEffect(() => {
    if (!isGameRunning) return;

    if (isGameRunning) {

    }



  }, []); */

  // Managing clicked cards
/*   useEffect(() => {
    // check if ID card is already in state
    // update current and highest scores if it's a new ID 
    // SHUFFLE with same cards

    // if ID isn't new
    // current score equals 0 but keep highest score
    // game reset
    // SHUFFLE with new cards
    if (isGameRunning) {
      // console.log(typeof cardId);
      console.log(game.idCards);
  
      const nextCardId = cardId;
      console.log(Number.isNaN(cardId));

      if (game.idCards.includes(nextCardId) || cardId === '') {
        console.log('this id already exist or isnt a number')
      } else {
      // update id
        setGame({
          idCards: [
            ...game.idCards,
            cardId
          ],
          current_score: current_score++
        });
        
      }
    }

    return () => setIsGameRunning(false);
    
  }, [cardId, isGameRunning]); */


  // Clicking cards
  function handleCards(event, pokemon) {
    console.log(pokemon.id);

    if (game.idCards.includes(pokemon.id)) {
      console.log('this id already exist or isnt a number');
      setGame(prevState =>{
        return {
          idCards: [],
          current_score: 0,
          highest_score: prevState.highest_score,
        }
      });

      // call new pokemon list from current generation      
      gameReset();
    } else if (game.highest_score > game.current_score) {
    // update id
      setGame(prevState =>{
        return {
          ...prevState,
          idCards: [
            ...prevState.idCards,
            pokemon.id,
          ],
          current_score: prevState.current_score + 1,
          highest_score: prevState.highest_score,
        }
      });
      shuffleCards();
    } else {
      setGame(prevState =>{
        return {
          ...prevState,
          idCards: [
            ...prevState.idCards,
            pokemon.id,
          ],
          current_score: prevState.current_score + 1,
          highest_score: prevState.highest_score + 1,
        }
      });
      shuffleCards();
    }
  }


  // Shuffle 
  const shuffleCards = (/* pokeArr */) => {
    console.log('shuffling cards!');
    console.log('Current state', renderCards);

    const nextRenderCards = [...renderCards];
    // console.log('Copy of current state', nextRenderCards);
    const shuffledArr = shuffle(nextRenderCards);

    console.log('Shuffled array', shuffledArr);
    setRenderCards(shuffledArr);    
  }


  // Handle score
  function handleScore(pokeId) {
    // check if event.target had been clicked    

  } 

  function resetGame() {
    isReset = true;
  }

  // Score board -> send outside this function?
  function ScoreTable(/* { currentScore, highestScore } */) {
    

    return (
      <div className="score-container">
        <p>Score</p>
        <p className="highest-score">Highest: {game.highest_score}</p>
        <p className="current-score">Current Score: {game.current_score}</p>
      </div>
    );
  }

  if (pokemonList === null) return <p>Loading</p>;
  

  // let initialPokeList = pokemonList.slice();
  // let initialPokeRender = initialPokeList.map(poke => {
  //   const pokemon = {
  //     id: poke.id,
  //     name: poke.name,
  //     sprite: poke.sprites.other["official-artwork"].front_default
  //   };

  //   return (
  //     <CreateCard 
  //       key={pokemon.id}
  //       pokemon={pokemon}
  //       handleClick={() => handleCards(event, pokemon)}/>
  //   );
  // });

  // if (renderCards === null && pokemonList) {
  //   // setRenderCards(() => initialPokeRender);
  //   setIsGameRunning(() => true);
  //   // trigger render
  //   shuffleCards(initialPokeRender);
  // }

 /*  if (renderCards === null && initialPokeList.length > 0) {
    let initialPokeRender = initialPokeList.map(poke => {
      const pokemon = {
        id: poke.id,
        name: poke.name,
        sprite: poke.sprites.other["official-artwork"].front_default
      };
      // console.log('creating pokemon')
      return (
        <CreateCard 
          key={pokemon.id}
          pokemon={pokemon}
          onClick={(event) => handleCards(event, pokemon)}/>
      );
    });
    // console.log('initializing renderCards');
    const shuffled = shuffleCards(initialPokeRender);
    setRenderCards(() => shuffled);
    setIsGameRunning(true);
  } */

  /* let initialPokeRender = initialPokeList.map(poke => {
    const pokemon = {
      id: poke.id,
      name: poke.name,
      sprite: poke.sprites.other["official-artwork"].front_default
    };
    // console.log('creating pokemon')
    return (
      <CreateCard 
        key={pokemon.id}
        pokemon={pokemon}
        onClick={() => handleCards(event, pokemon)}/>
    );
  }); */
  // console.log('initializing renderCards');
  /* if (initialPokeList.length > 0 && renderCards === null) {
    const shuffled = shuffleCards(initialPokeRender);
    setRenderCards(() => shuffled);
    // console.log(initialPokeRender[0].props);

    
  } */

  // if (isShuffle) return shuffleCards();

  // if (pokemonList === null) return <p>Loading</p>;

  return (
    <div className='game-container'>
      <ScoreTable 
        // currentScore={currentScore}
        // highestScore={highestScore}
      />
      <div id="board"
        /* onClick={handleCards} */>
        {isGameRunning && renderCards.map(poke => {
          const pokemon = {
            id: poke.id,
            name: poke.name,
            sprite: poke.sprites.other["official-artwork"].front_default
          };

          return (
            <CreateCard 
              key={pokemon.id}
              pokemon={pokemon}
              onClick={() => handleCards(event, pokemon)}
            />
          )
        })}
        {/* {initialPokeList && initialPokeList.map(poke => {
          const pokemon = {
            id: poke.id,
            name: poke.name,
            sprite: poke.sprites.other["official-artwork"].front_default
          };

          return (
            <CreateCard 
              key={pokemon.id}
              pokemon={pokemon}
              onClick={() => handleCards(event, pokemon)}/>
          );
        })} */}
      </div>
    </div>
  );
}