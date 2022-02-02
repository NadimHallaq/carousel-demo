import { memo, ReactNode } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import Badge from "./Badge";
import useWidthMinusGutter from "../hooks/useWidthMinusGutter";

export type CardProps = {
  badge?: string;
  fullWidth?: boolean;
  children: ReactNode;
};

const Card = memo(function Card({ children, badge, fullWidth }: CardProps) {
  const width = useWidthMinusGutter();
  return (
    <View style={[styles.container, fullWidth && { width }]}>
      {badge ? <Badge>{badge}</Badge> : null}
      {children}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 400,
    overflow: "hidden",
    borderRadius: 24,
  },
});

Card.displayName = "Card";
export default Card;
