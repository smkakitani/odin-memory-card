import bgKanto from '../assets/map/Kanto_Map.png'
import bgJohto from '../assets/map/Johto_Map.png'
import bgHoenn from '../assets/map/Hoenn_Map.png'
import bgSinnoh from '../assets/map/Sinnoh_Map.png'
import bgUnova from '../assets/map/Unova_Map.png'
import bgKalos from '../assets/map/Kalos_Map.png'
import bgAlola from '../assets/map/Alola_Map.png'
import bgGalar from '../assets/map/Galar_Map.png'
import bgPaldea from '../assets/map/Paldea_Map.png'

import missingNo from '../assets/Pokemon_Missingno.png'



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
  }

};

export { backgroundImg }