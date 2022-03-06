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
import { useState } from "react";

interface iSignUpFormData {
    username: string;
    password: string;
    confirmPassword: string;
}

export const SignUpForm = () => {
    const [formData, setFormData] = useState<iSignUpFormData>({
        username: "",
        password: "",
        confirmPassword: "",
    });
    async function onSubmit() {
        try {
            console.log("formData :>> ", formData);
            const { user } = await Auth.signUp({
                username: "formData.username",
                password: formData.password,
                attributes: {
                    email: formData.username,
                },
            });
            console.log("user", user);
        } catch (error) {
            console.log("error signing up:", error);
        }
    }
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
                    <FormControl isRequired>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input
                            onChangeText={(value: string) =>
                                setFormData({ ...formData, username: value })
                            }
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input
                            type="password"
                            onChangeText={(value: string) =>
                                setFormData({ ...formData, password: value })
                            }
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>Confirm Password</FormControl.Label>
                        <Input
                            type="password"
                            onChangeText={(value: string) =>
                                setFormData({
                                    ...formData,
                                    confirmPassword: value,
                                })
                            }
                        />
                    </FormControl>
                    <Button onPress={onSubmit} mt="2" colorScheme="indigo">
                        Sign up
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
};
