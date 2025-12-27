import React from 'react'
import './App.css'
import Frame from './assets/Frame'
import Keyboard from './assets/Keyboard'
import { languages } from './assets/languages'
import Status from './assets/Status'
import { getFarewellText, getRandomWord } from './assets/utils'
import clsx from 'clsx'
import Confetti from 'react-confetti'

function App() {
  //state values
  const [currentWord, setCurrentWord] = React.useState(() => getRandomWord())
  const [guessedWord, setGuessedWord] = React.useState([])
  const [msg , setMsg] = React.useState("")


  const wrongGuessArray = guessedWord.filter(letter => !currentWord.includes(letter))
  const wrongGuesses = wrongGuessArray.length
  console.log(wrongGuesses)


//game finishers
  const isGameWon = 
    currentWord.split("").every(letter => guessedWord.includes(letter))
  const isGameLost = wrongGuesses >= languages.length - 1
  const isGameOver = isGameLost || isGameWon


  const letters = currentWord.split("").map((char, index) => {
    return (
      <span className={clsx(
        'letter', {
          'not-guessed' : isGameLost && !guessedWord.includes(char),
        }
      )} key={index}>
        {guessedWord.includes(char) || isGameOver ? char : ''}
      </span>
    )
  })

  function wrongGuess(){
    setMsg(prev => {
      return(
        getFarewellText(languages[wrongGuesses].name)
      )
    })
  }

  function keyPressed(key){
    setGuessedWord(prev => {
      return(
      prev.includes(key) ? prev : [...prev, key] 
      )
    })
  }
  console.log(msg)

  function newGame(){
    setCurrentWord(getRandomWord)
    setMsg("")
    setGuessedWord([])
  }

  return (
    <main style={{display : 'flex', justifyContent : 'center', flexDirection : 'column', alignItems : 'center'}}>
      {
      isGameWon && 
      <Confetti 
        recycle={false}
        numberOfPieces={1000}
      />
      }
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from assembly</p>
      </header>
      <Status 
      isGameOver={isGameOver} isGameLost={isGameLost} isGameWon={isGameWon} message={msg} 
      />
      <section className='languages'>
        <Frame  wrong={wrongGuesses}/>
      </section>
      <section className='letters'>
        {letters}
      </section>
     <Keyboard keyPressed={keyPressed} wrongGuess={wrongGuess} guessed={guessedWord} current ={currentWord} isGameOver={isGameOver}/>
     { isGameOver &&
      <button className='new-game' onClick={newGame} >New Game</button>}
     
      
    </main>
  )
} 

export default App
