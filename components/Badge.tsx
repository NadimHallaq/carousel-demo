import { memo } from "react";
import { StyleSheet, View } from "react-native";
import Text from "./Text";

export type BadgeProps = {
  variant?: "secondary";
  children: string;
};

const Badge = memo(function Badge({
  children,
  variant = "secondary",
}: BadgeProps) {
  return (
    <View style={[styles.container, styles[variant]]}>
      <Text mono uppercase>
        {children}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  secondary: {
    backgroundColor: "gray",
  },
});

Badge.displayName = "Badge";
export default Badge;
