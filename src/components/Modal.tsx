/* eslint-disable react/prop-types */
// React
import { useEffect, useRef } from 'react';
// Data
import { bulbasaur, squirtles } from './LocalData';
// Styles
import '../styles/Modal.css';



type ModalProps = {
  closeModal: () => void;
  openModal: boolean;
  playerWin: boolean;
}
export default function Modal({ 
  closeModal, 
  openModal, 
  playerWin 
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (openModal && dialogRef) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }    
  }, [openModal]);

  return (
    <section className='modal-container'>
      <dialog 
        ref={dialogRef}
        onCancel={closeModal}
        >
          <div>
            {playerWin ? <img src={bulbasaur} alt='Bulbasaur' /> : <img src={squirtles} alt='Group of squirtle' />}
          </div>
          {playerWin ? <p>Congratulations, you win!</p> : <p>Oh... ):</p>}
          
          <button type='button' onClick={closeModal}>OK</button>
      </dialog>
    </section>
  );
}