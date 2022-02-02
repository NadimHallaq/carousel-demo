import { useMemo, useRef } from 'react';
import { Animated } from 'react-native';

function useScrollOffset() {
  const xOffset = useRef(new Animated.Value(0));
  const yOffset = useRef(new Animated.Value(0));

  const onScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            x: xOffset.current,
            y: yOffset.current,
          },
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  return useMemo(() => {
    return {
      onScroll,
      xOffset: xOffset.current,
      yOffset: yOffset.current,
    };
  }, [onScroll]);
}

export default useScrollOffset;