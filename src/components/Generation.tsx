// /* eslint-disable react/prop-types */
// Types
import type { GenArray, Generation } from './Game.tsx';
// Styles
import '../styles/Generation.css';


// To use on generations option
function manageGenerationName(text: string) {
  // string -> "generation-ix"
  const textSpace = text.split('-');

  if (textSpace[0] !== undefined && textSpace[1] !== undefined) {
    const firstWord = textSpace[0].charAt(0).toUpperCase() + textSpace[0].slice(1);
    const secondWord = textSpace[1].toUpperCase();    
    const newText = firstWord + ' ' + secondWord;

    return newText;
  } else {
    return "unknown";
  }
  
}

// Types
type OnChangeGeneration = (event: React.ChangeEvent<HTMLInputElement>) => void;
type CreateGenerationsRadioProps = {
  generation: Generation;
  handleRadio: OnChangeGeneration;
};
function CreateGenerationsRadio({ 
  generation, 
  handleRadio 
}: CreateGenerationsRadioProps) {

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
type GenerationBoxProps = {
  generationList: GenArray;
  handleRadio: OnChangeGeneration;
};
export default function GenerationBox({ 
  generationList, 
  handleRadio, 
}: GenerationBoxProps) {
  let generationCards = generationList.slice();

  return (
    <div className='fieldset'>
      <div className='legend'>Select your Pokemon generation:</div>
      <div className='generationList'>
        {generationCards.map(gen => 
          <CreateGenerationsRadio 
            key={gen.id}
            generation={gen}
            handleRadio={handleRadio}
          />
        )}
      </div>
    </div>
  );
}