import { useState } from 'react';

export default function Players({
    initialName,
    symbol,
    isActive,
    onChangeName,
}) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false)
    
    function handleEditClick() {
        setIsEditing((editing) => !editing);
    
        if (isEditing) {
          onChangeName(symbol, playerName);
        }
      }
    
      function handleChange(event) {
        setPlayerName(event.target.value);
      }
    
      let editablePlayerName = <span className="player-name">{playerName}</span>;
      // let btnCaption = 'Edit';
    
      if (isEditing) {
        editablePlayerName = (
          <input type="text" required value={playerName} onChange={handleChange} />
        );
        // btnCaption = 'Save';
      }

    return (
        <li className='player'>
            <span className={isActive ? 'edit' : 'not-edit'}>{editablePlayerName}
                <span className='symbol'>{symbol}</span>
            </span>
            <button className='save-btn' onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}