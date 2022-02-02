import { useWindowDimensions } from "react-native";

const gutter = 16;
const totalGutter = gutter * 2;

function useWidthMinusGutter() {
  const { width } = useWindowDimensions();
  return width - totalGutter;
}

export default useWidthMinusGutter;