'use strict';

class YoutubeList {
  constructor() {
    this.add = document.querySelector('#add-btn');
    this.clear = document.querySelector('#clear-all');
    this.url = document.querySelector('#add-video');
    this.videoList = document.querySelector('#yt-list');
    this.savedList = localStorage.getItem('yt-list');
  }

  init() {
    this.createYoutubeAPIframe();
    let ytAPIready = new Promise((resolve, reject) => {
      function apiReady() {
        !(typeof(YT) == 'undefined') ? resolve(YT) : setTimeout(() => {
          apiReady();
        }, 100);
      }
      apiReady();
    })

    ytAPIready
      .then(() => {
        this.generateSavedList();
        this.generateNewVideo();
        this.clearList();
      })
      .catch(e => console.error(e));
  }

  createMarkup(ytLink) {
    let item = document.createElement('li');
    item.innerHTML = `<div id=${ytLink}></div>`;
    this.videoList.appendChild(item);
    this.onYouTubeIframeAPIReady(ytLink);
  }

  generateSavedList() {
    if (!this.savedList) return;
    let videoList = this.savedList.split(',');
    for (let url of videoList) {
      this.createMarkup(url);
    }
  }

  getUrl() {
    if (!this.url.value) return false;
    try {
      let url = new URL(this.url.value);
      return url.searchParams.get('v');
    } catch {
      return false;
    }
  }

  generateNewVideo() {
    this.add.addEventListener('click', () => {
      let ytLink = this.getUrl();
      if (!ytLink) {
        this.url.classList.remove('already-exist');
        this.url.classList.add('error', 'incorrect-link');
        return;
      }
      if (this.savedList && this.savedList.indexOf(ytLink) > -1) {
        this.url.classList.remove('incorrect-link');
        this.url.classList.add('error', 'already-exist');
        return;
      }
      this.url.classList.remove('error', 'incorrect-link', 'already-exist');
      this.url.value = '';
      this.createMarkup(ytLink);
      this.savedList = this.savedList ? [this.savedList, ytLink] : ytLink;
      localStorage.setItem("yt-list", this.savedList)
    })
  }

  createYoutubeAPIframe() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    return tag.src;
  }


  onYouTubeIframeAPIReady(id) {
    let player = new YT.Player(id, {
      height: '168',
      width: '300',
      videoId: id,
      events: {
        'onReady': onPlayerReady
      }
    });
    function onPlayerReady(event) {
      event.target.stopVideo();
    }
    return player;
  }

  clearList() {
    this.clear.addEventListener('click', () => {
      if (!this.savedList) return;
      this.videoList.innerHTML = '';
      localStorage.setItem("yt-list", this.savedList = '');
    })
  }
}

const YOUTUBE_LIST = new YoutubeList();
YOUTUBE_LIST.init();
