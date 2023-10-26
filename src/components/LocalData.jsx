// Maps of main places
import bgKanto from '../assets/map/Kanto_Map.png'
import bgJohto from '../assets/map/Johto_Map.png'
import bgHoenn from '../assets/map/Hoenn_Map.png'
import bgSinnoh from '../assets/map/Sinnoh_Map.png'
import bgUnova from '../assets/map/Unova_Map.png'
import bgKalos from '../assets/map/Kalos_Map.png'
import bgAlola from '../assets/map/Alola_Map.png'
import bgGalar from '../assets/map/Galar_Map.png'
import bgPaldea from '../assets/map/Paldea_Map.png'

// Glitch pokemon
import missingNo from '../assets/Pokemon_Missingno.png'
import pokeGlitch1 from '../assets/Kabuto_Fossil.png'
import pokeGlitch2 from '../assets/YGlitchMissingno_.png'
import pokeGlitch3 from '../assets/Aerodactyl_Fossil.png'

// Loading icon
import pokeballGif from '../assets/Pokeball.gif'


const glitchPokemon = [
  {
    id: 1,
    sprite: pokeGlitch1,
    name: 'Kabutops Fossil'
  },
  {
    id: 2,
    sprite: pokeGlitch2,
    name: 'Y Missingno'
  },
  {
    id: 3,
    sprite: missingNo,
    name: 'Ghost'
  },
  {
    id: 4,
    sprite: pokeGlitch3,
    name: 'Aerodactyl Fossil'
  }

]

const backgroundImg = {
  'generation-i': {
    id: 1,
    name: 'Kanto',
    path: bgKanto
  },
  'generation-ii': {
    id: 2,
    name: 'Johto',
    path: bgJohto
  },
  'generation-iii': {
    id: 3,
    name: 'Hoenn',
    path: bgHoenn
  },
  'generation-iv': {
    id: 4,
    name: 'Sinnoh',
    path: bgSinnoh
  },
  'generation-v': {
    id: 5,
    name: 'Unova',
    path: bgUnova
  },
  'generation-vi': {
    id: 6,
    name: 'Kalos',
    path: bgKalos
  },
  'generation-vii': {
    id: 7,
    name: 'Alola',
    path: bgAlola
  },
  'generation-viii': {
    id: 8,
    name: 'Galar',
    path: bgGalar
  },
  'generation-ix': {
    id: 9,
    name: 'Paldea',
    path: bgPaldea
  },
  error: {
    path: missingNo
  },
  loadingIcon: {
    path: pokeballGif
  }

};



export { backgroundImg, glitchPokemon }