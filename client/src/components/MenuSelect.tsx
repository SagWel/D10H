import { Flex, Menu, MenuButton, MenuItem, MenuList, Portal, Text, Button, FormLabel } from "@chakra-ui/react"

/* Import SVG */
import type { SvgProps } from "./Svg"

export interface Item {
    id: string,
    label: string,
    icon: React.FC<SvgProps>
}

export interface IMenuSelectProps {
    label: string,
    listObject?: Item[],
    listString?: string[],
    itemObject?: Item | null,
    itemString?: string
    setItemObject?: React.Dispatch<React.SetStateAction<null | Item>>,
    setItemString?: React.Dispatch<React.SetStateAction<string>>
}

/* Menu to simulate Select balise */
const MenuSelect: React.FC<IMenuSelectProps> = ({ label, listObject, listString, itemObject, itemString, setItemObject, setItemString }) => {
    return (
        <Flex gridColumn={"span 1"} direction={"column"} background={"#ad47ff"} borderRadius={"0.5rem"}>
            <FormLabel htmlFor={label} 
            color={"#fdfcfe"} textAlign={"center"} 
            p={0} m={0}
            fontSize={"1.25rem"} fontWeight={"500"}>
                {label}
            </FormLabel>
            <Menu matchWidth>
                <MenuButton as={Button} name={label.toLowerCase()} id={label.toLowerCase()}
                variant={"outline"}
                mb={"0.75rem"} mx={"auto"}
                height={"1.25rem"} width={"75%"} textAlign={"center"}
                border={"none"} borderRadius={"none"} 
                background={"#141216"} color={"#fdfcfe"}
                _hover={{
                    bg: "#141216",
                    border: "#CBD5E0"
                }}
                _active={{
                    bg: "#141216",
                    boxShadow: "0 0 0 1px #fdfcfe",
                }}
                _focusVisible={{
                    zIndex: "1",
                    borderColor: "#4e4c51",
                }}>
                    { (listString) ? (
                        <Flex align={"center"} justify={"center"} w={"full"}>
                            <Text>{itemString}</Text>
                        </Flex>

                    ) : (listObject && itemObject) ? (
                        <Flex align={"center"} justify={"space-between"} w={"full"}>
                            <Text>{itemObject.label}</Text>
                            {<itemObject.icon pt={"5px"} />}
                        </Flex>
                    ) :
                    (
                        <Text></Text>
                    )}
                </MenuButton>
                <Portal>
                    <MenuList
                    w={"full"} minW={0} maxH={"200px"} 
                    bg={"#3e3d3f"} 
                    border={0} p={0}
                    overflowY={"auto"}>
                        {(setItemString && listString) ? (
                            <>
                            <MenuItem
                            bg={"transparent"} color={"#fdfcfe"}
                            onClick={() => setItemString('')}
                            _hover={{
                                bg: "#6e6c72"
                            }}
                            _focus={{
                                bg: "#6e6c72"
                            }}>
                                <Flex align={"center"} justify={"space-between"} w={"full"}>
                                    <Flex align={"center"} justify={"space-between"} w={"full"}>
                                        <Text>...</Text>
                                    </Flex>
                                </Flex>
                            </MenuItem>
                            {listString.map((i, index) => (
                                <MenuItem key={index}
                                bg={"transparent"} color={"#fdfcfe"}
                                onClick={() => setItemString(i)}
                                _hover={{
                                    bg: "#6e6c72"
                                }}
                                _focus={{
                                    bg: "#6e6c72"
                                }}>
                                    <Flex align={"center"} justify={"space-between"} w={"full"}>
                                        <Flex align={"center"} justify={"space-between"} w={"full"}>
                                            <Text>{i}</Text>
                                        </Flex>
                                    </Flex>
                                </MenuItem>
                            ))}
                            </>
                        ) : ( (listObject && setItemObject) &&
                            <>
                            <MenuItem
                            bg={"transparent"} color={"#fdfcfe"}
                            onClick={() => setItemObject(null)}
                            _hover={{
                                bg: "#6e6c72"
                            }}
                            _focus={{
                                bg: "#6e6c72"
                            }}>
                                <Flex align={"center"} justify={"space-between"} w={"full"}>
                                    <Flex align={"center"} justify={"space-between"} w={"full"}>
                                        <Text>...</Text>
                                    </Flex>
                                </Flex>
                            </MenuItem>
                            {listObject.map((i) => {
                                const Icon = i.icon;
                                return (
                                <MenuItem key={i.id}
                                bg={"transparent"} color={"#fdfcfe"}
                                onClick={() => setItemObject(i)}
                                _hover={{
                                    bg: "#6e6c72"
                                }}
                                _focus={{
                                    bg: "#6e6c72"
                                }}>
                                    <Flex align={"center"} justify={"space-between"} w={"full"}>
                                        <Flex align={"center"} justify={"space-between"} w={"full"}>
                                            <Text>{i.label}</Text>
                                            {<Icon pt={"5px"} />}
                                        </Flex>
                                    </Flex>
                                </MenuItem>
                                )
                            })}
                            </>
                        )}
                    </MenuList>
                </Portal>
            </Menu>
        </Flex>
    )
}

export default MenuSelect