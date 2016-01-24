Youtube Finder
=============

Simple tool to find youtube musics from a list of music titles.

Demo
-------------

You can find a demo at http://code.nanakii.fr/youtube-finder

Todo
-------------

- Switch between videos (if the first video is incorrect / doesn't match the music)
- Add the possibility to add the youtube video to a playlist
- Add the possibility to save the video to mp3 (via an external service)

How to install
-------------

Clone the repo, install the packages :
```bash
$ npm install
```

Copy **js/loadApi.js.dist** to **js/loadApi.js**, and edit it to put your **Youtube Data API key** (which you can generate [here](https://console.developers.google.com/)).

Then, open index.html.

Changelog
-------------

### 1.0

- Retrieve videos from a list of music title
- Youtube musics can be played in a lightbox (prettyPhoto)