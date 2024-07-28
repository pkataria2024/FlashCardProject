import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {
    const [deck, setDeck] = useState({ name: "", description: "" });
    const navigate = useNavigate();

    const handleChange = ({ target }) => {
        setDeck({
            ...deck,
            [target.name]: target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await createDeck(deck);
        navigate("/");
    };

    return (
        <div>
            <h2>Create Deck</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Deck Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={deck.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        rows="3"
                        value={deck.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                    Save
                </button>
            </form>
        </div>
    );
}

export default CreateDeck;
