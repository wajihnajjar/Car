import React, { Component } from "react";
import { SafeAreaView, View, BackHandler, StatusBar, StyleSheet, TouchableOpacity, Text, ScrollView } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from 'react-navigation-stack';

class BookingDetailScreen extends Component {

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
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 6.0 }}
                    >
                        {this.serviceProviderDetail()}
                        {this.divider()}
                        {this.carDetail()}
                        {this.divider()}
                        {this.dateAndTimeDetail()}
                        {this.divider()}
                        {this.servicesDetail()}
                        {this.divider()}
                        {this.totalAmountInfo()}
                    </ScrollView>
                    {this.cancelBookingButton()}
                </View>
            </SafeAreaView>
        )
    }

    cancelBookingButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.pop()}
                style={styles.cancelBookingButtonStyle}>
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Cancel Booking
                </Text>
            </TouchableOpacity>
        )
    }

    totalAmountInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ ...Fonts.blackColor18Bold }}>Total Amount</Text>
                <Text style={{ ...Fonts.primaryColor22Bold }}>$135</Text>
            </View>
        )
    }

    servicesDetail() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.primaryColor18Bold, marginBottom: Sizes.fixPadding }}>
                    Services
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.blackColor14Medium }}>
                        Engine Detailing
                    </Text>
                    <Text style={{ ...Fonts.blackColor14Medium, }}>
                        $85
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: Sizes.fixPadding - 5.0, alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.blackColor14Medium }}>
                        Body Wash
                    </Text>
                    <Text style={{ ...Fonts.blackColor14Medium, }}>
                        $50
                    </Text>
                </View>
            </View>
        )
    }

    dateAndTimeDetail() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.primaryColor18Bold, marginBottom: Sizes.fixPadding }}>
                    Date & Time Detail
                </Text>
                <Text style={{ ...Fonts.blackColor14Medium }}>
                    22 Feb, 2021
                </Text>
                <Text style={{ ...Fonts.blackColor14Regular, marginTop: Sizes.fixPadding - 5.0 }}>
                    10:00 AM
                </Text>
            </View>
        )
    }

    carDetail() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.primaryColor18Bold, marginBottom: Sizes.fixPadding }}>
                    Car Detail
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ ...Fonts.blackColor14Bold }}>
                        Car Model:
                    </Text>
                    <Text style={{ ...Fonts.blackColor14Regular, marginLeft: Sizes.fixPadding - 5.0 }}>
                        BMW X7
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: Sizes.fixPadding - 5.0 }}>
                    <Text style={{ ...Fonts.blackColor14Bold }}>
                        Car Number:
                    </Text>
                    <Text style={{ ...Fonts.blackColor14Regular, marginLeft: Sizes.fixPadding - 5.0 }}>
                        XYZ 007
                    </Text>
                </View>
            </View>
        )
    }

    divider() {
        return (
            <View style={{
                backgroundColor: Colors.grayColor, height: 5.0,
                marginVertical: Sizes.fixPadding + 8.0,
            }} />
        )
    }

    serviceProviderDetail() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding + 5.0 }}>
                <Text style={{ ...Fonts.primaryColor18Bold, marginBottom: Sizes.fixPadding }}>
                    Service Provider Detail
                </Text>
                <Text style={{ ...Fonts.blackColor16Medium }}>
                    Perfect Car Wash Service
                </Text>
                <Text style={{ ...Fonts.blackColor14Regular, marginTop: Sizes.fixPadding - 8.0 }}>
                    104, Apple Square, New York.
                </Text>
            </View>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor}
                    onPress={() => this.props.navigation.goBack()}
                    style={{ position: 'absolute', left: 20.0 }}
                />
                <Text style={{ ...Fonts.blackColor18Bold, marginLeft: Sizes.fixPadding + 5.0, }}>
                    Booking Details
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
    cancelBookingButtonStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50.0,
    }
})

BookingDetailScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS
    }
}

export default withNavigation(BookingDetailScreen);