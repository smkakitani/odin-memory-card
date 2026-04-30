/* eslint-disable react/prop-types */
// Data
import { glitchPokemon } from './LocalData';
// Types
import type { PokemonInfoArr, PokemonInfo, Game } from './Game';
// Styles
import '../styles/Board.css';



// Main component
type OnClickCard = (pokemon: PokemonInfo) => void;
type BoardGameProps = {
  displayCards: PokemonInfoArr;
  handleClick: OnClickCard;
  game: Game;
};
export default function BoardGame({ displayCards, handleClick, game }: BoardGameProps) {

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
type CreateCardProps = {
  pokemon: PokemonInfo;
  onClick: () => void;
};
function CreateCard({ pokemon, onClick }: CreateCardProps) {
  return (
    <div 
    key={pokemon.id}
    className="card-container"
    onClick={onClick}>
      <div className="sprite">
        <img 
          src={pokemon.sprite ? pokemon.sprite : glitchPokemon[1]?.sprite} 
          alt={pokemon.name} 
        />
      </div>
      <p className="pokemon-name">
        {pokemon.name}
      </p>
    </div>
  );
}

function ScoreTable({ game }: { game: Game }) {
  return (
    <div className="score-container">
      <p>SCORE</p>
      <p className="highest-score">highest: {game.highest_score}</p>
      <p className="current-score">current: {game.current_score}</p>
    </div>
  );
}