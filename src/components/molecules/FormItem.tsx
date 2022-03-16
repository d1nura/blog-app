import { FormControl, Input, WarningOutlineIcon } from "native-base";
import React, { useState } from "react";
import * as yup from "yup";

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
    errorMessage?: string;
}) => {
    // console.log("first", isInvalid, errorMessage);
    return (
        <FormControl isRequired isInvalid={isInvalid}>
            <FormControl.Label>{label}</FormControl.Label>
            <Input
                type={inputType}
                onChangeText={(value: string) => {
                    onChange(value);
                }}
            />
            <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
            >
                {errorMessage ?? ""}
            </FormControl.ErrorMessage>
        </FormControl>
    );
};
