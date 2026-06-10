import { useContext } from "react";

/* Import context */
import { PlayScoreStatesContext, PlayScoreDispatchContext } from "../context/PlayScoreContext";

export const usePlayScoreStates = () => {
    const statesContext = useContext(PlayScoreStatesContext)

    if (statesContext === undefined) throw new Error("usePlayScore doit être utilisé à l'intérieur d'un PlayScoreStatesProvider")
    
    return statesContext
}

export const usePlayScoreDispatch = () => {
    const dispatchContext = useContext(PlayScoreDispatchContext)

    if (dispatchContext === undefined) throw new Error("useDispatch doit être utilisé à l'intérieur d'un PlayScoreDispatchProvider")

    return dispatchContext
}