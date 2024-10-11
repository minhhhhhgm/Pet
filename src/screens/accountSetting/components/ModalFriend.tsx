import { BottomSheetFlatList } from "@gorhom/bottom-sheet"
import { Column, MButton, MText, Row, SizeBox, TextField } from "components"
import { FlatList, Keyboard, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { PlusIcon, SearchIcon } from "utils/icons"
import { RootAccount } from "../type"

type Props ={
    users?: RootAccount ,
    loadMore: () => void,
    followUser: (id: string) => Promise<void>

}
const ModalFriend = (props : Props) => {
    return (
        
            <Column style={{flex:1}}>
                <Column style={styles.columnOne}>
                    <MText fontSize={24} fontWeight="700">
                        Your Friends
                    </MText>
                    <MText fontSize={20} fontWeight="700">
                        0 out of 20 friends added
                    </MText>
                </Column>
                <SizeBox height={10} />
                <TextField
                    inputWrapperStyle={{
                        backgroundColor:'#323232',
                        borderRadius: 16,
                        marginHorizontal: 16,
                        alignItems:'center'
                    }}
                    placeholder="Add a new friend"
                    // placeholderTextColor={'white'}
                    // LeftIcon={<SearchIcon />}
                />
                <SizeBox height={20}/>
                <BottomSheetFlatList
                    ItemSeparatorComponent={()=><SizeBox height={20}/>}
                // contentContainerStyle={{flex:1}}
                data={props.users?.users}
                nestedScrollEnabled={true}
                ListFooterComponent={<Row style={{
                    alignItems:'center',
                    paddingHorizontal:16
                }}>
                    <View style={{
                        backgroundColor:'gray',
                        height:1,
                        flex:1
                    }}>
                    </View>
                    <TouchableOpacity 
                    onPress={props.loadMore}
                    style={{
                        padding:10,
                        backgroundColor:'gray',
                        borderRadius:99,
                        marginHorizontal:10
                    }}>
                        <MText>
                            Show more
                        </MText>
                    </TouchableOpacity>
                    <View style={{
                        backgroundColor:'gray',
                        height:1,
                        flex:1
                    }}>
                    </View>
                </Row>}
                renderItem={({index, item})=>{
                    return(
                        <Row style={{
                            alignItems:'center',
                            justifyContent:'space-between',
                            paddingHorizontal:16
                        }}>
                            <Row style={{alignItems:'center'}}>
                                <View style={styles.avatar}>
                                    <MText>{item.name.substring(0,2)}</MText>
                                </View>
                                <SizeBox width={10}/>
                                <MText>{item.name}</MText>
                            </Row>
                            <MButton
                            // disabled
                            style={{
                                height:40,
                                paddingHorizontal:10
                            }}
                            onPress={()=>props.followUser(item._id)}
                            label="Add"
                            icon={<PlusIcon color={'black'}/>}
                            />
                        </Row>
                    )
                }}
                />
                

            </Column>

    )
}

export default ModalFriend

const styles = StyleSheet.create({
    columnOne: {
        alignItems: 'center'
    },
    avatar :{
        width:50,
        height:50,
        borderRadius:40,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'gray',

    }
})