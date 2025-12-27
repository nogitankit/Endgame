import clsx from "clsx"


export default function Status({isGameOver, isGameLost, isGameWon, message, wrongGuesses, length}) {
    console.log(wrongGuesses)
    console.log(length)
   function renderGameStatus() {
        if (isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>You Escaped the horde.{wrongGuesses<length - 1 ?' The dog is safe!' : ''}🎉</p>
                </>
            )
        }
        else if(isGameLost) {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>They ate your brain. You joined the undead. 🧟</p>
                </>
            )
        }
        else if(message && !isGameOver){
            return (
                <>
                    <p>{message}</p>
                </>
            )
        }
        else if (!isGameOver) {
            return null
        } 
        

    }

    return (
        <section className={clsx(
            'game-status', {
                'won' : isGameWon,
                'lost' : isGameLost,
                'wrong' : message && !isGameOver
            }
        )}>
            {renderGameStatus()}
        </section>
    )
}