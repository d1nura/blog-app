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

    const [isSignUpLoading, setIsSignUpLoading] = useState(false);

    const validateNickname = (value: string) => {
        setErrorList({ ...errorList, nickname: "" });

        if (isSpecialCharsThere(value)) {
            setErrorList({
                ...errorList,
                nickname: "Speacial characters not allowed",
            });
        } else if (!isValidLength(value)) {
            setErrorList({
                ...errorList,
                nickname: "Character length should be between 2 and 10",
            });
        }
        // return true;
    };

    const validateUsername = (value: string) => {
        setErrorList({ ...errorList, username: "" });

        if (!isValidEmail(value)) {
            setErrorList({
                ...errorList,
                username: "Should be a valid email",
            });
        }
        // return true;
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
        }
        // return true;
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
            } else {
                if (formDataItem === "username") {
                    validateUsername(formData[formDataItem]);
                } else if (formDataItem === "nickname") {
                    validateNickname(formData[formDataItem]);
                } else if (formDataItem === "password") {
                    validatePassword(formData[formDataItem]);
                }
            }
        }

        return Object.keys(errorList).map((key: string) =>
            (errorList as any)[key] === "" ? true : false
        );
    };

    async function onSubmit() {
        if (validate(formData).findIndex((item) => !item) === -1) {
            setIsSignUpLoading(true);
            try {
                // console.log("object :>> ", validate(formData));
                // console.log("formData :>> ", formData);
                const { user } = await Auth.signUp({
                    username: formData.username,
                    password: formData.password,
                    attributes: {
                        email: formData.username,
                        nickname: formData.nickname,
                    },
                });
                console.log("user", user);
                setIsSignUpLoading(false);
            } catch (error: any) {
                console.log("error signing up:", error.message);
                setIsSignUpLoading(false);
                return ToastAndroid.show(error.message, ToastAndroid.TOP);
            }
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

                    <Button
                        isLoading={isSignUpLoading}
                        onPress={onSubmit}
                        mt="2"
                        colorScheme="indigo"
                    >
                        Sign up
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
};
