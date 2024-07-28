import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { readDeck, createCard } from '../utils/api';
import CardForm from './CardForm';

function AddCard() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState(null);
    const [formData, setFormData] = useState({ front: '', back: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadDeck = async () => {
            try {
                const deckData = await readDeck(deckId);
                setDeck(deckData);
            } catch (error) {
                setError('Failed to load deck');
            }
        };
        loadDeck();
    }, [deckId]);

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createCard(deckId, formData);
            setFormData({ front: '', back: '' });
        } catch (error) {
            setError('Failed to create card');
        }
    };

    const handleDone = () => {
        navigate(`/decks/${deckId}`);
    };

    if (error) return <p>{error}</p>;
    if (!deck) return <p>Loading...</p>;

    return (
        <div>
            <nav>
                <Link to="/">Home</Link> / <Link to={`/decks/${deckId}`}>{deck.name}</Link> / Add Card
            </nav>
            <h2>{deck.name} : </h2>
            <h2>Add Card</h2>
            <CardForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                deckId={deckId}
            />
            <button type="button" onClick={handleDone}>Done</button>
        </div>
    );
}

export default AddCard;

/*import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { readDeck, createCard } from '../utils/api/index';

function AddCard() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState(null);
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadDeck = async () => {
            try {
                const deckData = await readDeck(deckId);
                setDeck(deckData);
            } catch (error) {
                setError('Failed to load deck');
            }
        };
        loadDeck();
    }, [deckId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createCard(deckId, { front, back });
            setFront('');
            setBack('');
        } catch (error) {
            setError('Failed to create card');
        }
    };

    const handleDone = () => {
        navigate(`/decks/${deckId}`);
    };

    if (error) return <p>{error}</p>;
    if (deck === null) return <p>Loading...</p>;

    return (
        <div>
            <nav>
                <Link to="/">Home</Link> / <Link to={`/decks/${deckId}`}>{deck.name}</Link> / Add Card
            </nav>
            <h2>{deck.name} : </h2>
            <h2>Add Card</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="front">Front</label>
                    <textarea
                        id="front"
                        value={front}
                        onChange={(e) => setFront(e.target.value)}
                        rows="3"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="back">Back</label>
                    <textarea
                        id="back"
                        value={back}
                        onChange={(e) => setBack(e.target.value)}
                        rows="3"
                        required
                    />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={handleDone}>Done</button>
            </form>
        </div>
    );
}

export default AddCard;*/
