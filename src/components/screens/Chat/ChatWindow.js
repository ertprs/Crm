import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Keyboard, AppState, StatusBar } from 'react-native';
import { withNavigation, NavigationEvents } from 'react-navigation';
import { GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import Geolocation from '@react-native-community/geolocation';
import LinearGradient from 'react-native-linear-gradient';
import Clipboard from "@react-native-community/clipboard";
import { Header } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BackButton, Center, RightChatIcon } from '../../components/HeaderComponents';

import Modal from 'react-native-modal';

import { TimerModal, GiphyComponent, SelectMessage, MessageComponent } from '../../custom';

import {connect} from 'react-redux';
import {GIPHY_API_KEY, MESSAGE_REMOVER_CLOUD_URL} from '../../config/constants';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import { setProfile } from '../../redux/actions/authActions';


const ChatWindow = (props) => {
    const [messages, setMessages] = useState([]);
    const [gif_modal_visible, setgifModalVisibile] = useState(false);
    const [timer_modal_visible, settimerModalVisibile] = useState(false);
    const [bubble_modal_visible, setbubbleModalVisibile] = useState(false);
    const messagesRef = firestore().collection('messages');
    const privateMessagesRef = firestore().collection('privateMessages');
    const unreadMessagesRef = firestore().collection('unreadMessages');
    const channelTypingRef = firestore().collection('channelTyping');
    const privateTypingRef = firestore().collection('privateTyping');
    const [location, setLocation] = useState(null);
    const [gifQuery] = useState('');
    const [selected_gif, setSelectedGif] = useState('');
    const [random_gifs, setRandomGif] = useState([]);
    const [search_results, setSearchResult] = useState([]); 
    const [timer_duration, setTimerDuration] = useState(0);
    const [error, setError] = useState('');
    const [statusRef] =  useState(firestore().collection('status'));
    const [currentUserStatus, setCurrentUserStatus] = useState('offline');
    const [isTyping, setTyping] = useState(null);
    const [appState, setAppState] = useState(AppState.currentState);
    const [selectedMessage, setSeletedMessage] = useState('');



    useEffect(() => {
      getChat();
      setUserLastTimeStamp();              // Method to set user's last visit to this chat window.
      getUserStatus();

      //Keyboard listeners 
      keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        _keyboardDidShow,
      );
      keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        _keyboardDidHide,
      );
    
      AppState.addEventListener('change', _handleAppStateChanged);

      // Typing Listener
      getTypingStatus();
    },[]);

  const _handleAppStateChanged = (nextAppState) => {
    if(nextAppState == 'background' || nextAppState == 'inactive') {
      setTypingStatus(false);
    }
  }

  const getTypingStatus = () => {
    if(props.channel.isPrivate) {
      
          if(channelTypingListener) {
            channelTypingListener();
          }

          privateTypingListener = privateTypingRef.doc(props.auth.user.uid).onSnapshot(doc => {
            if(doc.exists) {
              setTyping(doc.data()[props.channel.currentChannel.uid]);
            }
        })
    } else {
     
      if(privateTypingListener) {
        privateTypingListener();
      }

      channelTypingListener = channelTypingRef.doc(props.channel.currentChannel.uid).onSnapshot(doc => {
        if(doc.exists) {
          if(doc.data().uid !== props.auth.user.uid) {
            setState({ isTyping: doc.data() })
          }
        }
      })
    }
  }

  const _keyboardDidShow = async () => {
    setTypingStatus(true);
  }

  const _keyboardDidHide = async () => {
    setTypingStatus(false);
  }

  const setTypingStatus = async (status) => {
    if(props.channel.isPrivate) {
      try {
        await privateTypingRef.doc(props.channel.currentChannel.uid).set({
          [props.auth.user.uid] : {
            typing: status,
            uid: props.auth.user.uid,
            displayName: props.auth.user.name
          }
        })
      } catch(e) {
        console.log('Something went wrong while updating the typing status. (private)', e);
      }
    } else {
      try {
        await channelTypingRef.doc(props.channel.currentChannel.uid).set({
          typing: status,
          uid: props.auth.user.uid,
          displayName: props.auth.user.name
        })
      } catch(e) {
        console.log('Something went wrong while updating the typing status. (public)', e);
      }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    }
  }

  const setUserLastTimeStamp = () => {
    unreadMessagesRef.doc(props.auth.user.uid).set({
      [props.channel.currentChannel.uid]: {
        last_visit: Date.now(),
        count: 0
      }
    }, { merge: true })
    .catch(e => {
      console.log('Something went wrong');
    })
  }

   // Update the end-user's unseen message count when they recieve a message for this particular thread.
   // Receives 2 parameters, value corresponds to the unseen message count of the end-user, incremented at every message they receive.
   // Reset CURRENT user's when the exit the chat window.
   // Mode corresponds to whose count to reset.

  const updateEndUserCount = (value=null, mode) => {                     
    let prop = mode == 'end-user' ? props.auth.user.uid : props.channel.currentChannel.uid;
    let userDoc = mode == 'end-user' ? props.channel.currentChannel.uid : props.auth.user.uid;
    if(props.channel.isPrivate) {
      unreadMessagesRef.doc(userDoc).set({
        [prop]: {
          count: value ? value - 1 : firestore.FieldValue.increment(1), 
        }
      }, { merge: true })
      .catch(e => {
        console.log('Something went wrong');
      })
    }
  }

  const getUserStatus = () => {
    if(props.channel.isPrivate) {
      let uid = props.channel.currentChannel.uid;
     statusRef.doc(uid).get().then(snapshot => {
      setCurrentUserStatus(snapshot.data().state);
      }).catch(e => {
        console.log(e)
      })
    }
  }

  //Typing Indicator Function

  // onInputTextChanged = () => {
  //   typingRef.doc(props.channel.currentChannel.uid).
  // }

  const onBackPress = () => {
    props.navigation.goBack();
  }

  const getChat = () => {
    const uid = getChannelId();
    const ref = props.channel.isPrivate ? privateMessagesRef : messagesRef;

    messageListener = ref.doc(uid).collection('chats').orderBy('createdAt','desc').onSnapshot(querySnapShot => {
      let fetched_messages = [];
      querySnapShot.forEach((query) => {
        fetched_messages.push({...query.data(), _id: query.id})
          if(query.data().duration && query.data().duration > 0 && query.data().user._id !== props.auth.user.uid) {
            let channelData = {
              channelId: uid,
              messageId: query.id,
              timer: query.data().duration,
              messageType: query.data().messageType,
              type: props.channel.isPrivate ? 'private' : 'group'
            }
            // cloudDelete(channelData);
          }

      })
      setMessages(fetched_messages);
    })
  }

  const cloudDelete = async (channelData) => {
    try {
      await axios.post(MESSAGE_REMOVER_CLOUD_URL, channelData)
     } catch(e) {
       console.log(e);
     }
  }

  getChannelId = () => {
    if(props.channel.isPrivate) {
      return props.auth.user.uid > props.channel.currentChannel.uid ? 
       ( props.auth.user.uid + props.channel.currentChannel.uid ) : 
        ( props.channel.currentChannel.uid + props.auth.user.uid )  
    }

    return props.channel.currentChannel.uid;
  }

  createMessage = (data = null, mode) => {
    const newMessageObject = {
      createdAt: Date.now(),
      messageType: mode,
      duration: timer_duration,
      user: {
        _id: props.auth.user.uid,
        name: props.auth.user.name,
        avatar: props.auth.user.avatar
      }
    };

    if (mode == 'image') {
      newMessageObject.image = selected_gif;
      return newMessageObject;
    }

    if(mode == 'location') {
      newMessageObject.location = {...location};
      return newMessageObject;
    }

    if(mode == 'text') {
      newMessageObject.text = data;
      return newMessageObject;
    }

    return newMessageObject;
  }

  const onSend = (newmessages = [], mode = 'text') => {
    const ref = props.channel.isPrivate ? privateMessagesRef : messagesRef;
    const uid = getChannelId();

    let newMessageObject = {};  

    newMessageObject = createMessage(message[0] ? newmessages[0].text : null, mode);
    GiftedChat.append(...messages, newmessages); 
      ref.doc(uid).collection('chats').add(newMessageObject).then((sent) => {
        if(selected_gif) {
          setSelectedGif('');
        }
        if(location) {
          setLocation('');
        }
         updateEndUserCount(null, 'end-user');
        if(newMessageObject.duration && newMessageObject.duration > 0) {
          let channelData = {
            channelId: uid,
            messageId: sent.id,
            timer: 'not specified',
            messageType: newMessageObject.messageType,
            type: props.channel.isPrivate ? 'private' : 'group'
          }
         // cloudDelete(channelData);
        }
      }).catch(e => {
        console.log('error', e)
      })
    
  }

  const renderChatActions = () => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 4}}>
        <TouchableOpacity style={{ paddingLeft: 3 }} onPress={toggleGifModal}>
            <MaterialIcons name="gif" color="white" size={32} />
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingLeft: 3, justifyContent: 'center' }} onPress={() => sendLocation('location')}>
            <FontAwesome name="location-arrow" color="white" size={22} />
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingLeft: 3, justifyContent: 'center' }} onPress={toggleTimerModal} >
            <EvilIcons name="clock" size={26} color="white"/>
        </TouchableOpacity>
      </View>
    )
  }

  const getGifs = async () => {
    try { 
      let gifs = await fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}`);
      gifs = await gifs.json();
      gifs = gifs.data.map((gif) => {
        return {
          id: gif.id,
          preview_url: gif.images.preview_gif.url,
          full_url: gif.url
        }
      })
      setRandomGif(gifs);
    } catch(e) {
      console.log(e);
    } 
  }

  const toggleGifModal = () => {
    setgifModalVisibile(!gif_modal_visible);
      if(gif_modal_visible) {
        // console.log('firing?')
        getGifs();
      }
  }

  const onGifQueryChange = (text) => {
    setState({ gifQuery: text }, async() => {
        try {
         
          let results = await fetch(`http://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${gifQuery}`);
          results = await results.json();
          results = results.data.map((gif) => {
            return {
              id: gif.id,
              preview_url: gif.images.preview_gif.url,
              full_url: gif.url
            }
          })
          setSearchResult(results);
        } catch(e) {
          console.log(e);
        }
    })
  }

  const onSelectGif = (gif_url) => {
    setgifModalVisibile(false);
      onSend([], 'image');
      setSelectedGif(gif_url);
   
  }

  const toggleTimerModal = () => {
    settimerModalVisibile(!timer_modal_visible );
  }

  const onDurationSelect = (dur) => {
    settimerModalVisibile(false);
    setTimerDuration(dur)
  }

 const renderMessage = (props) => {
    return <MessageComponent {...props}/>
  }

  sendLocation = (mode) => {
    Geolocation.getCurrentPosition(info => {
      setLocation(info.coords);
        onSend([], mode);
      
    })
  }

  renderInputToolbar = (props) => (
    <InputToolbar {...props}
       containerStyle={{ borderRadius: 15, backgroundColor: '#3B3E46', borderTopColor: 'transparent' }} 
    />
  )

  handleAvatarPress = (props) => {
    props.setProfile({
      uid: props._id,
      name: props.name,
      avatar: props.avatar
    });
    props.navigation.navigate('Profile');
  }

  const onBubbleLongPress = (props, message) => {
    if(message.messageType !== 'text') {
      return;
    }
    setSeletedMessage(message.text)
    setbubbleModalVisibile(!bubble_modal_visible);
  }

  toggleBubbleModal = () => {
    setbubbleModalVisibile(!bubble_modal_visible);
  }

  const onCopyPress = () => {
    Clipboard.setString(selectedMessage);
    setbubbleModalVisibile(false);
    setSeletedMessage('');
  }

