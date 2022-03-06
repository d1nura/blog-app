import { NativeBaseProvider, Center, Box } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import { Navbar } from "./src/components/Navbar";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "./src/components/Home";
import { Account } from "./src/components/Account";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Search } from "./src/components/Search";

const HeaderTitle = () => {
    return (
        <View>
            <Text>TItle</Text>
        </View>
    );
};

export enum ComponentNames {
    Account = "Account",
    Home = "Home",
    Search = "Search",
    Create = "Create",
}

export default function App() {
    const Tab = createBottomTabNavigator();
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                {/* <View> */}
                <View style={styles.container}>
                    <Tab.Navigator
                        screenOptions={{ tabBarStyle: { display: "none" } }}
                    >
                        <Tab.Screen
                            name={ComponentNames.Home}
                            component={Home}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Tab.Screen
                            name={ComponentNames.Account}
                            component={Account}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Tab.Screen
                            name={ComponentNames.Search}
                            component={Search}
                            options={{
                                headerShown: false,
                            }}
                        />
                    </Tab.Navigator>

                    <Navbar />
                </View>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: "100%",
        backgroundColor: "white",
        // alignItems: "center",
        // justifyContent: "space-between",
        paddingTop: 10,
        // borderWidth: 2,
        // borderColor: "red",
    },
});
