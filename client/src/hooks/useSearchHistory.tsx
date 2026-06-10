import { useState, useEffect } from "react";

export interface IHistoryItem {
    query: string,
    title: string,
    artistName: string,
    coverUrl: string,
    type: string
}

const useSearchHistory = () => {

    // Transforms the data from lacalStorage into an array of those data
    const [history, setHistory] = useState<IHistoryItem[]>(() => {
        const storedHistory = localStorage.getItem("D10H_!_Search_History")

        if (storedHistory) {
            try {
                return JSON.parse(storedHistory)
            } catch (e) {
                console.error("Erreur lors du formatage des données locales", e);
                return []
            }
        }
        return []
    })

    useEffect(() => {
        const jsonHistory = JSON.stringify(history)
        localStorage.setItem("D10H_!_Search_History", jsonHistory)
    }, [history])

    // Adds the latest search query in search history
    function addToHistory (newItem: IHistoryItem) {
        setHistory((prevHistory: IHistoryItem[]) => {
            const filteredHistory = prevHistory.filter((e: IHistoryItem) => e.query != newItem.query)
            const updatedHistory = [newItem, ...filteredHistory]
            const limitedHistory = updatedHistory.slice(0, 10)
            return limitedHistory
        })
    }

    return [history, setHistory, addToHistory]

}

export default useSearchHistory