
import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';
import sound from './assets/match.wav'

import './App.css';


const allCards = [
  {"src": "/img/bomb1.png", matched: false},
  {"src": "/img/box1.png", matched: false},
  {"src": "/img/card1.png", matched: false},
  {"src": "/img/coin1.png", matched: false},
  {"src": "/img/coins1.png", matched: false},
  {"src": "/img/trophy1.png", matched: false},
]

const allCardsHard = [
  {"src": "/img/bomb1.png", matched: false},
  {"src": "/img/box1.png", matched: false},
  {"src": "/img/card1.png", matched: false},
  {"src": "/img/coin1.png", matched: false},
  {"src": "/img/coins1.png", matched: false},
  {"src": "/img/trophy1.png", matched: false},
  {"src": "/img/hammer1.png", matched: false},
  {"src": "/img/skull1.png", matched: false},
  {"src": "/img/treasure1.png", matched: false},
  {"src": "/img/sword1.png", matched: false},
  {"src": "/img/heart1.png", matched: false},
  {"src": "/img/key1.png", matched: false},
  {"src": "/img/map1.png", matched: false},
  {"src": "/img/potion1.png", matched: false},
  {"src": "/img/hourglass1.png", matched: false},
]


function App() {

  const [cards, setCards] = useState([])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [turns, setTurns] = useState(0)
  const [level, setLevel] = useState(null)


  // shuffle the cards randomly for easy
  const shuffleCardsMedium = () => {
    const shuffledCardsMedium = [...allCards, ...allCards]
      .sort(() => Math.random() - 0.5)
      .map((cards) => ({...cards, id: Math.random()}))

    setChoiceOne(null)
    setChoiceTwo(null)
    setLevel(false)
    setCards(shuffledCardsMedium)
    setTurns(0)
  }

  // shuffle the cards randomly for hard
  const shuffleCardsHard = () => {
    const shuffledCardsHard = [...allCardsHard, ...allCardsHard]
      .sort(() => Math.random() - 0.5)
      .map((cards) => ({...cards, id: Math.random()}))

    setChoiceOne(null)
    setChoiceTwo(null)
    setLevel(true)
    setCards(shuffledCardsHard)
    setTurns(0)
  }



  // handles the choices from the user
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    
  }

  // handle choices from the user
  useEffect(() => {
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              play()
              return{...card, matched: true}
            } else{
              return card
            }
          })
        })
        resetChoices()
      } else{
        setTimeout(() => resetChoices(), 1000)
      }
    }
    
  },[choiceOne, choiceTwo])


  // reset the choices
  const resetChoices = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)
    setTurns(prevTurns => prevTurns + 1)
  }

  // play the sound
  function play(){
    new Audio(sound).play()
  }

  return (
    <div className="App">
      <h1 className='main-title'>Card Flipping Game</h1>
      <button className='btn-first' onClick={shuffleCardsMedium}>Easy</button>
      <button className='btn-first' onClick={shuffleCardsHard}>Hard</button>
      <div className={level ? "card-grid-wr-hard" : "card-grid-wr"}>
        {cards.map(card => (
          <SingleCard 
            card={card} 
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            >
          </SingleCard>
        ))}
      </div>
      <p>Score: {turns}</p>
    </div>
  );
}

export default App;
