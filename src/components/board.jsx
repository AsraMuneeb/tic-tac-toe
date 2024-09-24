
export default function Board({ onSelectSquare, board }){
    return(
        <div className='game-board'>
        <ul className='row'>
            {board.map((row, rowIndex)=>(<li key={rowIndex}>
                <ul className="col">
                    {row.map((playerSymbol, colIndex)=>(<li key={colIndex}>
                        <button className='cells' onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}><p>{playerSymbol}</p></button>
                    </li>))}
                </ul>
            </li>))
            }
        </ul>
        </div>
    )
}