import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

// the modal gets a children props in order to show all the nested components inside of it
const Modal = ({ children }) => {
    const elRef = useRef(null);
    if (!elRef.current) {
        elRef.current = document.createElement("div"); // creates a div for the modal conditionally if the reference is null
    }

    useEffect(() => {
        modalRoot.appendChild(elRef.current);
        return () => modalRoot.removeChild(elRef.current);
    }, []); // this effect will only run once, creating a single modal for the element (using the reference for this element)

    // renders the children if tge modal, using the current reference
    return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;