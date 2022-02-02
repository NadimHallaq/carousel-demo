import { Children, createContext, memo, ReactNode, useMemo } from "react";
import { Animated } from "react-native";
import useWidthMinusGutter from "../hooks/useWidthMinusGutter";
import useScrollOffset from "../hooks/useScrollOffset";
import Card from "./Card";

export const CarouselXOffsetContext = createContext<Animated.Value>(
  new Animated.Value(0)
);

type CarouselProps = {
  items: React.ReactElement[];
  children?: ReactNode;
};

const Carousel = memo(function Carousel({ items, children }: CarouselProps) {
  const { onScroll, xOffset } = useScrollOffset();
  const itemLength = Children.count(items);
  const itemWidth = useWidthMinusGutter();

  const interpolateIndex = useMemo(
    () =>
      xOffset,
    [xOffset]
  );

  return (
    <CarouselXOffsetContext.Provider value={xOffset}>
      <Card fullWidth>
        {children}
        <Animated.ScrollView
          decelerationRate="fast"
          horizontal
          // ref={scrollRefCb}
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToInterval={itemWidth}
          onScroll={onScroll}
        >
          {items}
        </Animated.ScrollView>
        <Animated.ScrollView horizontal>{children}</Animated.ScrollView>
      </Card>
    </CarouselXOffsetContext.Provider>
  );
});

Carousel.displayName = "Carousel";
export default Carousel;
