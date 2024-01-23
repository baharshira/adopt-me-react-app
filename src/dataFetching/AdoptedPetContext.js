import { createContext } from "react";

// this context will be shared between multiple components, holding the data of the adopted pet
const AdoptedPetContext = createContext();


export default AdoptedPetContext;