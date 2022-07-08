// This is your entry file! Refer to it when you render:
// npx remotion render <entry-file> HelloWorld out/video.mp4

import "./style.css";

import { registerRoot } from "remotion";
import { RemotionVideo } from "./Video";

registerRoot(RemotionVideo);
