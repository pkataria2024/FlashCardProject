import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { readDeck, deleteCard } from "../utils/api";
import Breadcrumb from "./Breadcrumb";

function Deck() {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const [deck, setDeck] = useState(null);

    useEffect(() => {
        async function loadDeck() {
            try {
                const loadedDeck = await readDeck(deckId);
                setDeck(loadedDeck);
            } catch (error) {
                console.error("Failed to load deck:", error);
            }
        }
        loadDeck();
    }, [deckId]);

    if (!deck) return <p>Loading...</p>;

    const handleDeleteCard = async (cardId) => {
        const confirmed = window.confirm("Are you sure you want to delete this card?");
        if (confirmed) {
            try {
                await deleteCard(cardId);
                setDeck(prevDeck => ({
                    ...prevDeck,
                    cards: prevDeck.cards.filter(card => card.id !== cardId)
                }));
            } catch (error) {
                console.error("Failed to delete card:", error);
            }
        }
    };

    return (
        <>
            <Breadcrumb deck={deck} />
            <h2>{deck.name}</h2>
            <p>{deck.description}</p>
            <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">Edit</Link>
            <Link to={`/decks/${deckId}/study`} className="btn btn-primary">Study</Link>
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">Add Cards</Link>
            <button
                className="btn btn-danger"
                onClick={async () => {
                    const confirmed = window.confirm("Are you sure you want to delete this deck?");
                    if (confirmed) {
                        // Implement deck deletion logic here
                        navigate("/");
                    }
                }}
            >
                Delete
            </button>
            <h3>Cards</h3>
            <ul>
                {deck.cards.map((card) => (
                    <li key={card.id}>
                        <p>{card.front}</p>
                        <p>{card.back}</p>
                        <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary">Edit</Link>
                        <button className="btn btn-danger" onClick={() => handleDeleteCard(card.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Deck;
