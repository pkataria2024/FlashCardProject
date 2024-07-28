import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

function Home() {
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        const fetchDecks = async () => {
            const data = await listDecks();
            setDecks(data);
        };
        fetchDecks();
    }, []);

    const handleDelete = async (deckId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this deck?");
        if (confirmDelete) {
            await deleteDeck(deckId);
            setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== deckId));
        }
    };

    return (
        <div>
            <Link to="/decks/new" className="btn btn-primary mb-2">
                Create Deck
            </Link>
            {decks.map((deck) => (
                <div key={deck.id} className="card mb-2">
                    <div className="card-body">
                        <h5 className="card-title">{deck.name}</h5>
                        <p className="card-text">{deck.cards.length} cards</p>
                        <Link to={`/decks/${deck.id}/study`} className="btn btn-secondary mr-2">
                            Study
                        </Link>
                        <Link to={`/decks/${deck.id}`} className="btn btn-primary mr-2">
                            View
                        </Link>
                        <button onClick={() => handleDelete(deck.id)} className="btn btn-danger">
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;
