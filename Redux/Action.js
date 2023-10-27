import {DOWNLOAD_VIDEO,PLAY_VIDEO} from './constants';



export const videoDownload = video => (console.log('video>>>>>',video), {
    
  type: DOWNLOAD_VIDEO,
  payload: [video],
});

export const playVideo = video => ({
  type: PLAY_VIDEO,
  payload: video,
});
