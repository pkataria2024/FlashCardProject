import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import CreateDeck from "./CreateDeck";
import Deck from "./Deck";

function Decks() {
    const { path } = useParams();

    return (
        <Routes>
            <Route path={`${path}/new`} element={<CreateDeck />} />
            <Route path={`${path}/:deckId/*`} element={<Deck />} />
        </Routes>
    );
}

export default Decks;
