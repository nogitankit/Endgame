import clsx from 'clsx';

export default function Keyboard(props){


    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const keyboardElements = alphabet.split("").map(letter => {
        const isGuessed = props.guessed.includes(letter)
        const isCorrect = props.current.includes(letter)
        return(
        <button 
        key={letter} 
        className={clsx( 'key-letter', {
            'guessed-correct' : isGuessed && isCorrect,
            'guessed' : isGuessed && !isCorrect
        }
        )}
        onClick={() => {
            props.keyPressed(letter);
            if(!props.current.includes(letter))
                props.wrongGuess();
        }
        }
        disabled={isGuessed || props.isGameOver}
        >{letter.toUpperCase()}</button>
    )
    })

    return(
        <section className="keyboard">
        {keyboardElements}
        </section>
    )
}