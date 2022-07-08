import { interpolate } from "remotion";
import { useCurrentFrame } from "remotion";
import { useVideoConfig } from "remotion";
import { FC } from "react";
// Import Lottie from "react-lottie-player";
import Lottie from "lottie-react";

interface CardProps {
  item: {
    name: string;
    animation: object;
    max: number;
    min: number;
  };
  index: number;
}

const Card: FC<CardProps> = ({ item, index }) => {
  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame();
  const currentFrame = useCurrentFrame();

  const delay = index * 10;
  const { durationInFrames } = videoConfig;

  const ANIMATION_DURATION = 20;

  // Translate the card to the left
  const transform = interpolate(
    frame,
    [delay, delay + ANIMATION_DURATION, durationInFrames],
    [1, 0, 0]
  );

  // Fade in and out the card
  const opacity = interpolate(
    frame,
    [
      delay,
      delay + ANIMATION_DURATION,
      durationInFrames - ANIMATION_DURATION - delay,
      durationInFrames - delay,
    ],
    [0, 1, 1, 0]
  );

  // Title, svg, temperatures animation with different delays
  const titleAnimation = interpolate(
    frame,
    [delay + 23, delay + 23 + ANIMATION_DURATION, durationInFrames],
    [1, 0, 0]
  );

  const svgAnimation = interpolate(
    frame,
    [delay + 31, delay + 31 + ANIMATION_DURATION, durationInFrames],
    [1, 0, 0]
  );

  const temperaturesAnimation = interpolate(
    frame,
    [delay + 39, delay + 39 + ANIMATION_DURATION, durationInFrames],
    [1, 0, 0]
  );

  const { op: animationFramesCount } = item.animation as { op: number };

  return (
    <div
      className="card"
      key={item.name}
      style={{
        transform: `translateX(${transform * 100}px)`,
        opacity,
      }}
    >
      <p
        style={{
          transform: `translateX(${titleAnimation * 40}px)`,
          opacity: 1 - titleAnimation,
        }}
        className="title"
      >
        {item.name}
      </p>
      <Lottie
        style={{
          transform: `translateX(${svgAnimation * 40}px)`,
          opacity: 1 - svgAnimation,
        }}
        loop
        animationData={item.animation}
        initialSegment={[
          currentFrame % animationFramesCount,
          (currentFrame % animationFramesCount) + 1,
        ]}
        className="lottie"
      />
      <div
        style={{
          transform: `translateX(${temperaturesAnimation * 40}px)`,
          opacity: 1 - temperaturesAnimation,
        }}
        className="temperatures"
      >
        <span className="max-temp">{item.max}˚</span>
        <span>{item.min}˚</span>
      </div>
    </div>
  );
};

export default Card;
