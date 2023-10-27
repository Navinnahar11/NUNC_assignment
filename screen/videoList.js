// React Native Video Library to Play Video in Android and IOS
// https://aboutreact.com/react-native-video/

// import React in our code
import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Share,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {videoDownload, playVideo, AllVideoList} from '../Redux/Action';
import RNFetchBlob from 'rn-fetch-blob';
import {useNavigation} from '@react-navigation/native';
// import { sampleData } from '../Data';
const sampleData = [
    {
      video_id: '11969446',
      video_fk: 'AEE7CBFD-66CB-2E17-53B1-81D3882C5F5D',
      views: '198',
      videourl:
        'http://d5638c46e9d8a6fde200-4a368be6a86dae998dd81c519d69c3f4.r88.cf1.rackcdn.com/AEE7CBFD-66CB-2E17-53B1-81D3882C5F5D.mp4',
      rendering: 'Complete',
      thumbnail:
        'http://resources.flickfusion.net/avavids/1/clients/224/images/AEE7CBFD-66CB-2E17-53B1-81D3882C5F5D_1.jpg',
      lastupdate: '2023-07-19 09:25:28',
      video_local_title: '11111',
      video_title: '111111',
    },
    {
      video_id: '11877376',
      video_fk: '55608C1E-7E35-3E85-ED4E-A4BC250715DB',
      views: '25',
      videourl:
        'http://d5638c46e9d8a6fde200-4a368be6a86dae998dd81c519d69c3f4.r88.cf1.rackcdn.com/55608C1E-7E35-3E85-ED4E-A4BC250715DB.mp4',
      rendering: 'Complete',
      thumbnail:
        'http://resources.flickfusion.net/avavids/1/clients/224/images/55608C1E-7E35-3E85-ED4E-A4BC250715DB_1.jpg',
      lastupdate: '2022-12-22 08:31:07',
      video_local_title: '222222',
      video_title: '2222222',
    },
    {
      video_id: '11877234',
      video_fk: '0F7EF302-64D1-B482-3B2F-DB69A757AAA8',
      views: '60',
      videourl:
        'http://d5638c46e9d8a6fde200-4a368be6a86dae998dd81c519d69c3f4.r88.cf1.rackcdn.com/0F7EF302-64D1-B482-3B2F-DB69A757AAA8.mp4',
      rendering: 'Complete',
      thumbnail:
        'http://resources.flickfusion.net/avavids/1/clients/224/images/0F7EF302-64D1-B482-3B2F-DB69A757AAA8_1.jpg',
      lastupdate: '2023-05-17 05:46:34',
      video_local_title: '333333',
      video_title: '333333',
    },
    {
      video_id: '11873279',
      video_fk: 'B710E1AE-E897-D906-DBBD-705B05F5F83A',
      views: '4',
      videourl:
        'http://d5638c46e9d8a6fde200-4a368be6a86dae998dd81c519d69c3f4.r88.cf1.rackcdn.com/B710E1AE-E897-D906-DBBD-705B05F5F83A.mp4',
      rendering: 'Complete',
      thumbnail:
        'http://resources.flickfusion.net/avavids/1/clients/224/images/B710E1AE-E897-D906-DBBD-705B05F5F83A_1.jpg',
      lastupdate: '2022-11-04 06:23:16',
      video_local_title: '4444444 ',
      video_title: '4444444',
    },
  ];

const VideoList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const[status,setStatus] = useState()
  const RequestStoragePermission = async item => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Download app storage Permission',
          message:
            'Download App needs access to your storage ' +
            'so you can download video.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        downloadVideo(item);
        // console.log('You can use the camera');
      } else {
        console.log('storage permission denied');
      }
      downloadVideo(item);
    } catch (err) {
      console.warn(err);
    }
  };
 
 
  const downloadVideo = item => {
    const {config, fs} = RNFetchBlob;
    const fileDir = fs.dirs.DownloadDir;
    const date = new Date();
    config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          fileDir +
          '/downloads_' +
          Math.floor(date.getDate() + date.getSeconds() / 2) +
          '.mp4',
      },
    })
      .fetch('GET', item.videourl, {
        //some headers ..
      })
      .then(res => {
        if (res) {
          dispatch(videoDownload(item.videourl));
          alert('file download successfully');
          setStatus(item.video_id)
          navigation.navigate('VideoPlayer');
        } else {
          alert('file not downloaded');
        }

        console.log('The file saved to ', res.path());
      });
  };

  const onShare = async item => {
    try {
      const result = await Share.share({
        message: `${item.videourl}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        {sampleData.map((item, index) => {
          return (
            <View key={index} style={styles.videoList}>
              <View
                style={styles.listItem}>
                <View style={styles.innerList}>
                    <View>
                  <TouchableOpacity
                    style={styles.icon}
                    onPress={() => RequestStoragePermission(item)}>
                    <Icon name={'play-circle'} size={30} />
                  </TouchableOpacity>
                  <View style={{width:10,height:10,borderRadius:5,backgroundColor:'#8cb57a', position:'absolute',bottom:0,right:5}}></View>
                 </View>
                  <View>
                    <Text style={styles.text}>{item.video_local_title}</Text>
                    <Text style={styles.text}>{item.video_title}</Text>
                    <Text style={styles.text}>{`Status:${item.rendering}`}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                  style={styles.shareicon}
                  onPress={() => onShare(item)}>
                  <Icon
                    name={'share'}
                    size={30}
                    color="#6da5d9"
                  />
                </TouchableOpacity>
                <View style={styles.verticalLine}></View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  videoList: {
    width: '90%',
    // height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'green',
    alignSelf: 'center',
    margin: 10,
    justifyContent: 'center',
    padding:5
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft:10
  },
  icon: {
    width: 50,
    height: 50,
    backgroundColor: '#c4def6',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  shareicon:{
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  verticalLine:{
   width:5,
   borderWidth:1,
   height:50,
   borderColor:'#6da5d9',
   marginRight:10,
   backgroundColor:'#6da5d9'
  },
  listItem:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerList:{flexDirection: 'row', alignItems: 'center'}
});
export default VideoList;
