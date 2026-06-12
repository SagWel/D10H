import { useModals } from "../../hooks/useModals";
import FirstEditProfil from "./childrens/FirstEditProfil";
import TempoManager from "./childrens/TempoManager";
import StandardModal from "./StandardModal";

export interface IModalManagerProps { }


const MODALS: Record<string, React.ComponentType<any>> = {
    'FIRST_EDIT_PROFIL': FirstEditProfil,
    // 'ADD_SCORBRARY': ,
    // 'TUNNER': ,
    'TEMPO_MANAGEMENT': TempoManager,
    // 'LEARNING_MODE': ,
    // 'LOOPER': ,
    // 'MUTE': ,
    // 'ANNOTATION': ,
    // 'PRINT': ,
    // 'CHORDS_BOOK': ,
    // 'CONFIDENTIAL_PARAMS': , 
    // 'PERSONAL_DATA': ,
    // 'CONFIRM_IDENTITY': ,
    // 'FORGOTTEN_PASSWORD': ,
}

const ModalManager: React.FC<IModalManagerProps> = () => {
    const { onClose, name, modalProps } = useModals()

    const ActiveModal = name ? MODALS[name] : null

    if (!name || !ActiveModal) {
        return null
    }

    return (
        <StandardModal isOpen={!!name} onClose={onClose} heading={modalProps.title}
        bg={modalProps.bg} border={modalProps.border} topPosition={modalProps.topPosition} >
            <ActiveModal {...modalProps} />
        </StandardModal>
    )
}

export default ModalManager