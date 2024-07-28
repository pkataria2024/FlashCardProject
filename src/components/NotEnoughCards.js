import React from "react";
import { Link } from "react-router-dom";

function NotEnoughCards({ deck }) {
    return (
        <div>
            <h2>{deck.name} : Study</h2>
            <h3>Not enough cards.</h3>
            <p>
                You need at least 3 cards to study. There are {deck.cards.length} cards in
                this deck.
            </p>
            <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
                Add Cards
            </Link>
        </div>
    );
}

export default NotEnoughCards;
