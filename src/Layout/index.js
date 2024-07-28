import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../components/Home";
import Decks from "../components/Decks";
import CreateDeck from "../components/CreateDeck";
import Deck from "../components/Deck";
import Study from "../components/Study";
import EditDeck from "../components/EditDeck";
import AddCard from "../components/AddCard";
import EditCard from "../components/EditCard";

function Layout() {
    return (
        <>
            <Header />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/decks" element={<Decks />} />
                    <Route path="/decks/new" element={<CreateDeck />} />
                    <Route path="/decks/:deckId" element={<Deck />} />
                    <Route path="/decks/:deckId/study" element={<Study />} />
                    <Route path="/decks/:deckId/edit" element={<EditDeck />} />
                    <Route path="/decks/:deckId/cards/new" element={<AddCard />} />
                    <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </>
    );
}

export default Layout;
