import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState, lazy } from "react";
import AdoptedPetContext from "./../dataFetching/AdoptedPetContext";
import ErrorBoundary from "./ErrorBoundary";
import fetchPet from "./../dataFetching/fetchPet";
import Carousel from "./Carousel";

// waiting to load the modal until it's needed
const Modal = lazy(() => import("./Modal"));

const Details = () => {
    const { id } = useParams(); // extracts the id of the animal from the url
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate(); // to navigate different routes
    const results = useQuery(["details", id], fetchPet); // fetching the details of the pet using the fetch pet method
    // eslint-disable-next-line no-unused-vars
    const [_, setAdoptedPet] = useContext(AdoptedPetContext); // accessing the context of adopted pet,
    // now we can set the adopted pet and this context will be shared between multiple components

    // data fetching provides a "isLoading" prop
    if (results.isLoading) {
        return (
            <div className="loading-pane">
                <h2 className="loader">🌀</h2>
            </div>
        );
    }

    const pet = results.data.pets[0];

    return (
        <div className="details">
            <Carousel images={pet.images} />
            <div>
                <h1>{pet.name}</h1>
                <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
                <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
                <p>{pet.description}</p>
                {showModal ? (
                    <Modal>
                        <div>
                            <h1>Would you like to adopt {pet.name}?</h1>
                            <div className="buttons">
                                <button
                                    onClick={() => {
                                        setAdoptedPet(pet);
                                        navigate("/");
                                    }}
                                >
                                    Yes
                                </button>
                                <button onClick={() => setShowModal(false)}>No</button>
                            </div>
                        </div>
                    </Modal>
                ) : null}
            </div>
        </div>
    );
};

// wraps the details (with it props) to error component
export default function DetailsErrorBoundary(props) {
    return (
        <ErrorBoundary>
            <Details {...props} />
        </ErrorBoundary>
    );
}