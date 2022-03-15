import React from 'react';
import { SafeAreaView, View, BackHandler, StatusBar, StyleSheet, Text, Image, FlatList, Dimensions, TouchableOpacity } from "react-native";

const Feedback = ()=>{
    return(
        <View>
             <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => item.isDone
                        ?
                        this.props.navigation.push('Rate' ,{id :1})
                        :
                        this.props.navigation.push('BookingDetail')
                    }
                >
                    <Text style={{ ...Fonts.blackColor14Medium }}>
                        {
                            item.isDone ?
                                'Rate Now'
                                :
                                'More Detail'
                        }
                    </Text>
                </TouchableOpacity>
        </View>
    )
}
export default Feedback