import React from 'react'
import './App.css'
import Frame from './assets/Frame'
import Keyboard from './assets/Keyboard'
import { languages } from './assets/languages'
import Status from './assets/Status'

function App() {
  //state values
  const [currentWord, setCurrentWord] = React.useState("react")
  const [guessedWord, setGuessedWord] = React.useState([])

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
      <span className="letter" key={index}>
        {guessedWord.includes(char) ? char : ''}
      </span>
    )
  })

  function keyPressed(key){
    setGuessedWord(prev => {
      return(
      prev.includes(key) ? prev : [...prev, key] 
      )
    })
  }
  console.log(guessedWord)


  return (
    <main style={{display : 'flex', justifyContent : 'center', flexDirection : 'column', alignItems : 'center'}}>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from assembly</p>
      </header>
      <Status 
      isGameOver={isGameOver} isGameLost={isGameLost} isGameWon={isGameWon} 
      />
      <section className='languages'>
        <Frame  wrong={wrongGuesses}/>
      </section>
      <section className='letters'>
        {letters}
      </section>
     <Keyboard keyPressed={keyPressed} guessed={guessedWord} current ={currentWord}/>
     { isGameOver &&
      <button className='new-game'>New Game</button>}
     
      
    </main>
  )
} 

export default App
