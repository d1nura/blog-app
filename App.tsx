import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, Center, Box } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "native-base";
import { Navbar } from "./src/components/Navbar";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "./src/components/Home";
import { Account } from "./src/components/Account";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const HeaderTitle = () => {
    return (
        <View>
            <Text>TItle</Text>
        </View>
    );
};

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
                            name="Home"
                            component={Home}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Tab.Screen
                            name="Account"
                            component={Account}
                            options={{
                                headerShown: false,
                            }}
                        />
                    </Tab.Navigator>

                    <Navbar />
                </View>
                {/* </View> */}

                {/* <View style={styles.container}>
                <Text>Open up App.tsx to start working on your app22</Text>
                <StatusBar style="auto" />
                <Button onPress={() => console.log("hello world")}>
                    Click Me
                </Button>
            </View> */}
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
