# Website Downloader 💾🕸️

Download any website including assets!

![Preview](https://github.com/alexanderroidl/website-downloader/blob/main/public/Record.gif?raw=true)

# Table Of Contents 📒

- [1. Quick Start ⚡](#1-quick-start-)
- [2. How it works ⚙️](#2-how-it-works-)
- [3. Attributions 🤝](#3-attributions-)

## 1. Quick Start ⚡

```sh
$ git clone https://github.com/alexanderroidl/website-downloader.git
```

```sh
$ cd website-downloader
```

```sh
$ npm start
```

## 2. How it works ⚙️

`Website Downloader` works by using `wget` to download a website's assets and `archiver` to compress them while communicating via a HTTP API and Websockets.

**`wget` is being used like so:**

`wget --mirror --convert-links --adjust-extension --page-requisites 
--no-parent http://example.org`

| Flag               | Description                                                                          |
| ------------------ | ------------------------------------------------------------------------------------ |
| --mirror           | To download recursively.                                                             |
| --convert-links    | Convert all links to relative links, to make them suitable for offline presentation. |
| --adjust-extension | Add suitable extensions to filenames based on their MIME types.                      |
| --page-requisites  | Download assets required to properly display the page offline.                       |
| --no-parent        | When recursing do not ascend to the parent directory.                                |

## 3. Attributions 🤝

- [Original Website-Downloader](https://github.com/AhmadIbrahiim/Website-downloader) by [Ahmad Ibrahiim](https://github.com/AhmadIbrahiim). License: [MIT](https://raw.githubusercontent.com/AhmadIbrahiim/Website-downloader/master/LICENSE.md)
- Floppy emoji designed by [OpenMoji](https://openmoji.org/). License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/#)
