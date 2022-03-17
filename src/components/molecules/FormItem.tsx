import { FormControl, Input, WarningOutlineIcon } from "native-base";
import React from "react";

export const FormItem = ({
    label,
    inputType,
    onChange,
    isRequired,
    isInvalid,
    errorMessage,
}: {
    label: string;
    inputType: string;
    onChange: (text: string) => void;
    isRequired?: boolean;
    isInvalid?: boolean;
    errorMessage?: string | string[];
}) => {
    return (
        <FormControl isRequired isInvalid={isInvalid}>
            <FormControl.Label>{label}</FormControl.Label>
            <Input
                type={inputType}
                onChangeText={(value: string) => {
                    onChange(value);
                }}
            />
            {errorMessage && Array.isArray(errorMessage) ? (
                errorMessage.map((message, key) => {
                    return (
                        <FormControl.ErrorMessage
                            key={`${message}+${key}`}
                            leftIcon={<WarningOutlineIcon size="xs" />}
                        >
                            {message}
                        </FormControl.ErrorMessage>
                    );
                })
            ) : (
                <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                >
                    {errorMessage ?? ""}
                </FormControl.ErrorMessage>
            )}
        </FormControl>
    );
};
