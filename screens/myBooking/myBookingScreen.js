import React, { Component } from "react";
import { SafeAreaView, View, BackHandler, StatusBar, Dimensions, StyleSheet, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const bookingList = [
    {
        id: '1',
        image: require('../../assets/images/service_provider/provider_1.jpg'),
        name: 'Perfect Car Wash Services',
        address: '105, Apple Square, New york',
        car: 'BMW X7',
        dateAndTime: '10:00 AM, 20 Feb 2021',
        services: 'Interier Cleaning, Engine Detailing',
        isDone: false,
    },
    {
        id: '2',
        image: require('../../assets/images/service_provider/provider_2.jpg'),
        name: 'Quicky Car Wash Services',
        address: '115, Opera Hub, New york',
        car: 'Mercedes E Class',
        dateAndTime: '04:00 PM, 30 March 2021',
        services: 'Body Wash',
        isDone: true,
    },
    {
        id: '3',
        image: require('../../assets/images/service_provider/provider_3.jpg'),
        name: 'Speedy Car Services',
        address: 'G-8, My Honest Hub, New york',
        car: 'Volvo S90',
        dateAndTime: '02:00 PM,  02 April 2021',
        services: 'Body Wash, Interier Cleaning',
        isDone: false,
    },

];

const { width } = Dimensions.get('screen');

class MyBookingScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
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
                    onPress={() => item.isDone
                        ?
                        this.props.navigation.push('Rate')
                        :
                        this.props.navigation.push('BookingDetail')
                    }
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
                    My Booking
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