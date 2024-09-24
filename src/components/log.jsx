export default function Log({turns}){
    return(
        <ul>
            {turns.map(
                (turn)=>(
                    <li key={`${turn.square.row}${turn.square.col}`}>
                        {turn.player} Selected {turn.square.row},{turn.square.col}
                    </li>
                )
            )}
        </ul>
    )
}