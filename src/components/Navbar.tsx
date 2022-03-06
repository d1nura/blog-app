import { useState } from "react";
import { Center, HStack, Pressable, Icon, Text } from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface iNavbarItem {
    selectedNo: number;
    title: string;
    icon: any;
    selected: number;
    setSelected: React.Dispatch<React.SetStateAction<number>>;
    navigation?: any;
}

const NavbarItem = ({
    selected,
    setSelected,
    icon,
    title,
    selectedNo,
    navigation,
}: iNavbarItem) => {
    return (
        <Pressable
            // cursor="pointer"
            opacity={selected === selectedNo ? 1 : 0.5}
            py="3"
            flex={1}
            onPress={() => {
                setSelected(selectedNo);
                navigation.navigate(title);
            }}
        >
            <Center>
                <Icon
                    mb="1"
                    as={<MaterialCommunityIcons name={icon} />}
                    color="white"
                    size="sm"
                />
                <Text color="white" fontSize="12">
                    {title}
                </Text>
            </Center>
        </Pressable>
    );
};

export const Navbar = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(1);
    const navBarItemsArray: iNavbarItem[] = [
        {
            title: "Home",
            icon: "home",
            selected,
            setSelected,
            selectedNo: 1,
        },
        {
            title: "Search",
            icon: "view-list",
            selected,
            setSelected,
            selectedNo: 2,
        },
        {
            title: "Create",
            icon: "plus",
            selected,
            setSelected,
            selectedNo: 3,
        },
        {
            title: "Account",
            icon: "account",
            selected,
            setSelected,
            selectedNo: 4,
        },
    ];
    return (
        <HStack h={20} bg="black" alignItems="center" safeAreaBottom shadow={6}>
            {navBarItemsArray.map((navItem: iNavbarItem) => {
                return (
                    <NavbarItem
                        navigation={navigation}
                        key={navItem.selectedNo}
                        {...navItem}
                    />
                );
            })}
        </HStack>
    );
};
