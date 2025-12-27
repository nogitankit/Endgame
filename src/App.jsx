import React, { useEffect } from 'react'
import './App.css'
import Frame from './assets/Frame'
import Keyboard from './assets/Keyboard'
import { zombie } from './assets/zombie'
import Status from './assets/Status'
import { getFarewellText, getRandomWord } from './assets/utils'
import clsx from 'clsx'
import Confetti from 'react-confetti'

function App() {
  //state values
  const [currentWord, setCurrentWord] = React.useState(() => getRandomWord())
  const [guessedWord, setGuessedWord] = React.useState([])
  const [msg , setMsg] = React.useState("")
   const [windowSize, setWindowSize] = React.useState({
      width: window.innerWidth,
      height: window.innerHeight
    })


  const wrongGuessArray = guessedWord.filter(letter => !currentWord.includes(letter))
  const wrongGuesses = wrongGuessArray.length


//game finishers
  const isGameWon = 
    currentWord.split("").every(letter => guessedWord.includes(letter))
  const isGameLost = wrongGuesses >= zombie.length
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
        getFarewellText(wrongGuesses)
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

  function newGame(){
    setCurrentWord(getRandomWord)
    setMsg("")
    setGuessedWord([])
  }

  React.useEffect(()=>{
    function handleResize() {
      setWindowSize({
        width : window.innerWidth,
        height : window.innerHeight
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  },[])

  return (
    <main style={{display : 'flex', justifyContent : 'center', flexDirection : 'column', alignItems : 'center'}}>
      {
      isGameWon && 
      <Confetti 
        recycle={false}
        numberOfPieces={1000}
        width={windowSize.width}
        height={windowSize.height}
      />
      }
      <header>
        <h1>Escape the Horde</h1>
        <p>Guess the password to the safe house. You have 8 attempts before they break in and eat your brains.</p>
      </header>
      <Status 
      isGameOver={isGameOver} isGameLost={isGameLost} isGameWon={isGameWon} message={msg} wrongGuesses={wrongGuesses} length={zombie.length}
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
