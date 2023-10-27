import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Orientation from 'react-native-orientation-locker';
const VideoPlayer = () => {
  const [paused, setPaused] = useState();
  const [progress, setProgress] = useState(null);
  const [fullSCreen, setFullScreen] = useState(false);
  const ref = useRef(null);
  const videos = useSelector(state => state);
  const videourl = videos && videos.video.video[0];

  return (
    <View>
      <Video
        source={{
          uri: videourl,
        }} // Can be a URL or a local file.
        paused={paused}
        onProgress={x => {
          setProgress(x);
        }}
        controls={true}
        ref={ref}
        resizeMode={fullSCreen ? 'cover' : 'contain'}
        style={{width: '100%', height: fullSCreen ? '100%' : 200}}
      />
      <View style={styles.orientaion}>
        <TouchableOpacity
          onPress={() => {
            if (fullSCreen) {
              Orientation.lockToPortrait();
            } else {
              Orientation.lockToLandscape();
            }
            setFullScreen(!fullSCreen);
          }}>
          <Icon
            name={fullSCreen ? 'fullscreen-exit' : 'fullscreen'}
            size={30}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoPlayer;
const styles = StyleSheet.create({
  orientaion: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    paddingLeft: 20,
    paddingRight: 20,
    // alignItems: 'center',
  },
});
