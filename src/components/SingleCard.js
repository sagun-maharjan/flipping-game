import React from 'react'

import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled }) {

  const handleclick = () => {
    if(!disabled) {
      handleChoice(card)
    }
  }

  return (
    <div>
      
      <div className='card'>
        <div className={!flipped ? "" : "flipped"}>
          <img className='front' src={card.src} alt='card front'></img>
          <img className='back' src='/img/back1.png' onClick={handleclick} alt='card back'></img>
        </div>
      </div>
        
    </div>
  )
}
