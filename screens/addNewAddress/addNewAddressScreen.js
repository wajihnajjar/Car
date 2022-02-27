import React, { Component } from "react";
import { SafeAreaView, StatusBar, View, BackHandler, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker } from "react-native-maps";
import { TransitionPresets } from 'react-navigation-stack';

class AddNewAddressScreen extends Component {

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
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1, }}>
                    {this.header()}
                    {this.map()}
                    {this.addressInfo()}
                </View>
            </SafeAreaView>
        )
    }

    addressInfo() {
        return (
            <View style={styles.addressInfoWrapStyle}>
                <View style={styles.sheetIndicatorStyle} />
                <Text style={{
                    marginVertical: Sizes.fixPadding * 2.0,
                    marginHorizontal: Sizes.fixPadding,
                    ...Fonts.blackColor18Bold
                }}>
                    Type your Address
                </Text>
                <View style={styles.addressTextFieldWrapStyle}>
                    <MaterialIcons name="location-on" size={24} color={Colors.primaryColor} />
                    <TextInput
                        placeholder="Type your address here"
                        style={{ ...Fonts.blackColor16Medium, flex: 1, marginLeft: Sizes.fixPadding }}
                        selectionColor={Colors.primaryColor}
                        placeholderTextColor='gray'
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.props.navigation.pop()}
                    style={styles.addNewAddressButtonStyle}>
                    <Text style={{ ...Fonts.whiteColor18Bold }}>
                        Add new Address
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    map() {
        return (
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 37.33233141,
                    longitude: -122.0312186,
                    latitudeDelta: 0.003,
                    longitudeDelta: 0.003,
                }}
            >
                <Marker
                    coordinate={{ latitude: 37.33233141, longitude: -122.0312186 }}
                >
                    <Image
                        source={require('../../assets/images/custom_marker.png')}
                        style={{ width: 30.0, height: 30.0 }}
                    />
                </Marker>
            </MapView>
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
                    Add new address
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        height: 50.0,
        elevation: 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    addNewAddressButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 2.0,
        margin: Sizes.fixPadding * 2.0,
    },
    addressTextFieldWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    sheetIndicatorStyle: {
        backgroundColor: '#9E9E9E',
        borderRadius: Sizes.fixPadding,
        width: 40.0,
        height: 4.0,
        alignSelf: 'center'
    },
    addressInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        paddingTop: Sizes.fixPadding,
        borderTopColor: '#EEEEEE',
        borderTopWidth: 1.0,
    }
})

AddNewAddressScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(AddNewAddressScreen);