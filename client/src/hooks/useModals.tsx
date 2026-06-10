import { useContext } from "react";

/* Import context */
import { ModalsContext } from "../context/ModalsContext";

export const useModals = () => {
    const context = useContext(ModalsContext)

    if (context === undefined) throw new Error("useModals doit être utilisé à l'intérieur d'un ModalsProvider")
    
    return context
}