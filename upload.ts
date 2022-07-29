/* eslint-env node */

import { Innertube, UniversalCache } from "@napthedev/youtubei.js";
import fs from "fs";
import dotenv from "dotenv";
import axios from "axios";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale.js";
import path from "path";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dotenv.config();

dayjs.extend(updateLocale);
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Asia/Saigon");

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

const updateCredentials = (credentials: object) =>
  axios
    .post(
      `https://kv-storage.naptest.workers.dev/?key=${process.env.YOUTUBE_CREDENTIALS_KEY}`,
      JSON.stringify(credentials),
      {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
        },
      }
    )
    .catch((err) => {
      console.log("Failed to update credentials", err);
    });

(async () => {
  let existingCredentials: { [key: string]: string } | undefined;
  await axios(
    `https://kv-storage.naptest.workers.dev/?key=${process.env.YOUTUBE_CREDENTIALS_KEY}`
  )
    .then(async (res) => {
      if (res.status === 200) {
        const json = (
          typeof res.data === "string" ? JSON.parse(res.data) : res.data
        ) as { [key: string]: string };

        if (json.refresh_token) {
          existingCredentials = json;
        }
      }
    })
    .catch(() => null);

  const yt = await Innertube.create({ cache: new UniversalCache() });

  yt.session.on("auth", (data) => {
    console.log("Successfully logged in:", data);
    updateCredentials(data.credentials);
  });
  yt.session.on("update-credentials", (data) => () => {
    console.log("Credentials updated");
    updateCredentials(data.credentials);
  });
  yt.session.on("auth-pending", (data) => console.log("Auth pending", data));
  yt.session.on("auth-error", () => {
    throw new Error("Auth error");
  });

  await yt.session.signIn(
    existingCredentials
      ? {
          access_token: existingCredentials.access_token,
          refresh_token: existingCredentials.refresh_token,
          expires: new Date(existingCredentials.expires),
        }
      : undefined
  );

  const info = await yt.account.getInfo();

  if (!info) {
    throw new Error("Cannot fetch account info");
  }

  const file = fs.readFileSync(path.resolve(__dirname, "out", "video.mp4"));

  const upload = await yt.studio.upload(file, {
    title: `Dự báo thời tiết ${dayjs().format("dddd, DD/MM/YYYY")}`,
    description:
      "Video được tạo bởi remotion. Source code: https://github.com/napthedev/code-weather-videos.git",
    privacy: "PUBLIC",
  });

  console.log("Video successfully uploaded", upload);
  process.exit(0);
})();
