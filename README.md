<h1 align="center" style="font-size: 60px">Weather with code</h1>

<p align="center"><strong>Code a weather video and upload to youtube daily</strong></p>

<p align="center">
  <img alt="Stars" src="https://badgen.net/github/stars/napthedev/code-weather-videos">
  <img alt="Forks" src="https://badgen.net/github/forks/napthedev/code-weather-videos">
  <img alt="Issues" src="https://badgen.net/github/issues/napthedev/code-weather-videos">
  <img alt="Commits" src="https://badgen.net/github/commits/napthedev/code-weather-videos">
</p>

## Live demo

YouTube Channel: [https://www.youtube.com/channel/UCWTdXsoIDIkYXQWstcVrlzg](https://www.youtube.com/channel/UCWTdXsoIDIkYXQWstcVrlzg)

## Setup Guide

- Go to [openweathermap.org](https://openweathermap.org/) and create a new api key, use as `REMOTION_API_KEY` env
- Set an unique id as `YOUTUBE_CREDENTIALS_KEY` for storing unique credentials for your account
- Run `npm i`
- Run `npm run upload` and wait for info about "Auth pending", go to verification_url using the browser which is logged in with the youtube account you want to upload and enter the user_code
- After it is done, the credentials should have been saved
- Create a new repository on github with the action secrets of the two envs
- Push the repo to github and it will publish a video every 0 AM UTC
