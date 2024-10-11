import { Container, MText } from 'components';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import AccountInforBar from './components/AccountInforBar';
import ModalFriend from './components/ModalFriend';
import useAccount from './hooks/useAccount';

const AccountSettingScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { getUsers, users,loadMore , followUser} = useAccount()
  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(0)
  };

  return (
    <Container>
      <AccountInforBar handleOpenBottomSheet={handleOpenBottomSheet} users={users}/>

      <BottomSheet
        index={-1}
        snapPoints={['99%']}
        ref={bottomSheetRef}
        handleIndicatorStyle={{
          backgroundColor: 'red'
        }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            opacity={2}
            appearsOnIndex={1}
            disappearsOnIndex={-1}
          />
        )}
        enablePanDownToClose={true}
        backgroundStyle={{ borderRadius: 44, backgroundColor: '#242424' }}
      >
        <ModalFriend users={users} loadMore={loadMore} followUser={followUser}/>
      </BottomSheet>
    </Container>
  );
};

export default AccountSettingScreen;
