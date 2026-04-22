/* eslint-disable react/prop-types */
// Data
import { glitchPokemon } from './LocalData';
// Styles
import '../styles/Board.css';



// Main component
export default function BoardGame({ displayCards, handleClick, game }) {

  if (displayCards === null) {
    return (
      <div className='game-container'>
        <ScoreTable game={game}/>
        <div id="board">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className='game-container'>
      <ScoreTable game={game}/>
      <div id="board">
        {displayCards.map(pokemon =>
          <CreateCard 
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => handleClick(pokemon)}
          />          
        )}
      </div>
    </div>
  );
}

// Components
function CreateCard({ pokemon, onClick }) {
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


function ScoreTable({ game }) {
  return (
    <div className="score-container">
      <p>SCORE</p>
      <p className="highest-score">highest: {game.highest_score}</p>
      <p className="current-score">current: {game.current_score}</p>
    </div>
  );
}