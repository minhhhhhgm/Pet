import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import {
  BottomSheet,
  Column,
  Container,
  MButton,
  MText,
  Row,
  SizeBox,
  TextField,
} from 'components';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Camera,
  PhotoFile,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { useAppDispatch } from 'reduxStore';
import { setGlobalLoading } from 'reduxStore/slices/loadingSlice';
import { storage } from 'services/firebass-config';
import colors from 'utils/colors';
import {
  CamIcon,
  ChevronDown,
  CloseIcon,
  FlashIcon,
  Person,
  PersonGroup,
} from 'utils/icons';
import { deviceHeight, deviceWidth } from 'utils/themes';
import messaging from '@react-native-firebase/messaging';
import images from 'utils/images';
import { navigate } from 'navigation/service';
import screenNames from 'utils/constants/screenNames';

const MainCamera = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [photo, setPhoto] = useState<PhotoFile>();
  const [isActive, setIsActive] = useState(false);
  const isFocused = useIsFocused();
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back');
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (!hasPermission) {
      console.log('permission', hasPermission);
      requestPermission();
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setIsActive(true);
      return () => {
        setIsActive(false);
      };
    }, []),
  );

  const takePicture = async () => {
    console.log('CLICK');

    if (camera.current) {
      try {
        const photoData = await camera.current.takePhoto();
        requestAnimationFrame(() => {
          setPhoto(photoData);
        });
      } catch (error) {
        console.error('Error taking photo:', error);
      }
    }
  };

  const handleChangeAvatar = async () => {
    try {
      dispatch(setGlobalLoading(true));

      const metadata = {
        contentType: 'image/jpeg',
      };
      const storageRef = ref(storage, 'images/' + Date.now());
      const uri = photo?.path as string;
      const response = await fetch(`file://${photo?.path}`);
      const blob = await response.blob();
      const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
      uploadTask.on(
        'state_changed',
        snapshot => {
          console.log(snapshot);
        },
        error => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
            console.log('File available at', downloadURL);
            const update = {
              photoURL: downloadURL,
            };
          });
        },
      );
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      console.log('DONE');
      dispatch(setGlobalLoading(false));
    }
  };
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(false);
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    if (currentOffset > deviceHeight) {
      setActiveIndex(true);
    } else {
      setActiveIndex(false);
    }
  };
  return (
    <Container style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Row
        style={{
          justifyContent: 'space-between',
          paddingHorizontal: 28,
          top: 40,
          position: 'absolute',
          zIndex: 1,
          width: '100%',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: colors.gray[30],
            padding: 10,
            borderRadius: 99,
          }}>
          <PersonGroup width={24} height={24} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={()=>navigate(screenNames.ACCOUNT_SETTING_SCREEN)}
          style={{
            backgroundColor: colors.gray[30],
            padding: 10,
            borderRadius: 99,
          }}>
          <Person width={24} height={24} />
        </TouchableOpacity>
      </Row>
      <View
        style={{
          flex: 1,
        }}>
        <FlatList
          onScroll={handleScroll} // Bắt sự kiện cuộn
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          bounces={false}
          data={[1, 2, 3, 4]}
          pagingEnabled
          keyExtractor={item => item.toString()}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  height: deviceHeight,
                }}>
                {index === 0 ? (
                  <View
                    style={{
                      height: deviceHeight,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        borderRadius: 66,
                        overflow: 'hidden',
                        position: 'absolute',
                        top: 100,
                        width: '100%',
                        height: deviceHeight * 0.6,
                        justifyContent: 'center',
                      }}>
                      {hasPermission && index === 0 && (
                        <Camera
                          enableZoomGesture
                          style={{ flex: 1 }}
                          device={device!}
                          isActive={index === 0 && hasPermission && isFocused}
                          photo={true}
                          ref={camera}
                        />
                      )}
                    </View>
                    <View
                      style={{
                        width: '100%',
                        position: 'absolute',
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        zIndex: 10,
                      }}>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingHorizontal: 32,
                          flex: 1,
                        }}>
                        <FlashIcon width={32} height={32} />
                        <TouchableOpacity
                          onPress={takePicture}
                          style={{
                            width: 90,
                            height: 90,
                            backgroundColor: colors.primary,
                            borderRadius: 99,
                          }}>
                          <View
                            style={{
                              backgroundColor: colors.mainBlack,
                              margin: 2,
                              flex: 1,
                              borderRadius: 99,
                            }}>
                            <View
                              style={{
                                backgroundColor: 'white',
                                margin: 5,
                                flex: 1,
                                borderRadius: 99,
                              }}
                            />
                          </View>
                        </TouchableOpacity>
                        <CamIcon width={32} height={32} />
                      </View>
                      <SizeBox height={5} />
                      <Column style={{ alignItems: 'center' }}>
                        <MText fontSize={24} fontWeight="700">
                          History
                        </MText>
                        <SizeBox height={5} />
                        <ChevronDown width={24} height={24} />
                      </Column>
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      height: deviceHeight,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        borderRadius: 66,
                        overflow: 'hidden',
                        position: 'absolute',
                        top: 100,
                        width: '100%',
                        height: deviceHeight * 0.6,
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={images.iconLocket}
                        style={{
                          width: '100%',
                          height: deviceHeight * 0.6,
                        }}
                        resizeMode="stretch"
                      />
                    </View>
                    {/* <View style={{
                      width: '100%',
                      position: 'absolute',
                      bottom: 0,
                      // flex: 1,
                      zIndex: 10
                    }}>
                      <TextField
                        label='Send message'
                        inputWrapperStyle={{ marginHorizontal: 28, paddingHorizontal: 6 }}

                      />

                    </View> */}
                  </View>
                )}
              </View>
            );
          }}
        />
      </View>
      {activeIndex && (
        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
          }}>
          <TextField
            label="Send message"
            inputWrapperStyle={{ marginHorizontal: 28, paddingHorizontal: 6 }}
          />
          <SizeBox height={10} />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 32,
              flex: 1,
            }}>
            <FlashIcon width={32} height={32} />
            <TouchableOpacity
              onPress={takePicture}
              style={{
                width: 50,
                height: 50,
                backgroundColor: colors.primary,
                borderRadius: 99,
              }}>
              <View
                style={{
                  backgroundColor: colors.mainBlack,
                  margin: 2,
                  flex: 1,
                  borderRadius: 99,
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    margin: 5,
                    flex: 1,
                    borderRadius: 99,
                  }}
                />
              </View>
            </TouchableOpacity>
            <CamIcon width={32} height={32} />
          </View>
        </View>
      )}
      {/* <View style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 32,
              flex: 1,
            }}>
            <FlashIcon width={32} height={32} />
            <TouchableOpacity
              onPress={takePicture}
              style={{
                width: 90,
                height: 90,
                backgroundColor: colors.primary,
                borderRadius: 99,
              }}>
              <View
                style={{
                  backgroundColor: colors.mainBlack,
                  margin: 2,
                  flex: 1,
                  borderRadius: 99,
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    margin: 5,
                    flex: 1,
                    borderRadius: 99,
                  }} />
              </View>
            </TouchableOpacity>
            <CamIcon width={32} height={32} />
          </View>
          <SizeBox height={5} />
          <Column style={{ alignItems: 'center' }}>
            <MText fontSize={24} fontWeight='700'>History</MText>
            <SizeBox height={5} />
            <ChevronDown width={24} height={24} />
          </Column>
        </View> */}
    </Container>
  );

  return (
    <Container>
      <Modal animationType="fade" onRequestClose={() => {}} visible={!!photo}>
        <View style={{ flex: 1 }}>
          <Pressable
            onPress={() => {
              setPhoto(undefined);
            }}
            style={{ position: 'absolute', left: 10, top: 10, zIndex: 1 }}>
            <CloseIcon />
          </Pressable>
          {photo && (
            <Image
              source={{ uri: 'file://' + photo!.path }}
              style={{
                width: '100%',
                height: deviceHeight * 0.6,
              }}
            />
          )}
          <MButton onPress={handleChangeAvatar} />
        </View>
      </Modal>
      {/* <Row
        style={{
          justifyContent: 'space-between',
          marginHorizontal: 28,
          marginTop: 10,
        }}>
        <View
          style={{
            backgroundColor: colors.gray[30],
            padding: 10,
            borderRadius: 99,
          }}>
          <PersonGroup width={24} height={24} />
        </View>

        <View
          style={{
            backgroundColor: colors.gray[30],
            padding: 10,
            borderRadius: 99,
          }}>
          <Person width={24} height={24} />
        </View>
      </Row> */}

      <FlatList
        style={
          {
            // backgroundColor: 'red',
          }
        }
        pagingEnabled={true} // Kích hoạt cuộn từng phần tử
        decelerationRate="fast" // Điều chỉnh tốc độ cuộn để dừng chính xác
        // snapToAlignment="start" // Căn chỉnh phần tử đầu tiên với màn hình
        showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} // Data mẫu
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width: '100%',
                height: deviceHeight, // Đảm bảo chiều cao mỗi phần tử bằng chiều cao màn hình
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MText>Item {item}</MText>
            </View>
          );
        }}
        // snapToOffsets={[...Array(10)].map((_, i) => i * deviceHeight)} // Cố định vị trí cuộn tại mỗi phần tử
        onMomentumScrollEnd={event => {
          // Xử lý khi cuộn dừng lại
          const offsetY = event.nativeEvent.contentOffset.y;
          const index = Math.round(offsetY / deviceHeight); // Tính toán chỉ số phần tử gần nhất
          flatListRef.current?.scrollToIndex({ index, animated: true }); // Cuộn về phần tử chính xác
        }}
        ref={flatListRef}
      />

      {/* <View
        style={{
          flex: 1,
          borderRadius: 66,
          overflow: 'hidden',
          position: 'absolute',
          top: 80,
          width: '100%',
          height: deviceHeight * 0.6,
          justifyContent: 'center',
        }}>


        <FlatList
          pagingEnabled={true}
          horizontal
          data={[1 , 2 , 3,3,2,34,1,12,31,23,1]}
          renderItem={({ item, index }) => {
            return (
              <MText>kaskdaskdksl</MText>
            )
          }}

        />
      </View> */}

      {
        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 32,
              flex: 1,
            }}>
            <FlashIcon width={32} height={32} />
            <TouchableOpacity
              onPress={takePicture}
              style={{
                width: 90,
                height: 90,
                backgroundColor: colors.primary,
                borderRadius: 99,
              }}>
              <View
                style={{
                  backgroundColor: colors.mainBlack,
                  margin: 2,
                  flex: 1,
                  borderRadius: 99,
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    margin: 5,
                    flex: 1,
                    borderRadius: 99,
                  }}
                />
              </View>
            </TouchableOpacity>
            <CamIcon width={32} height={32} />
          </View>
          <SizeBox height={5} />
          <Column style={{ alignItems: 'center' }}>
            <MText fontSize={24} fontWeight="700">
              History
            </MText>
            <SizeBox height={5} />
            <ChevronDown width={24} height={24} />
          </Column>
        </View>
      }
    </Container>
  );
};

export default MainCamera;
