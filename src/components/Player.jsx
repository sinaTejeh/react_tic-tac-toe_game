import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangeName }) {
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = function () {
        setIsEditing((editig) => !editig);
        if (isEditing) onChangeName(symbol, playerName);
    };

    const handleChange = function (e) {
        const chengedName = e.target.value;
        setPlayerName(chengedName);
    };

    let player = <span className="player-name">{playerName}</span>;
    if (isEditing) player = <input type="text" required value={playerName} onChange={handleChange} />

    return (
        < li className={isActive ? 'active' : ''}>
            <span className="player">
                {player}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{!isEditing ? 'Edit' : 'Save'}</button>
        </li >);
}