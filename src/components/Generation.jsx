import { useState } from 'react';
import '../styles/Generation.css'


// Fix name from API's data to be able to use it as input text
function manageGenerationName(text) {
  const textSpace = text.split('-');
  const firstWord = textSpace[0].charAt(0).toUpperCase() + textSpace[0].slice(1);
  const secondWord = textSpace[1].toUpperCase();    
  const newText = firstWord + ' ' + secondWord;

  return newText;
}

function CreateGenerationsRadio({ generation, handleRadio }) {
  // const [isHover, setIsHover] = useState(false);
  const { id, name } = generation;
  
  return(
    <label key={generation.id}
      /* onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)} */>
      <input
      type="radio" 
      name="generation" 
      value={generation.name}
      onChange={handleRadio}
      defaultChecked={generation.name === 'generation-i'}
      />
      {manageGenerationName(generation.name)}
    </label>
  );  
}


// Generation fieldset component
export default function GenerationBox({ generationList, handleRadio }) {
  // const [isHover, setIsHover] = useState(false);
  // Use array [rowGenerations] to insert the component with data fetched from API

  /* const handleOver = (event) => {
    console.log(event.target);
  } */

  if (generationList === null) return <fieldset>Loading...</fieldset>;
  
  // const rowGenerations = [];
 /*  generationList.map(generation =>
    rowGenerations.push(
      <label key={generation.id}
        onMouseEnter={(event) => setIsHover(true)}
        onMouseLeave={(event) => setIsHover(false)}>
        
        <input
        type="radio" 
        name="generation" 
        value={generation.name}
        onChange={handleRadio}
        defaultChecked={generation.name === 'generation-i'}
        />
        <span className="material-symbols-outlined">{isHover && ('arrow_right')}</span>
        {manageGenerationName(generation.name)}
      </label>
    )
  ); */

  let generationCards = generationList.slice();
  // const rowGenerations = generationCards.map

  // console.log(typeof rowGenerations);

  return (
    <fieldset>
      <div className='legend'>Select your preferred Pokemon generation:</div>
      <div className='generationList'>
        {generationCards.map(gen => {
          const generation = {
            id: gen.id,
            name: gen.name
          }
          return (
            <CreateGenerationsRadio 
              key={generation.id}
              generation={generation}
              handleRadio={handleRadio}
            />
          );
        })}
      </div>
    </fieldset>
  );
}