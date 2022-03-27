import { useNavigation } from "@react-navigation/native";
import { Box, Button, Center, Heading, VStack } from "native-base";
import React from "react";
import { FormItem } from "../../molecules/FormItem";

export const ConfirmSignUpForm = () => {
    const navigation = useNavigation();
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
                    Confirm SignUp
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
                    Confirm Sign up to continue!
                </Heading>
                <VStack space={3} mt="5">
                    <FormItem
                        isRequired
                        inputType="email"
                        label="Email"
                        onChange={(value) => {
                            // setFormData({ ...formData, username: value });
                            // validateUsername(value);
                        }}
                        // isInvalid={errorList["username"] !== ""}
                        // errorMessage={errorList["username"]}
                    />
                    <FormItem
                        isRequired
                        inputType="text"
                        label="Nickname"
                        onChange={(value) => {
                            // setFormData({
                            //     ...formData,
                            //     nickname: value,
                            // });
                            // validateNickname(value);
                        }}
                        // isInvalid={errorList["nickname"] !== ""}
                        // errorMessage={errorList["nickname"]}
                    />

                    <Button
                        // isLoading={isSignUpLoading}
                        onPress={() => navigation.goBack()}
                        mt="2"
                        colorScheme="indigo"
                    >
                        go back
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
};
