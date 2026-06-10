import { Button } from "@chakra-ui/react"
import type { ReactNode } from "react"

export interface IToolButtonProps {
    id: string,
    title: string,
    onClick: () => void
    children: ReactNode
}

const ToolButton: React.FC<IToolButtonProps> = ({ id, title, onClick, children }) => {
    return (
        <Button id={id} title={title}
        backgroundColor={"transparent"}
        padding={"0"}
        color={'#ffffff'}
        borderRadius={"full"} border={"solid 0.0625rem transparent"}
        height={"38px"} width={"24px"} minWidth={"38px"}
        onClick={onClick}
        _active={{
            borderColor: '#656367',
            bg: '#38373b',
            color: '#e2dfe6'
        }}
        _focusVisible={{
            boxShadow: 'none',
            borderColor: '#ad47ff',
            color: '#ad47ff'
        }}
        _hover={{
            borderColor: '#59575c',
            bg: '#2e2c30',
            color: '#f5f2f8'
        }}>
            {children}
        </Button>
    )
}

export default ToolButton