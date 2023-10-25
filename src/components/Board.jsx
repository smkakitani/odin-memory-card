import { useState } from 'react';
import '../styles/Board.css'
import { glitchPokemon } from './LocalData';


// Functions
function CreateCard({ sprite, name }) {
  return (
    <div className="card-container">
      <div className="sprite">
        <img src={sprite} alt={name} />
      </div>
      <p className="pokemon-name">
        {name}
      </p>
    </div>
  );
}

export default function BoardGame({ pokemonList }) {
  const [pokemon, setPokemon] = useState(glitchPokemon[0]);


  // Score board
  function ScoreTable() {
    return (
      <div className="score-container">
        <p>Score</p>
        <p className="highest-score">Highest: 0</p>
        <p className="current-score">Current Score: 0</p>
      </div>
    );
  }

  
  // Create cards - using map with current generation
  // const cardsArray = [];

  return (
    <div className='game-container'>
      <ScoreTable />
      <div id="board">
        <CreateCard 
        sprite={pokemon.sprite}
        name={pokemon.name}
        />
        <CreateCard 
        sprite={pokemon.sprite}
        name={pokemon.name}
        />
      </div>
    </div>
  );
}