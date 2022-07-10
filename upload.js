import { upload } from "youtube-videos-uploader";
import fs from "fs";
import dotenv from "dotenv";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale.js";
import fetch from "node-fetch";

dotenv.config();

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

try {
  const existingCredentials = await (
    await fetch(
      `https://kv-storage.naptest.workers.dev/?key=${process.env.YOUTUBE_CREDENTIALS_KEY}`
    )
  ).text();

  fs.mkdirSync("yt-auth", { recursive: true });

  fs.writeFileSync(
    `yt-auth/cookies-${process.env.EMAIL?.replace("@", "-")
      .split(".")
      .join("_")}.json`,
    existingCredentials
  );
} catch (_) {}

upload(
  {
    email: process.env.EMAIL,
    pass: process.env.PASSWORD,
    recoveryemail: process.env.RECOVERY_EMAIL,
  },
  [
    {
      path: "./out/video.mp4",
      title: `Dự báo thời tiết ${dayjs().format("dddd, DD/MM/YYYY")}`,
      description:
        "Video được tạo bởi remotion. Source code: https://github.com/napthedev/code-weather-videos.git",
    },
  ]
).then((res) => {
  console.log(res);
});
