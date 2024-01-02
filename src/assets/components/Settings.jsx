import Button from './Button';

// The Settings component is responsible for containing components for
// picking the player's figure, forfeiting the game and starting a new game.
// If the game is running, the player can forfeit.
// If the game isn't running, the player can start a new game.
export default function Settings(props) {
    const { onStartClick, playerFigure, onNewGameClick, onForfeitClick, isRunning } = props;

    return (
        <>
            {playerFigure === '' && <div className="text-center">
                <h2>Pick your figure</h2>
                <div>
                    <Button variant='btn btn-figure' data-figure='X' onClick={onStartClick}>X</Button>
                    <Button variant='btn btn-figure' data-figure='O' onClick={onStartClick}>O</Button>
                </div>
            </div>}
            {playerFigure && <div className="text-center">
                <h2>Options</h2>
                {isRunning && <Button variant='btn btn-figure' onClick={onForfeitClick}>Forfeit?</Button>}
                {!isRunning && <Button variant='btn btn-figure' onClick={onNewGameClick}>Start new game?</Button>}
            </div>}
        </>
    );
};