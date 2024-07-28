import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { readDeck } from '../utils/api/index';

function Study() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState(null);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadDeck = async () => {
            try {
                const deckData = await readDeck(deckId);
                setDeck(deckData);
            } catch (error) {
                console.error('Failed to load deck:', error);
            }
        };
        loadDeck();
    }, [deckId]);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        if (deck.cards.length > 1 && currentCardIndex < deck.cards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
            setIsFlipped(false);
        } else {
            const restart = window.confirm("You've reached the end of the deck. Would you like to restart?");
            if (restart) {
                setCurrentCardIndex(0);
                setIsFlipped(false);
            } else {
                navigate('/');
            }
        }
    };

    if (deck === null) return <p>Loading...</p>;

    return (
        <div>
            <nav>
                <Link to="/">Home</Link> / <Link to={`/decks/${deckId}`}>{deck.name}</Link> / Study
            </nav>
            {deck.cards.length <= 2 ? (
                <div>
                    <h2>Study: {deck.name}</h2>
                    <h3>Not enough cards.</h3>
                    <p>
                        You need at least 3 cards to study. There are {deck.cards.length} cards in
                        this deck.
                    </p>
                    <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
                        Add Cards
                    </Link>
                </div>
            ) : (
          <div>
                    <h2>Study: {deck.name}</h2>
                    {deck.cards.length > 0 && (
                        <div>
                <p>Card {currentCardIndex + 1} of {deck.cards.length}</p>
                            <div>
                                <p>{isFlipped ? deck.cards[currentCardIndex].back : deck.cards[currentCardIndex].front}</p>
                                <button onClick={handleFlip}>{isFlipped ? 'Show Front' : 'Flip'}</button>
                            </div>
                            {isFlipped && (
                                <button onClick={handleNext}>Next</button>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Study;
