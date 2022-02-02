import { memo } from "react";
import { Text as ReactNativeText, TextStyle } from "react-native";
import memoize from "../utils/memoize";

type TextStylisticProps = {
  mono?: boolean;
  center?: boolean;
  uppercase?: boolean;
};

type TextProps = {
  children: string;
} & TextStylisticProps;

export const getTextStyles = memoize(function getTextStyles({
  mono,
  center,
  uppercase,
}: TextStylisticProps) {
  const styles: TextStyle = {};
  if (mono) {
    styles.fontFamily = "RobotoMono_400Regular";
  }
  if (center) {
    styles.textAlign = "center";
  }
  if (uppercase) {
    styles.textTransform = "uppercase";
  }
  return styles;
});

const Text = memo(function Text({
  children,
  mono,
  center,
  uppercase,
}: TextProps) {
  return (
    <ReactNativeText style={getTextStyles({ mono, center, uppercase })}>
      {children}
    </ReactNativeText>
  );
});

Text.displayName = "Text";
export default Text;
