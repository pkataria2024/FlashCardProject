import React from 'react';
import { Link } from 'react-router-dom';

function CardForm({ formData, handleChange, handleSubmit, deckId, isEditing = false }) {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="front">Front</label>
                <textarea
                    id="front"
                    name="front"
                    value={formData.front}
                    onChange={handleChange}
                    rows="3"
                    required
                />
            </div>
            <div>
                <label htmlFor="back">Back</label>
                <textarea
                    id="back"
                    name="back"
                    value={formData.back}
                    onChange={handleChange}
                    rows="3"
                    required
                />
            </div>
            <button type="submit">Save</button>
            <Link to={`/decks/${deckId}`} className="btn btn-secondary">Cancel</Link>
        </form>
    );
}

export default CardForm;
