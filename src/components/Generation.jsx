import { useState, useEffect } from "react";
import fetchData from "./PokemonApi";



export default function GenerationInput() {
  // const generationsList = ['generation-i', 'generation-ii', 'generation-iii', 'generation-iv', 'generation-v', 'generation-vi', 'generation-vii', 'generation-viii', 'generation-ix'];  
  const [generationList, setGenerationList] = useState([]);

  // Populate an array with API's generation data 
  useEffect(() => {
    let ignore = false

    fetchData('generation').then(result => {
      if(!ignore) {
        console.log('Fetched generation list from useEffect');
        let nextId = 1;
        const tempArray = [];
        result.results.forEach(gen => {
          tempArray.push({ id: nextId++, name: gen.name });
        });
        // console.log(tempArray);
        setGenerationList(tempArray);
      }
    });

    return () => ignore = true
  }, []);

  // Fix name from API's data to be able to use it as input text
  function manageGenerationName(text) {
    const textSpace = text.split('-');
    const firstWord = textSpace[0].charAt(0).toUpperCase() + textSpace[0].slice(1);
    const secondWord = textSpace[1].toUpperCase();    
    const newText = firstWord + ' ' + secondWord;

    return newText;
  }

  const createSelectGeneration = generationList.map(generation =>
    <label key={generation.id}>
      <input
      type="radio" 
      name="generation" 
      value={generation.name}
      />
      {manageGenerationName(generation.name)}
    </label>
  );
  // console.log(generationList.length);

  return (
    <fieldset>
      <legend>Select your preferred Pokemon generation:</legend>
      <div>
        {createSelectGeneration}
      </div>
    </fieldset>
  );
}