import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        // Give the bar more room so labels aren't cropped
        tabBarStyle: { height: 64, paddingTop: 6, paddingBottom: 10 },
        // Make labels fit better
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
        tabBarItemStyle: { paddingVertical: 2 },
        tabBarIcon: ({ focused, size, color }) => {
          let icon: keyof typeof Ionicons.glyphMap = "home-outline";
          if (route.name === "index") icon = focused ? "home" : "home-outline";
          if (route.name === "workouts") icon = focused ? "barbell" : "barbell-outline";
          if (route.name === "profile") icon = focused ? "person" : "person-outline";
          return <Ionicons name={icon} size={size} color={color} />;
        },
        // If labels are still getting cut on some devices, render a custom label:
        tabBarLabel: ({ focused, color }) => {
          const text =
            route.name === "index" ? "Home" :
            route.name === "workouts" ? "Workouts" :
            "Profile";
          return (
            <Text
              style={{ color, fontSize: 12, fontWeight: focused ? "700" : "600" }}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {text}
            </Text>
          );
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="workouts" options={{ title: "Workouts" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
