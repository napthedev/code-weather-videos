import { FC } from "react";
import { Composition } from "remotion";
import Main from "./Main";

export const RemotionVideo: FC = () => {
  return (
    <>
      <Composition
        id="Main"
        component={Main}
        durationInFrames={1200}
        fps={60}
        width={1920}
        height={1080}
      />
    </>
  );
};
