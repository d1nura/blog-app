import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import { AccountScreenNames } from "../navigationRoutes";
import { ConfirmSignUpForm } from "./Pages/Authentication/ConfirmSignUpForm";
import { SignUpForm } from "./Pages/Authentication/SignUpForm";

export const Account = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName={AccountScreenNames.SignUpForm}
            screenOptions={{ tabBarStyle: { display: "none" } }}
        >
            <Tab.Screen
                name={AccountScreenNames.SignUpForm}
                component={SignUpForm}
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name={AccountScreenNames.ConfirmSignUpForm}
                component={ConfirmSignUpForm}
                options={{
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
};
