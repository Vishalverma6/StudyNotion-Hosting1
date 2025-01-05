import { useEffect } from "react";


// This hook detects clicks outside of the specified components and calls the provided handler function.
export default function useOnClickOutside(ref,handler){
    useEffect( () => {
        // Define the listener function to be called on click/touch events
        const listener= (event) => {
            // if the click/touch event originated inside the ref element ,do nothing
            if(!ref.current || ref.current.contains(event.target)){
                return;
            }
            // otherwise ,call the provided handler function
            handler(event)

        };

        // add event listeners for mousedown and touchstart event on the event
        document.addEventListener("mousedown",listener);
        document.addEventListener("touchstart",listener);

        // Cleanup function to remove the event listeners when the component unamount or when the ref/handler dependencies change
        return ()=> {
            document.removeEventListener("mousedown",listener);
            document.removeEventListener("touchstart",listener);
        } 
    },[ref,handler])
}