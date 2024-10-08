import { Column, Container, MButton, MText, Row, SizeBox } from 'components';
import { Image } from 'react-native';
import colors from 'utils/colors';
import images from 'utils/images';
import { deviceHeight, deviceWidth } from 'utils/themes';
import useSetup from './hooks/useSetup';

const SetupScreen = () => {
  const { onSetup } = useSetup();
  return (
    <Container BGColor={colors.black[100]} scrollable>
      <Column style={{ alignItems: 'center' }}>
        <SizeBox height={50} />
        <Image
          source={images.setupImage}
          style={{
            width: deviceWidth,
            height: deviceHeight - deviceHeight / 2,
            transform: [{ rotate: '-45deg' }],
          }}
        />
        <SizeBox height={50} />
        <Row style={{ alignItems: 'center' }}>
          <Image
            source={images.iconLocket}
            style={{
              width: 35,
              height: 35,
              borderRadius: 10,
            }}
          />
          <SizeBox width={10} />
          <MText fontSize={30} fontWeight="700">
            Lock Cức
          </MText>
        </Row>
        <SizeBox height={15} />
        <MText
          fontSize={22}
          style={{
            textAlign: 'center',
            marginHorizontal: 32,
            letterSpacing: 1,
            lineHeight: 32,
          }}
          color="#D7D7D7">
          Live pics from your friend, on your home screen
        </MText>
        <SizeBox height={30} />
        <MButton
          isBoldLabel
          style={{
            alignSelf: 'auto',
          }}
          label="Set up my Lockut"
          textStyle={{ marginHorizontal: 26, color: '#170f01' }}
          onPress={onSetup}
        />
      </Column>
    </Container>
  );
};

export default SetupScreen;
