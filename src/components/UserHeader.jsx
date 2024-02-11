import { Avatar, Box, Flex, VStack, Text, Center, Link } from "@chakra-ui/react"

const UserHeader = () => {
    return (
        <VStack gap={4} alignItems={'start'}>
            <Flex justifyContent={"space-between"} w={'full'}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                        NSBM GREEN UNIVERSITY
                    </Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>NSBM GREEN UNIVERSITY</Text>
                        <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>
                            threads.net
                        </Text>
                    </Flex>
                </Box>
                <Box>
                    <Avatar
                        name="Mark Zuzerburg"
                        src="/zuck-avatar.png"
                        size={"xl"}
                    />
                </Box>

            </Flex>
            <Text>
                Co-Founder | Developer | Engineer
            </Text>
            <Flex w={'full'} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"Center"}>
                    <Text color={"gray.light"}> 3.2k followers</Text>
                    <Box w="1" height="1" bg={"gray.light"} borderRadius={"full"}></Box>
                    <Link color={"gray.light"}>instagram.com</Link>
                </Flex>
                <Flex gap={2} alignItems={"Center"}></Flex>

            </Flex>
        </VStack>
    )
}

export default UserHeader
