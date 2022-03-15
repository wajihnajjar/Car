import React, { Component, useState } from "react";
import { SafeAreaView, View, BackHandler, StatusBar, Dimensions, StyleSheet, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import axios from'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
var bookingList = [
];
const { width } = Dimensions.get('screen');
class MyBookingScreen extends Component {
state = {
arr:[]
}
componentDidMount() {
/*
id , 
image , 
name , 
adress , 
car : vovo 
:dataandTime
 serVice ; 
 isDone ; 
*/
bookingList=[]
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
AsyncStorage.getItem("user_id").then(res => {
    axios.post("http://192.168.159.22:5000/user/getReservation",{user_id:res}).then(res=> {
        var all = {
        id : null  , 
        image: require('../../assets/images/service_provider/provider_1.jpg'),
        service : "" , 
        isDone:true 
        }
        for (let i = 0 ; i< res.data.length; i++)
        bookingList.push({
            id : null  , 
            image: require('../../assets/images/service_provider/provider_1.jpg'),
            service : "" , 
            isDone:true 
            })
        for (let i = 0  ; i< res.data.length ; i ++){
        bookingList[i].id= res.data[i].mechanic_id
        console.log(res.data[i].reservation.split(",")[2])
        bookingList[i].services = res.data[i].reservation.split(",")[2] 
        bookingList[i].dateAndTime = res.data[i].reservation.split(",")[1] 
        if(res.data[i].response!="accept"){
        bookingList[i].isDone=true  
        }
        }
        })
        this.setState({
        arr: bookingList
        
        })
}) 
}
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }
    handleBackButton = () => {
        this.props.navigation.pop()
        return true;
    };
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {this.bookings()}
                </View>
            </SafeAreaView>
        )
    }
    bookings() {
        const renderItem = ({ item }) => (
            <View style={styles.bookingInfoWrapStyle}>
                <Image
                    source={item.image}
                    style={styles.bookingImageStyle}
                />
                <View style={{ padding: Sizes.fixPadding * 2.0 }}>
                    <Text style={{ ...Fonts.blackColor18Bold }}>
                        {item.name}
                    </Text>
                    <Text style={{ ...Fonts.grayColor12Medium, marginBottom: Sizes.fixPadding - 3.0 }}>
                        {item.address}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Sizes.fixPadding - 3.0 }}>
                        <Text style={{ ...Fonts.blackColor14Bold, marginRight: Sizes.fixPadding - 5.0 }}>
                            Car:
                        </Text>
                        <Text style={{ ...Fonts.blackColor14Regular }}>
                            {item.car}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Sizes.fixPadding - 3.0 }}>
                        <Text style={{ ...Fonts.blackColor14Bold, marginRight: Sizes.fixPadding - 5.0 }}>
                            Date & Time:
                        </Text>
                        <Text style={{ ...Fonts.blackColor14Regular }}>
                            {item.dateAndTime}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={{ ...Fonts.blackColor14Bold, marginRight: Sizes.fixPadding - 5.0 }}>
                            Services:
                        </Text>
                        <Text style={{ width: width / 1.7, ...Fonts.blackColor14Regular }}>
                            {item.services}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        if(item.isDone)
                        {
                            this.props.navigation.push('Rate' ,{id :item.id})
                        
                    
                    }
                        else 
                        this.props.navigation.push('BookingDetail')
                    }}
                    style={styles.moreDetailOrRateNowButtonStyle}
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
            </View >
        )
        return (
            <FlatList
                data={bookingList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}
            />
        )
    } 
       header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor}
                    onPress={() => this.props.navigation.pop()}
                    style={{ position: 'absolute', left: 20.0 }}
                />
                <Text style={{ ...Fonts.blackColor18Bold, marginLeft: Sizes.fixPadding + 5.0, }}>
                    My appointment
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        height: 56.0,
        elevation: 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    bookingInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding + 5.0,
    },
    bookingImageStyle: {
        height: 228.0,
        width: '100%',
        borderTopLeftRadius: Sizes.fixPadding,
        borderTopRightRadius: Sizes.fixPadding
    },
    moreDetailOrRateNowButtonStyle: {
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 8.0,
        paddingVertical: Sizes.fixPadding - 7.0,
        alignSelf: 'center',
        marginBottom: Sizes.fixPadding * 2.0
    }
})

MyBookingScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(MyBookingScreen);