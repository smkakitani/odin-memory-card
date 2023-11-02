/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { glitchPokemon } from './LocalData';

import '../styles/Board.css'


// Shuffle using Fisher-Yates sorting algorithm
function shuffle(array) {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Component 
function CreateCard({ pokemon, onClick }) {
  const { name, id, sprite } = pokemon;


  return (
    <div 
    key={pokemon.id}
    className="card-container"
    onClick={onClick}>
      <div className="sprite">
        <img src={pokemon.sprite ? pokemon.sprite : glitchPokemon[1].sprite} alt={pokemon.name} />
      </div>
      <p className="pokemon-name">{pokemon.name}
      </p>
    </div>
  );
}


// Main component
export default function BoardGame({ pokemonList, gameReset }) {
  const [renderCards, setRenderCards] = useState(null);
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

        // keep update function for posterior api call
        setRenderCards(() => tempCards);
        setIsGameRunning(true);

        // reset current score so player won't be able to keep current score

      }
    }
    
    return () => {
      ignore = false;
      setIsGameRunning(false);
    }    
  }, [pokemonList]);


  // Clicking cards
  const handleCards = (event, pokemon) => {
    console.log(pokemon.id);

    if (game.idCards.includes(pokemon.id)) {
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
  const shuffleCards = () => {
    const nextRenderCards = [...renderCards];
    const shuffledArr = shuffle(nextRenderCards);

    setRenderCards(shuffledArr);    
  }


  // Score board
  function ScoreTable() {
    return (
      <div className="score-container">
        <p>SCORE</p>
        <p className="highest-score">highest: {game.highest_score}</p>
        <p className="current-score">current: {game.current_score}</p>
      </div>
    );
  }

  if (!isGameRunning) {
    return (
      <div className='game-container'>
        <ScoreTable />
        <div id="board">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className='game-container'>
      <ScoreTable />
      <div id="board">
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
      </div>
    </div>
  );
}