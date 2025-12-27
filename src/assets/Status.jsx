import clsx from "clsx"

export default function Status({isGameOver, isGameLost, isGameWon}){
    return (
        <section className={clsx(
            'game-status', {
                'won' : isGameWon,
                'lost' : isGameLost
            }
        )}>
            {isGameOver ? (
                isGameWon ? (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
                ) : (
                <>
                    <h2> you lous</h2>
                    <p>Try again next time!</p>
                </> 
                )
            ) : null
            }
        </section>
    )
}