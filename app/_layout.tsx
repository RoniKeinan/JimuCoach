import { Ionicons } from "@expo/vector-icons";
import { Slot, usePathname, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RootLayout() {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const pages = [
    { name: "Home", route: "/", icon: "home-outline" },
    { name: "Workouts", route: "/workouts", icon: "barbell-outline" },
    { name: "Profile", route: "/profile", icon: "person-outline" },
  ];

  return (
    <View style={{ flex: 1, flexDirection: "row", marginBottom: insets.bottom + 33 }}>
      <View
        style={[
          styles.sidebar,
          expanded ? styles.sidebarExpanded : styles.sidebarCollapsed,
          {
            marginTop: insets.top + 6,
            marginBottom: insets.bottom,
            backgroundColor: expanded ? "#f5f5f5" : "transparent",
          },
        ]}
      >
        {/* toggle (same position in both states) */}
        <TouchableOpacity style={styles.toggleAnchor} onPress={() => setExpanded((v) => !v)}>
          <Ionicons
            name={expanded ? "chevron-back" : "menu"}
            size={32}                 // bigger icon
            color="#333"
          />
        </TouchableOpacity>

        {/* menu items (only when expanded) */}
        {expanded && (
          <View style={styles.menuItems}>
            {pages.map((page) => {
              const isActive = pathname === page.route;
              return (
                <TouchableOpacity
                  key={page.route}
                  style={[styles.menuItem, isActive && styles.menuItemActive]}
                  onPress={() => router.replace(page.route as any)}
                >
                  <Ionicons
                    name={page.icon as any}
                    size={22}
                    color={isActive ? "#1976d2" : "#333"}
                    style={{ marginRight: 10 }}
                  />
                  <Text style={[styles.menuText, isActive && styles.menuTextActive]}>{page.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>

      <View style={{ flex: 1 }}>
        <Slot />
      </View>
    </View>
  );
}

const TOGGLE_SIZE = 56;

const styles = StyleSheet.create({
  sidebar: {
    minHeight: "100%",
    alignItems: "flex-start",
    paddingTop: TOGGLE_SIZE + 8, // leave space for the absolute toggle so content won't overlap
  },
  sidebarExpanded: {
    width: 180,
  },
  sidebarCollapsed: {
    width: TOGGLE_SIZE,
    alignItems: "center",
  },
  // same position for menu and back icons
  toggleAnchor: {
    position: "absolute",
    top: 8,
    left: 0,
    width: TOGGLE_SIZE,
    height: TOGGLE_SIZE,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  menuItems: {
    width: "100%",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "100%",
  },
  menuText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  menuTextActive: {
    color: "#1976d2",
    fontWeight: "700",
  },
  menuItemActive: {
    backgroundColor: "#e3f2fd",
    borderLeftWidth: 4,
    borderLeftColor: "#1976d2",
  },
});
