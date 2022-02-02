import { memo, useContext } from "react";
import { Animated, Text, Image, StyleSheet, View } from "react-native";
import Carousel, { CarouselXOffsetContext } from "../components/Carousel";
import useWidthMinusGutter from "../hooks/useWidthMinusGutter";
import { getIndexInterpolatorParams } from "../utils/getIndexInterpolatorParams";

type CarouselItemProps = typeof data[number] & { index: number };
const pinnedTextHeight = 16;
const pinnedTabHeight = 32;

const data = [
  {
    id: "graffiti",
    title: "Street graphics",
    image: require("../assets/images/graffiti.jpg") as number,
    numOfAnswers: 49,
    day: "Thursday",
  },
  {
    id: "flower",
    title: "Draw on everything",
    image: require("../assets/images/flowers.jpg") as number,
    numOfAnswers: 30,
    day: "Friday",
  },
  {
    id: "bright",
    title: "Bright things",
    image: require("../assets/images/bright.jpg") as number,
    numOfAnswers: 25,
    day: "Saturday",
  },
] as const;

const CarouselItem = memo(function CarouselItem({
  image,
  title,
}: CarouselItemProps) {
  const width = useWidthMinusGutter();
  return (
    <View style={{ width }}>
      <View style={styles.titleContent}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, styles.overlay]}
      />
      <Image style={{ width, height: "100%" }} source={image} />
    </View>
  );
});

const AnswerText = memo(function AnswerText({
  index,
  numOfAnswers,
}: CarouselItemProps) {
  const width = useWidthMinusGutter();
  const xOffset = useContext(CarouselXOffsetContext);
  const { inputRange, outputRange } = getIndexInterpolatorParams({
    length: data.length,
    multiplier: width,
    index,
    getOutputRange: ({ activeIndex, index }) => {
      if (index < activeIndex) return -pinnedTextHeight;
      if (index > activeIndex) return pinnedTextHeight;
      return 0;
    },
  });
  return (
    <Animated.Text
      style={[
        styles.answerText,
        styles.pinnedText,
        {
          transform: [
            {
              translateY: xOffset.interpolate({ inputRange, outputRange }),
            },
          ],
        },
      ]}
    >
      {`${numOfAnswers}`}
    </Animated.Text>
  );
});

const AnimatedTab = memo(function AnimatedTab({
  day,
  index,
}: CarouselItemProps) {
  const width = useWidthMinusGutter();
  const xOffset = useContext(CarouselXOffsetContext);
  const { inputRange: opacityInputRange, outputRange: opacityOutputRange } =
    getIndexInterpolatorParams({
      length: data.length,
      multiplier: width,
      index,
      getOutputRange: ({ activeIndex, index }) => {
        return activeIndex === index ? 0 : 1;
      },
    });

  const {
    inputRange: translateYInputRange,
    outputRange: translateYOutputRange,
  } = getIndexInterpolatorParams({
    length: data.length,
    multiplier: width,
    index,
    getOutputRange: ({ activeIndex, index }) => {
      return activeIndex === index ? 0 : -pinnedTabHeight;
    },
  });

  const {
    inputRange: borderRadiusInputRange,
    outputRange: borderRadiusOutputRange,
  } = getIndexInterpolatorParams({
    length: data.length,
    multiplier: width,
    index,
    getOutputRange: ({ activeIndex, index }) => {
      return activeIndex === index ? 16 : 0;
    },
  });

  return (
    <Animated.View
      style={{
        width: `${100 / data.length}%`,
        borderBottomLeftRadius: 0,
        zIndex: 3,
      }}
    >
      <Animated.Text
        style={[
          styles.pinnedText,
          {
            textAlign: "center",
            lineHeight: pinnedTabHeight,
            transform: [
              {
                translateY: xOffset.interpolate({
                  inputRange: translateYInputRange,
                  outputRange: translateYOutputRange,
                }),
              },
            ],
          },
        ]}
      >
        {day}
      </Animated.Text>
      <Animated.View
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: "white",
          height: pinnedTabHeight,
          opacity: xOffset.interpolate({
            inputRange: opacityInputRange,
            outputRange: opacityOutputRange,
          }),
          width: "100%",
        }}
      />
    </Animated.View>
  );
});

const CarouselPinnedContent = memo(function CarouselPinnedContent() {
  return (
    <>
      <View pointerEvents="none" style={styles.pinnedTextContent}>
        <Text style={styles.pinnedText}>{"Answers: "}</Text>
        <View style={styles.answerTextContainer}>
          {data.map((item, index) => (
            <AnswerText key={item.id} index={index} {...item} />
          ))}
        </View>
      </View>
      <View pointerEvents="none" style={styles.pinnedTabContent}>
        {data.map((item, index) => (
          <AnimatedTab key={item.id} index={index} {...item} />
        ))}
      </View>
    </>
  );
});

const items = data.map((item, index) => (
  <CarouselItem key={item.id} index={index} {...item} />
));

const Demo = () => {
  return (
    <Carousel items={items}>
      <CarouselPinnedContent />
    </Carousel>
  );
};

const styles = StyleSheet.create({
  pinnedTextContent: {
    ...StyleSheet.absoluteFillObject,
    top: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    zIndex: 2,
    overflow: "hidden",
    height: pinnedTextHeight,
  },
  pinnedTabContent: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    zIndex: 2,
    flexDirection: "row",
    height: pinnedTabHeight,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 2,
  },
  pinnedText: {
    color: "white",
    textAlign: "left",
    fontFamily: "RobotoMono_400Regular",
  },
  answerText: {
    position: "absolute",
    height: pinnedTextHeight,
  },
  answerTextContainer: {
    height: pinnedTextHeight,
  },
  titleContent: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
    bottom: pinnedTabHeight + 16,
  },
  title: {
    textAlign: "center",
    color: "white",
    fontFamily: "RobotoCondensed_400Regular",
    fontSize: 32,
  },
});

export default Demo;
