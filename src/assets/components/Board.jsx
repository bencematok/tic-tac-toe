import Button from './Button';

// Board component. This is the whole Tic-Tac-Toe board.
// The board's individual fields have their position ordered in the dataset to correspond
// to a nested array's elements. Upon clicking a field, the corresponding element in the
// nested array is replaced with either the player's or the computer's figure.
// A field is disabled if one of the following conditions is true:
// * It's not the player's turn
// * The game isn't running
// * The corresponding array element isn't an empty string.
// The child of the individual field is the corresponding array element.
export default function Board(props) {
    const { fields, isRunning, onFieldClick, turn } = props;

    return (
        <>
            <div className='board'>
                {fields.map((row, rowIndex) => {
                    return row.map((field, columnIndex) => {
                        return (<Button key={`${rowIndex}-${columnIndex}`} onClick={onFieldClick} variant='btn btn-field' disabled={turn !== 'Player' || !isRunning || fields[rowIndex][columnIndex] !== ''} data-row={rowIndex} data-column={columnIndex}>{fields[rowIndex][columnIndex]}</Button>)
                    })
                })}
            </div>
        </>
    );
};