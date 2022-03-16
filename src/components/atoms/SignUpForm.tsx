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
import * as yup from "yup";

import validator from "validator";
interface iSignUpFormData {
    username: string;
    password: string;
    nickname: string;
}

export const SignUpForm = () => {
    const [formData, setFormData] = useState<iSignUpFormData>({
        username: "",
        password: "",
        nickname: "",
    });
    let schema = yup.object().shape({
        password: yup
            .string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ),
        nickname: yup.string().min(4).max(10),
        username: yup.string(),
        // .required("Mail is required")
        // .test(
        //     "is-valid",
        //     (message) => `${message.path} is invalid`,
        //     (value) => {
        //         return true;
        //         // return value
        //         //     ? validator.isEmail(value)
        //         //     : new yup.ValidationError("Invalid value");
        //     }
        // ),
    });

    const [formError, setFormError] = useState<{
        [index: string]: { isInvalid: boolean | string; message: string };
    }>({
        username: { isInvalid: false, message: "" },
        nickname: { isInvalid: false, message: "" },
        password: { isInvalid: false, message: "" },
    });

    async function onSubmit() {
        setFormError({
            username: { isInvalid: false, message: "" },
            nickname: { isInvalid: false, message: "" },
            password: { isInvalid: false, message: "" },
        });
        schema
            .validate({
                ...formData,
            })
            .then(async function (valid) {
                console.log("this runs :>> ", valid);
                if (valid) {
                    // setErrorList({ ...errorList, ...initialErrorListValues });
                    try {
                        console.log("formData :>> ", formData);
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
                        console.log("error signing up:", error);
                        return ToastAndroid.show(
                            "A pikachu appeared nearby !",
                            ToastAndroid.SHORT
                        );
                    }
                } else {
                    console.log("errr");
                }
            })
            .catch((err) => {
                console.log("err", err, err.name, err.errors, err.path);
                setFormError({
                    ...formError,
                    [err.path]: { isInvalid: true, message: err.errors },
                });
            });
    }

    useEffect(() => {
        console.log("erorList", formError);
    }, [formError]);

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
                        }}
                        isInvalid={formError["username"].isInvalid as boolean}
                        errorMessage={formError["username"].message}
                    />
                    <FormItem
                        isRequired
                        inputType="text"
                        label="Nickname"
                        onChange={(value) =>
                            setFormData({
                                ...formData,
                                nickname: value,
                            })
                        }
                    />
                    <FormItem
                        isRequired
                        inputType="password"
                        label="Password"
                        onChange={(value) =>
                            setFormData({ ...formData, password: value })
                        }
                    />

                    <Button onPress={onSubmit} mt="2" colorScheme="indigo">
                        Sign up
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
};
