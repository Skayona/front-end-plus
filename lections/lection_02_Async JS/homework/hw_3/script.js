'use strict';

class YoutubeList {
  constructor() {
    this.add = document.querySelector('#add-btn');
    this.url = document.querySelector('#add-video');
    this.videoList = document.querySelector('#yt-list');
    this.createYoutubeAPIframe();
    this.generateVideo();
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

  generateVideo() {
    this.add.addEventListener('click', () => {
      let ytLink = this.getUrl();
      if (!ytLink) {
        this.url.classList.add('error');
        return;
      }
      this.url.classList.remove('error');
      let item = document.createElement('li');
      item.setAttribute("id", ytLink);
      this.videoList.appendChild(item);
      this.onYouTubeIframeAPIReady(ytLink);

    })
  }

  createYoutubeAPIframe() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  onYouTubeIframeAPIReady(id) {
    let player = new YT.Player(id, {
      height: '360',
      width: '640',
      videoId: id,
      events: {
        'onReady': onPlayerReady
      }
    });
    function onPlayerReady(event) {
      event.target.stopVideo();
    }
    // function stopVideo() {
    //   player.stopVideo();
    // }
    return player;
  }


}


const YOUTUBE_LIST = new YoutubeList();
// YOUTUBE_LIST.init();

