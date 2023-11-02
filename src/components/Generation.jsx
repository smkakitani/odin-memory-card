/* eslint-disable react/prop-types */
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
  const { id, name } = generation;
  
  return(
    <label key={generation.id} >
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

  if (generationList === null) {
    return (
      <div className='fieldset'>
        <div className='legend'>Select your Pokemon generation:</div>
        <div className='generationList'>
          Loading...
        </div>
      </div>
    );
  }

  let generationCards = generationList.slice();

  return (
    <div className='fieldset'>
      <div className='legend'>Select your Pokemon generation:</div>
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
    </div>
  );
}