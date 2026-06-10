import { useContext } from "react";

/* Import context */
import { ScoreContext } from "../context/ScoreContext";

export const useScore = () => {
    const context = useContext(ScoreContext)

    if (context === undefined) throw new Error("useScore doit être utilisé à l'intérieur d'un ScoreProvider")
    
    return context
}