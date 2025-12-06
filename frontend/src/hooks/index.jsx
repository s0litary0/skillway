import { useEffect, useState } from "react";


export const useLocalStorage = (key) => {
    
    if (!key) {
        throw Error("Did not provided key");
    }
    const [item, setItem] = useState(() => {
        return JSON.parse(localStorage.getItem(key))
    });
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(item));
    }, [item])

    return [item, setItem]
}