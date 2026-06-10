import { Button, type HTMLChakraProps } from "@chakra-ui/react"

export interface IStandardButtonProps extends HTMLChakraProps<"button"> {
    content: string    
}

const StandardButton: React.FC<IStandardButtonProps> = ({ content, ...rest }) => {
    return (
        <Button {...rest}
        display={'inline-flex'} alignItems={'center'} justifyContent={'center'} gap={'0.25rem'}
        pos={'relative'} verticalAlign={'middle'}
        paddingInline={'1.5rem'} py={'0.75rem'}
        minH={'3rem'} minW={'3rem'} h={'auto'}
        fontSize={'16px'} fontWeight={'700'}
        whiteSpace={'nowrap'} lineHeight={'24px'} fontFamily={'Inter,Arial,sans-serif'} textDecor={'none'}
        borderRadius={'0.75rem'}
        outline={'transparent solid 2px'} outlineOffset={'0px'}
        transitionDuration={'200ms'} transitionProperty={'background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform'}
        appearance={'none'} userSelect={'none'} cursor={'pointer'}>
            <span>{content}</span>
        </Button>
    )
}

export default StandardButton