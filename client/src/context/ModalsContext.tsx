import { createContext, useMemo, useState, type ReactNode } from "react";

export type ModalName = 
    'FIRST_EDIT_PROFIL' |
    // 'ADD_SCORBRARY' |
    // 'TUNNER' |
    'TEMPO_MANAGEMENT' |
    // 'LEARNING_MODE' |
    // 'LOOPER' |
    // 'MUTE' |
    // 'ANNOTATION' |
    // 'PRINT' |
    // 'CHORDS_BOOK' |
    // 'CONFIDENTIAL_PARAMS' | 
    // 'PERSONAL_DATA' |
    // 'CONFIRM_IDENTITY' |
    // 'FORGOTTEN_PASSWORD' |
    null

interface ModalsContextType {
    name: ModalName,
    modalProps: Record<string, any>,
    updateProps: (newProps: Record<string, any>) => void,
    onOpen: (
        modalName: ModalName,
        content?: Record<string, any>,
    ) => void,
    onClose: () => void
}

const ModalsContext: React.Context<ModalsContextType | undefined> = createContext<ModalsContextType | undefined>(undefined)

interface ModalsProviderProps {
    children: ReactNode
}

const ModalsProvider = ({ children } : ModalsProviderProps) => {

    const [name, setName] = useState<ModalName | null>(null)
    const [modalProps, setModalProps] = useState<Record<string, any> | {}>({})

    const onOpen: (modalName: ModalName, content?: Record<string, any>) => void = (modalName, content) => {
        setName(modalName)
        if (content) setModalProps(content)
    }

    const onClose: () => void = () => {
        setName(null)
        setModalProps({})
    }

    const updateProps: (newProps: Record<string, any>) => void = (newProps) => {
        setModalProps(prevProps => ({...prevProps, ...newProps}))
    }

    const contextValue = useMemo(() => ({
        name,
        modalProps,
        onOpen,
        onClose,
        updateProps,
    }), [name, modalProps])

    return (
        <ModalsContext.Provider value={contextValue}>
            {children}
        </ModalsContext.Provider>
    )
}

export {ModalsContext, ModalsProvider}