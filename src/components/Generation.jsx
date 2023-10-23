import '../styles/Generation.css'


export default function GenerationBox({ generationList, handleRadio }) {

  // Fix name from API's data to be able to use it as input text
  function manageGenerationName(text) {
    const textSpace = text.split('-');
    const firstWord = textSpace[0].charAt(0).toUpperCase() + textSpace[0].slice(1);
    const secondWord = textSpace[1].toUpperCase();    
    const newText = firstWord + ' ' + secondWord;

    return newText;
  }

  // Use array -rowGenerations- to insert the component with data fetched from API
  const rowGenerations = [];

  generationList.map(generation =>
    rowGenerations.push(
      <label key={generation.id}>
        <input
        type="radio" 
        name="generation" 
        value={generation.name}
        onChange={handleRadio}
        defaultChecked={generation.name === 'generation-i'}
        />
        <span className="material-symbols-outlined">
          arrow_right
          </span>
        {manageGenerationName(generation.name)}
      </label>
    )
  );

  return (
    <fieldset>
      <div className='legend'>Select your preferred Pokemon generation:</div>
      <div className='generationList'>
        {rowGenerations}
      </div>
    </fieldset>
  );
}