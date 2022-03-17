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
import { useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import { FormItem } from "../molecules/FormItem";
import {
    isFieldEmpty,
    isSpecialCharsThere,
    isValidEmail,
    isValidLength,
    isValidPassword,
} from "../FormValidations/validations";
import validator from "validator";

interface iSignUpFormData {
    username: string;
    password: string;
    nickname: string;
}

export const SignUpForm = () => {
    const [formData, setFormData] = useState<iSignUpFormData>({
        password: "",
        nickname: "",
        username: "",
    });

    const [errorList, setErrorList] = useState<{
        username: string;
        nickname: string;
        password: string[] | string;
    }>({
        username: "",
        nickname: "",
        password: "",
    });

    const validateNickname = (value: string) => {
        setErrorList({ ...errorList, nickname: "" });

        if (isSpecialCharsThere(value)) {
            setErrorList({
                ...errorList,
                nickname: "Speacial characters not allowed",
            });
            return false;
        } else if (!isValidLength(value)) {
            setErrorList({
                ...errorList,
                nickname: "Character length should be between 2 and 10",
            });
            return false;
        }
        return true;
    };

    const validateUsername = (value: string) => {
        setErrorList({ ...errorList, username: "" });

        if (!isValidEmail(value)) {
            setErrorList({
                ...errorList,
                username: "Should be a valid email",
            });
            return false;
        }
        return true;
    };

    const validatePassword = (value: string) => {
        setErrorList({ ...errorList, password: "" });

        const [
            lowerCaseLetterPresent,
            upperCaseLetterPresent,
            numberPresent,
            specialLetterPresent,
            validLength,
        ] = isValidPassword(value);

        if (
            !lowerCaseLetterPresent ||
            !upperCaseLetterPresent ||
            !numberPresent ||
            !specialLetterPresent ||
            !validLength
        ) {
            setErrorList({
                ...errorList,
                password: [
                    !validLength ? "Min length 8 & Max length 10" : "",
                    !lowerCaseLetterPresent
                        ? "Atleast one Lowercase letter"
                        : "",
                    !upperCaseLetterPresent
                        ? "Atleast one  Uppercase letter"
                        : "",
                    !numberPresent ? "Atleast one number" : "",
                    !specialLetterPresent
                        ? "Atleast one speacial character"
                        : "",
                ],
            });
            return false;
        }
        return true;
    };

    const validate = (formData: any) => {
        for (const formDataItem in formData) {
            if (isFieldEmpty(formData[formDataItem])) {
                setErrorList((p) => {
                    return {
                        ...p,
                        [formDataItem]: "Please enter a value",
                    };
                });
                return false;
            } else {
                if (formDataItem === "username") {
                    return validateUsername(formData[formDataItem]);
                } else if (formDataItem === "nickname") {
                    return validateNickname(formData[formDataItem]);
                } else if (formDataItem === "password") {
                    return validatePassword(formData[formDataItem]);
                }
                // return true;
            }
        }
    };

    async function onSubmit() {
        // setErrorList({ ...errorList, ...initialErrorListValues });
        try {
            validate(formData);

            console.log("object :>> ", validate(formData));
            // console.log("formData :>> ", formData);
            // const { user } = await Auth.signUp({
            //     username: formData.username,
            //     password: formData.password,
            //     attributes: {
            //         email: formData.username,
            //         nickname: formData.nickname,
            //     },
            // });
            // console.log("user", user);
        } catch (error) {
            // console.log("error signing up:", error);
            return ToastAndroid.show(
                "A pikachu appeared nearby !",
                ToastAndroid.SHORT
            );
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
                    <FormItem
                        isRequired
                        inputType="email"
                        label="Email"
                        onChange={(value) => {
                            setFormData({ ...formData, username: value });
                            validateUsername(value);
                        }}
                        isInvalid={errorList["username"] !== ""}
                        errorMessage={errorList["username"]}
                    />
                    <FormItem
                        isRequired
                        inputType="text"
                        label="Nickname"
                        onChange={(value) => {
                            setFormData({
                                ...formData,
                                nickname: value,
                            });
                            validateNickname(value);
                        }}
                        isInvalid={errorList["nickname"] !== ""}
                        errorMessage={errorList["nickname"]}
                    />
                    <FormItem
                        isRequired
                        inputType="password"
                        label="Password"
                        onChange={(value) => {
                            setFormData({ ...formData, password: value });
                            validatePassword(value);
                        }}
                        isInvalid={errorList["password"] !== ""}
                        errorMessage={errorList["password"]}
                    />

                    <Button onPress={onSubmit} mt="2" colorScheme="indigo">
                        Sign up
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
};
