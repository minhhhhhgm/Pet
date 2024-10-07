import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { BottomSheet, MButton, MText } from 'components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Image, InteractionManager, Pressable, TouchableOpacity, View } from 'react-native';
import {
    Camera,
    PhotoFile,
    useCameraDevice,
    useCameraPermission,
} from 'react-native-vision-camera';
import { CarIcon, CloseIcon } from 'utils/icons';
import { deviceHeight } from 'utils/themes';

const MainCamera = () => {
    const { hasPermission, requestPermission } = useCameraPermission();
    const [photo, setPhoto] = useState<PhotoFile>();
    const [isPhotoTaken, setIsPhotoTaken] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const isFocused = useIsFocused()
    const camera = useRef<Camera>(null);
    const device = useCameraDevice('back');

    useEffect(() => {
        console.log("Component loaded");
        // Nếu có một useEffect nào khác ảnh hưởng đến trạng thái của nút, hãy kiểm tra ở đây.
    }, []);

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
        }, [])
    );

    const takePicture = async () => {
        console.log("CLICK");

        if (camera.current && !isPhotoTaken) {  // Kiểm tra để tránh gọi hàm chụp nhiều lần
            try {
                setIsPhotoTaken(true); // Đánh dấu ảnh đã chụp
                const photoData = await camera.current.takePhoto();
                requestAnimationFrame(() => {
                    setPhoto(photoData);
                });
                setIsPhotoTaken(false); // Reset lại trạng thái sau khi chụp xong
            } catch (error) {
                console.error('Error taking photo:', error);
                setIsPhotoTaken(false);
            }
        }
    };
    useEffect(() => {
        if (!photo) {
            setIsPhotoTaken(false);
        }
    }, [photo]);

    // if (photo) {
    //     return (
    //         <View style={{ flex: 1, backgroundColor: 'black' }} key={photo ? 'photo-mode' : 'camera-mode'}>


    //             <Pressable
    //                 onPress={() => {
    //                     setPhoto(undefined);
    //                     setIsPhotoTaken(false); // Reset trạng thái khi người dùng đóng ảnh
    //                 }}
    //                 style={{ position: 'absolute', left: 10, top: 10, zIndex: 1 }}>
    //                 <CloseIcon />
    //             </Pressable>

    //             <Image
    //                 source={{ uri: 'file://' + photo.path }}
    //                 style={{
    //                     width: '100%',
    //                     height: deviceHeight * 0.6,
    //                 }}
    //             />
    //         </View>
    //     )
    // }
    // else
        return (
            <View style={{ flex: 1, backgroundColor: 'black' }}>

                {/* <Camera
                    style={{
                        // position: 'absolute',
                        top: 100,
                        width: '100%',
                        height: deviceHeight * 0.6,
                    }}
                    device={device!}
                    isActive={isActive}
                    photo={true}
                    //   video={true}
                    ref={camera}
                /> */}
                <BottomSheet
                    fullScreen
                    visible={!!photo}
                    closeModal={() => { }}
                >
                    <View style={{ flex: 1}}>

                        <Pressable
                            onPress={() => {
                                setPhoto(undefined);
                                setIsPhotoTaken(false); // Reset trạng thái khi người dùng đóng ảnh
                            }}
                            style={{ position: 'absolute', left: 10, top: 10, zIndex: 1 }}>
                            <CloseIcon />
                        </Pressable>
                        {
                            photo && 
                        <Image
                            source={{ uri: 'file://' + photo!.path }}
                            style={{
                                width: '100%',
                                height: deviceHeight * 0.6,
                            }}
                        />
                        }
                    </View>
                </BottomSheet>
                <View
                    style={{
                        flex: 1,
                        borderRadius: 40,
                        overflow: 'hidden',
                        position: 'absolute',
                        top: 100,
                        width: '100%',
                        height: deviceHeight * 0.6,
                        justifyContent: 'center'
                    }}>
                    <Camera
                        enableZoomGesture
                        style={{ flex: 1 }}
                        device={device!}
                        isActive={!photo}
                        photo={true}
                        //   video={true}
                        ref={camera}
                    />
                </View>

                {
                    isActive &&
                    <View
                        style={{
                            height: 120,
                            width: '100%',
                            position: 'absolute',
                            bottom: 0,
                            backgroundColor: 'black',
                            // flexDirection: 'row',
                            // alignItems: 'center',
                            // justifyContent: 'space-between',

                            flex: 1
                            // zIndex: 1000
                        }}>
                        <MButton
                            onPress={takePicture}
                        />
                    </View>
                }
            </View>
        );
};

export default MainCamera;
