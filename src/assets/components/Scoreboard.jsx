// The Scoreboard component keeps track of the scores.
// If the winner isn't a falsy value, the winner is displayed.
export default function Scoreboard(props) {
    const { playerScore, computerScore, winner } = props;
    return (
        <>
            <h2 className="text-center">Scores</h2>
            <p className="text-center">Player: {playerScore}</p>
            <p className="text-center">Computer: {computerScore}</p>
            {winner && <h3 className="text-center">{winner} wins!</h3>}
        </>
    );
};