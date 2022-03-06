import {
    Center,
    Box,
    Heading,
    VStack,
    FormControl,
    Input,
    Button,
} from "native-base";
import { Auth } from "aws-amplify";

export const SignUpForm = () => {
    // async function signUp() {
    //     try {
    //         const { user } = await Auth.signUp({
    //             username,
    //             password,
    //             attributes: {
    //                 email,          // optional
    //                 phone_number,   // optional - E.164 number convention
    //                 // other custom attributes
    //             }
    //         });
    //         console.log(user);
    //     } catch (error) {
    //         console.log('error signing up:', error);
    //     }
    // }
    return (
        <Center w="100%">
            <Box safeArea p="2" w="90%" maxW="290" py="8">
                <Heading
                    size="lg"
                    color="coolGray.800"
                    _dark={{
                        color: "warmGray.50",
                    }}
                    fontWeight="semibold"
                >
                    Welcome
                </Heading>
                <Heading
                    mt="1"
                    color="coolGray.600"
                    _dark={{
                        color: "warmGray.200",
                    }}
                    fontWeight="medium"
                    size="xs"
                >
                    Sign up to continue!
                </Heading>
                <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input type="password" />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Confirm Password</FormControl.Label>
                        <Input type="password" />
                    </FormControl>
                    <Button mt="2" colorScheme="indigo">
                        Sign up
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
};
