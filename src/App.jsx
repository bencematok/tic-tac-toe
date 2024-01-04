import { useState, useEffect } from 'react'
import Board from './assets/components/Board.jsx';
import Container from './assets/components/Container.jsx';
import ScoreBoard from './assets/components/Scoreboard.jsx';
import Settings from './assets/components/Settings.jsx';
import './App.css';

function App() {
  // The player's and the computer's scores are saved to the browser's local storage to keep track of the scores.
  // If the key doesn't exist in the local storage, the value defaults to 0.
  const [playerScore, setPlayerScore] = useState(() => Number.parseInt(localStorage.getItem('playerScore')) || 0);
  const [computerScore, setComputerScore] = useState(() => Number.parseInt(localStorage.getItem('computerScore')) || 0);
  // States to keep track of the player's and the computer's figure.
  const [playerFigure, setPlayerFigure] = useState('');
  const [computerFigure, setComputerFigure] = useState('');
  const [fields, setFields] = useState([['', '', ''], ['', '', ''], ['', '', '']]); // The board as nested arrays.
  // Player starts.
  const [turn, setTurn] = useState('Player');
  // The game is not running by default.
  const [isRunning, setIsRunning] = useState(false);
  // Winner state is empty until someone actually wins.
  const [winner, setWinner] = useState('');

  // The various combinations for winning.
  const winningCombinations = () => {
    if (fields[0][0] === fields[0][1] && fields[0][0] === fields[0][2] && fields[0].every(field => field !== '')) {
      return true;
    } else if (fields[1][0] === fields[1][1] && fields[1][0] === fields[1][2] && fields[1].every(field => field !== '')) {
      return true;
    } else if (fields[2][0] === fields[2][1] && fields[2][0] === fields[2][2] && fields[2].every(field => field !== '')) {
      return true;
    } else if (fields[0][0] === fields[1][0] && fields[0][0] === fields[2][0] && fields[0][0] !== '' && fields[1][0] !== '' && fields[2][0] !== '') {
      return true;
    } else if (fields[0][1] === fields[1][1] && fields[0][1] === fields[2][1] && fields[0][1] !== '' && fields[1][1] !== '' && fields[2][1] !== '') {
      return true;
    } else if (fields[0][2] === fields[1][2] && fields[0][2] === fields[2][2] && fields[0][2] !== '' && fields[1][2] !== '' && fields[2][2] !== '') {
      return true;
    } else if (fields[0][0] === fields[1][1] && fields[0][0] === fields[2][2] && fields[0][0] !== '' && fields[1][1] !== '' && fields[2][2] !== '') {
      return true;
    } else if (fields[0][2] === fields[1][1] && fields[0][2] === fields[2][0] && fields[0][2] !== '' && fields[1][1] !== '' && fields[2][0] !== '') {
      return true;
    };
  };

  // We save the player's score to the browser's local storage when the player's score changes.
  useEffect(() => {
    localStorage.setItem('playerScore', playerScore);
  }, [playerScore]);

  // We save the computer's score to the browser's local storage when the computer's score changes.
  useEffect(() => {
    localStorage.setItem('computerScore', computerScore);
  }, [computerScore])

  // When the player's figure changes, we pick the other figure for the computer.
  useEffect(() => {
    const computerChoices = {
      'X': 'O',
      'O': 'X',
      '': ''
    };
    setComputerFigure(computerChoices[playerFigure]);
  }, [playerFigure])

  // Every time the fields state changes (the user and then the computer pick an empty field)
  // we check if anyone has a winning combination. If not, the game goes on.
  useEffect(() => {
    if (isRunning) {
      const isWinning = winningCombinations();
      if (isWinning && turn === 'Computer') {
        setWinner('Player');
      } else if (isWinning && turn === 'Player') {
        setWinner('Computer');
      } else if (turn === 'Computer' && !isWinning) {
        handleComputerPick();
        console.log('Player turn');
        setTurn('Player');
      };
    }
  }, [fields]);

  // If there's a winner, we increment the winner's score count.
  useEffect(() => {
    if (winner === 'Player') {
      setPlayerScore(prevPlayerScore => prevPlayerScore + 1);
    } else if (winner === 'Computer') {
      setComputerScore(prevComputerScore => prevComputerScore + 1);
    }
    setIsRunning(false);
  }, [winner]);

  // If the player decides to forfeit, the computer's score is incremented.
  // The figures are reset.
  // The field is reset.
  const handleForfeitClick = () => {
    setComputerScore(prevComputerScore => prevComputerScore + 1);
    setPlayerFigure('');
    setComputerFigure('');
    setFields([['', '', ''], ['', '', ''], ['', '', '']]);
  };

  // For the computer's picks.
  const randomNumber = () => {
    return Math.floor(Math.random() * 3);
  }

  // We set the player's figure to the picked figure and start the game.
  const handleStartClick = (event) => {
    setPlayerFigure(event.target.dataset.figure);
    setIsRunning(true);
    setTurn('Player');
  }

  // We reset every state that needs to be reset.
  const handleNewGameClick = () => {
    setWinner('');
    setPlayerFigure('');
    setComputerFigure('');
    setFields([['', '', ''], ['', '', ''], ['', '', '']]);
  }

  // The new fields state will be a mapping of the previous one,
  // where the picked field's coordinates are substituted into the array.
  // The value is replaced with the figure. If the field is not the one
  // the player picked, it's left as is.
  const handleFieldClick = (event) => {
    setFields(fields.map((row, index) => {
      if (index === Number.parseInt(event.target.dataset.row)) {
        return row.map((field, index) => {
          if (index === Number.parseInt(event.target.dataset.column)) {
            return playerFigure;
          }
          return field;
        });
      };
      return row;
    }));
    console.log('Computer turn');
    setTurn('Computer');
  };

  // We pick a random number for the row and the column for the computer.
  // If the picked field candidate is not empty, we pick it again.
  // Otherwise, we map the fields state accordingly.
  const handleComputerPick = () => {
    const rowRandom = randomNumber();
    const columnRandom = randomNumber();
    const candidate = fields[rowRandom][columnRandom];

    if (candidate === '') {
      setFields(fields.map((row, index) => {
        if (index === rowRandom) {
          return row.map((field, index) => {
            if (index === columnRandom) {
              return computerFigure;
            }
            return field;
          })
        }
        return row;
      }));
    } else {
      return handleComputerPick();
    }
  };

  return (
    <>
      <Container>
        <h1 className='text-center'>Tic-Tac-Toe</h1>
        <ScoreBoard playerScore={playerScore} computerScore={computerScore} isRunning={isRunning} winner={winner} playerFigure={playerFigure} />
        <Settings onStartClick={handleStartClick} playerFigure={playerFigure} computerFigure={computerFigure} onNewGameClick={handleNewGameClick} onForfeitClick={handleForfeitClick} isRunning={isRunning} />
        <Board fields={fields} onFieldClick={handleFieldClick} turn={turn} isRunning={isRunning} />
      </Container>
    </>
  )
}

export default App
