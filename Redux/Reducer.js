import { DOWNLOAD_VIDEO,PLAY_VIDEO,VIDEO_LIST } from './constants';
const initialState = {
video: []
};
const videoReducer = (state = initialState, action) => {
switch(action.type) {
case DOWNLOAD_VIDEO:
return {
...state,
video:action.payload
};


default:
return state;
}
}
export default videoReducer;