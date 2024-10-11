import { MText, Row, SizeBox } from "components"
import { StyleSheet, View } from "react-native"
import { AvatarIcon, SearchIcon, SettingsIcon } from "utils/icons"
import { RootAccount } from "../type"

type Props ={
    handleOpenBottomSheet? : ()=>void,
    users?: RootAccount 
}

const AccountInforBar = (props :Props) => {
    const { users } =props
    return (
        <Row style={styles.root}>
            <Row style={{
                alignItems:'center'
            }}>
                <View style={styles.avatarWrap}>
                    <MText>
                        GGA
                    </MText>
                </View>
                <SizeBox width={5}/>
                <MText>GA</MText>
            </Row>

            <Row>
            <SearchIcon onPress={props.handleOpenBottomSheet} />
            <SizeBox width={5}/>
            <AvatarIcon/>
            <SizeBox width={5}/>
            <SettingsIcon/>
            </Row>
        
        </Row>
    )
}

export default AccountInforBar


const styles =StyleSheet.create({
    root:{
        alignItems:'center',
            justifyContent:'space-between',
            paddingHorizontal:16
    },
    avatarWrap:{
        width:35, height:35,
        backgroundColor:'gray',
        borderRadius: 99,
        justifyContent:'center',
        alignItems:'center'
    }
})