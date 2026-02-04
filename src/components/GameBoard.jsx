export default function GameBoard({ onSelcetedPlayer, board }) {
    return (
        <ol id="game-board">
            {board.map((row, rIndex) =>
                <li key={rIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) =>
                            <li key={colIndex}>
                                <button onClick={() => onSelcetedPlayer(rIndex, colIndex)} disabled={playerSymbol}>
                                    {playerSymbol}
                                </button>
                            </li>)}
                    </ol>
                </li>)}
        </ol>
    );
}