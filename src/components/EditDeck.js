import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import Breadcrumb from "./Breadcrumb";

function EditDeck() {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const [deck, setDeck] = useState({ name: "", description: "" });

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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDeck((prevDeck) => ({
            ...prevDeck,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateDeck(deck);
            navigate(`/decks/${deckId}`);
        } catch (error) {
            console.error("Failed to update deck:", error);
        }
    };

    return (
        <>
            <Breadcrumb deck={deck} />
            <h2>Edit Deck</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Deck Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={deck.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={deck.description}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Save</button>
                <Link to={`/decks/${deckId}`} className="btn btn-secondary">Cancel</Link>
            </form>
        </>
    );
}

export default EditDeck;
