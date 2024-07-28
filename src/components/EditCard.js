/*import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";

function EditCard() {
    const { deckId, cardId } = useParams();
    const navigate = useNavigate();
    const [card, setCard] = useState({ front: "", back: "" });
    const [deck, setDeck] = useState(null);

    useEffect(() => {
        async function loadCardAndDeck() {
            try {
                const loadedDeck = await readDeck(deckId);
                setDeck(loadedDeck);
                const loadedCard = await readCard(cardId);
                setCard(loadedCard);
            } catch (error) {
                console.error("Failed to load card or deck:", error);
            }
        }
        loadCardAndDeck();
    }, [deckId, cardId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCard((prevCard) => ({
            ...prevCard,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateCard(card);
            navigate(`/decks/${deckId}`);
        } catch (error) {
            console.error("Failed to update card:", error);
        }
    };

    return (
        <>
            <h2>Edit Card {cardId}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="front">Front</label>
                    <textarea
                        id="front"
                        name="front"
                        value={card.front}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="back">Back</label>
                    <textarea
                        id="back"
                        name="back"
                        value={card.back}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Save</button>
                <Link to={`/decks/${deckId}`} className="btn btn-secondary">Cancel</Link>
            </form>
        </>
    );
}

export default EditCard;*/

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { readDeck, readCard, updateCard } from '../utils/api';
import CardForm from './CardForm';

function EditCard() {
    const { deckId, cardId } = useParams();
    const [deck, setDeck] = useState(null);
    const [formData, setFormData] = useState({ front: '', back: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadCardAndDeck = async () => {
            try {
                const loadedDeck = await readDeck(deckId);
                setDeck(loadedDeck);
                const loadedCard = await readCard(cardId);
                setFormData(loadedCard);
            } catch (error) {
                setError('Failed to load card or deck');
            }
        };
        loadCardAndDeck();
    }, [deckId, cardId]);

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateCard(formData);
            navigate(`/decks/${deckId}`);
        } catch (error) {
            setError('Failed to update card');
        }
    };

    if (error) return <p>{error}</p>;
    if (!deck) return <p>Loading...</p>;

    return (
        <div>
            <nav>
                <Link to="/">Home</Link> / <Link to={`/decks/${deckId}`}>{deck.name}</Link> / Edit Card {cardId}
            </nav>
            <h2>Edit Card</h2>
            <CardForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                deckId={deckId}
                isEditing={true}
            />
        </div>
    );
}

export default EditCard;

