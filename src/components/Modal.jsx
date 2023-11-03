/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import { bulbasaur, squirtles } from './LocalData';

import '../styles/Modal.css'


export default function Modal({ closeModal, openModal, playerWin }) {
  const ref = useRef();

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }    
  }, [openModal]);


  return (
    <section className='modal-container'>
      <dialog 
        ref={ref}
        onCancel={closeModal}
        >
          <div><img src={playerWin ? bulbasaur : squirtles} alt="Bulbasaur" /></div>
          {playerWin ? <p>Congratulations, you win!</p> : <p>Oh... ):</p>}
          
          <button type='button' onClick={closeModal}>OK</button>
      </dialog>
    </section>
  );
}