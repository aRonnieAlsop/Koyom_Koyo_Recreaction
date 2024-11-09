import React from 'react';
import './ProgramCard.css';

const ProgramCard = ({ program, isAuthenticated, onEdit, onDelete, onClick }) => (
    <div className="program-card" onClick={() => onClick(program)}>
        <img src={program.image} alt={program.title} className="program-image" />
        <div className="program-title">
            {isAuthenticated ? (
                <input 
                    type="text"
                    value={program.title}
                    onChange={(e) => onEdit({ ...program, title: e.target.value })}
                    />
            ) : (
                program.title
            )}
            {isAuthenticated && (
                <button className="delete-button" onClick={(e) => {
                    e.stopPropagation();
                    onDelete(program);
                }}>X</button>
            )}
        </div>
    </div>
);

export default ProgramCard;