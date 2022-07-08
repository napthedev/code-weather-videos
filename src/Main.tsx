import { interpolate } from "remotion";
import { useEffect } from "react";
import { continueRender, Series } from "remotion";
import { useCallback } from "react";
import { delayRender } from "remotion";
import { useState } from "react";
import { Audio } from "remotion";
import { FC } from "react";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";

import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import Card from "./Card";
import { getWeatherData } from "./services";

dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  weekdays: [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ],
});

const Main: FC = () => {
  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame();

  const { durationInFrames } = videoConfig;

  const [data, setData] = useState<
    | {
        name: string;
        max: number;
        min: number;
        animation: object;
      }[]
    | null
  >(null);

  // Delay the render until the weather data is loaded
  const [handle] = useState(() => delayRender());

  const fetchData = useCallback(async () => {
    const response = await getWeatherData();

    setData(response);

    continueRender(handle);
  }, [handle]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {/* Background music */}
      <Audio
        src={staticFile("/weather-forecast.m4a")}
        startFrom={0}
        endAt={videoConfig.durationInFrames}
      />

      {/* Background image */}
      <AbsoluteFill>
        <Img
          className="bg-img"
          src={staticFile("/bg.webp")}
          width="100%"
          height="100%"
        />
      </AbsoluteFill>

      <AbsoluteFill className="container">
        {(() => {
          // Fade in and translate animation for header
          const opacity = interpolate(
            frame,
            [0, 20, durationInFrames - 40, durationInFrames],
            [0, 1, 1, 0]
          );
          const transform = interpolate(
            frame,
            [0, 20, durationInFrames],
            [1, 0, 0]
          );

          return (
            <div
              style={{
                transform: `translateX(${transform * 100}px)`,
                opacity,
              }}
              className="header"
            >
              <div>Dự báo thời tiết</div>
              <p>{dayjs().format("dddd, DD/MM/YYYY")}</p>
            </div>
          );
        })()}

        <div className="cards-container">
          <Series>
            {/* Split data array into group of 5 */}
            {data &&
              Array.from(new Array(Math.ceil(data.length / 5)), (_, i) =>
                data.slice(i * 5, i * 5 + 5)
              ).map((group, index) => (
                <Series.Sequence durationInFrames={400} key={index}>
                  <div className="cards">
                    {group.map((item, index) => (
                      <Card item={item} index={index} key={item.name} />
                    ))}
                  </div>
                </Series.Sequence>
              ))}
          </Series>
        </div>
      </AbsoluteFill>
    </>
  );
};

export default Main;