// componentWillUnmount() {
//     updateEndUserCount(1); // 1 to bypass the coercion, reseting the current user's count to 0 when they exit this window.
//     messageListener();
//     setTypingStatus(false);
//     if(privateTypingListener) {
//       privateTypingListener();
//     }
//     if( channelTypingListener) {
//       channelTypingListener();
//     }
//     // typingListener();
//     AppState.removeEventListener('change', _handleAppStateChanged);
//     keyboardDidShowListener.remove();
//     keyboardDidHideListener.remove();
//   }

    const {styles:redux, dimensions} = props.global;
    const {currentChannel} = props.channel;
    return (
    <LinearGradient colors={redux.container.colors} style={redux.container}>
      <NavigationEvents 
        onWillFocus={payload => {
          StatusBar.setTranslucent(false)
          StatusBar.setBackgroundColor(redux.container.colors[0])
        }}
      />
      <Header
        containerStyle={{ backgroundColor: 'transparent', height: dimensions.height*0.09, borderBottomWidth: 0.3, borderBottomColor: '#363940', elevation: 1 }}
        leftComponent={ <BackButton onBackPress={onBackPress} /> }
        centerComponent={ 
            <Center 
              typing={isTyping}
              uri={currentChannel.iconUrl ? currentChannel.iconUrl : currentChannel.avatar} 
              name={currentChannel.name} 
              status={currentUserStatus}
              isPrivate={props.channel.isPrivate}
            /> 
          }
        placement="left"
        rightComponent={ <RightChatIcon /> }
      />
        <GiftedChat
            messages={messages}
            keyboardShouldPersistTaps="never"
            onSend={messages => onSend(messages)}
            renderActions={renderChatActions}
            renderMessage={renderMessage}
            renderInputToolbar={renderInputToolbar}
            textInputProps={{ style: {color: 'white', fontFamily: 'RobotoMono-Regular', flex: 1} }}
            onPressAvatar={handleAvatarPress}
            onLongPress={onBubbleLongPress}
            user={{
              _id: props.auth.user.uid,
              name: props.auth.user.name,
              avatar: props.auth.user.avatar
            }}
        />

        { /* GIF MODAL */ }
      <View>
        <Modal 
          animationIn="slideInUp"
          animationOut="slideOutDown"
          swipeDirection="down"
          onSwipeComplete={close}
          onSwipeComplete={toggleGifModal}
          style={{ justifyContent: 'flex-end', margin: 0,}}
          backdropOpacity={0}
          onBackdropPress={toggleGifModal}
          isVisible={gif_modal_visible}
          onBackButtonPress={toggleGifModal}
          >
            <GiphyComponent 
              search_results={search_results}
              gifs={random_gifs}
              onSelectGif={onSelectGif}
              gifQuery={gifQuery}
              onGifQueryChange={onGifQueryChange}
            />
        </Modal>
      </View>

      { /* TIMER MODAL */ }

      <View>
        <Modal 
          animationIn="slideInUp"
          animationOut="slideOutDown"
          swipeDirection="down"
          onSwipeComplete={close}
          onSwipeComplete={toggleTimerModal}
          style={{ justifyContent: 'flex-end', margin: 0,}}
          backdropOpacity={0}
          onBackdropPress={toggleTimerModal}
          isVisible={timer_modal_visible}
          onBackButtonPress={toggleTimerModal}
          >
            <TimerModal 
              timer_duration={timer_duration}
              onDurationSelect={onDurationSelect}
            />
        </Modal>
      </View>

      {/* CHAT BUBBLE LONG PRESS MODAL */}

      <View>
        <Modal 
          animationIn="slideInUp"
          animationOut="slideOutDown"
          swipeDirection="down"
          onSwipeComplete={toggleBubbleModal}
          style={{ justifyContent: 'flex-end', margin: 0,}}
          backdropOpacity={0}
          onBackdropPress={toggleBubbleModal}
          isVisible={bubble_modal_visible}
          onBackButtonPress={toggleBubbleModal}
          >
           <SelectMessage 
              onCopyPress={onCopyPress}
              onCancelPress={toggleBubbleModal}
           />
        </Modal>
      </View>

    </LinearGradient >
    )
}

const mapStateToProps = state => ({
  global: state.global,
  auth: state.auth,
  channel: state.channel
})

export default withNavigation(connect(mapStateToProps, { setProfile })(ChatWindow));