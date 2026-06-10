import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalCloseButton, Heading, ButtonGroup } from "@chakra-ui/react";
import { type ReactNode } from "react";
import StandardButton from "../buttons/StandardButton";
import { useModals } from "../../hooks/useModals";

export interface IStandardModalProps {
    isOpen: boolean,
    onClose: () => void
    heading?: string,
    bg?: string,
    border?: string
    footerBtnContent?: string,
    footerOnClick?: () => void,
    children: ReactNode,
 }

const StandardModal: React.FC<IStandardModalProps> = ({ heading, children, footerBtnContent, footerOnClick, isOpen, onClose, bg, border }) => {

    const { name, updateProps } = useModals()

    const onError: () => void = () => {
        updateProps({isError : true})
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={(name !== 'FIRST_EDIT_PROFIL')} onOverlayClick={(name === 'FIRST_EDIT_PROFIL') ? onError : undefined}>

            <ModalOverlay 
            background={"rgba(0, 0, 0, 0.80)"}
            style={{
                opacity: "1"
            }}/>

            <ModalContent
            p={".75rem"}
            maxW={'600px'} h={"fit-content"}
            bg={bg || "#000000"} top={'25%'} border={border || ''}
            borderRadius={"0.5rem"} gap={'1rem'}
            boxShadow={"rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px"}
            style={{
                opacity: 1,
                transform: "none"
            }}>

                <ModalHeader
                paddingInlineStart={"1rem"} paddingInlineEnd={"0.75rem"} padding={heading ? "1.5rem" : "0.5rem"}
                borderBottom={heading ? "1px solid #38373b" : ""} textAlign={'center'}
                margin={0}>
                    {
                    heading && 
                    <Heading
                    fontWeight={"700"} lineHeight={"24px"} fontFamily={"Inter,Arial,sans-serif"}
                    textDecoration={"none"} color={"#ffffff"} size={'lg'}>
                        {heading}
                    </Heading>
                    }
                    { (name !== 'FIRST_EDIT_PROFIL') && <ModalCloseButton 
                    color={'#ffffff'} flexShrink={0}
                    pos={'absolute'} top={0} right={0}
                    mt={'3px'} mr={'3px'}
                    w={'24px'} h={"24px"}
                    onClick={onClose}
                    _active={{
                        bg: 'rgba(255, 255, 255, 0.08)'
                    }}
                    _focus={{
                        boxShadow: 'none'
                    }}
                    />}
                </ModalHeader>

                <ModalBody
                display={'flex'} flexDir={'column'} gap={'1rem'}
                w={'100%'}>
                    {children}
                </ModalBody>

                {
                (footerBtnContent && footerOnClick) && 
                <ModalFooter 
                border={'1px solid #38373b'}>
                    <ButtonGroup 
                    display={"flex"} justifyContent={'flex-end'}
                    p={'1.5rem'}>
                        <StandardButton content="Annuler" 
                        bg={'transparent'} color={'#ffffff'} 
                        onClick={onClose}
                        _active={{
                            color: '#e2dfe6',
                            bg: '#38373b'
                        }}
                        _focus={{
                            zIndex: 1
                        }}
                        _focusVisible={{
                            boxShadow: 'none',
                            outlineColor: '#ad47ff'
                        }}
                        _hover={{
                            color: '#f5f2f8',
                            bg: '#2e2c30'
                        }}/>

                        <StandardButton content={footerBtnContent}
                        bg={'#ad47ff'} color={'#ffffff'}
                        onClick={footerOnClick}
                        _active={{
                            color: '#e2dfe6',
                            bg: '#ca97ff'
                        }} 
                        _focusVisible={{
                            boxShadow: 'none',
                            outlineColor: '#f5f2f8'
                        }}
                        _hover={{
                            color: '#f5f2f8',
                            bg: '#bb73ff'
                        }}/>
                    </ButtonGroup>
                </ModalFooter>
                }
            </ModalContent>
        </Modal>
    )
}

export default StandardModal