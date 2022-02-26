import React, { Component } from "react";
import { SafeAreaView, BackHandler, StatusBar, View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

const addressesList = [
    {
        id: '1',
        address: '121, Yogi Villa, Opera Street, New York.',
        type: 'home',
    },
    {
        id: '2',
        address: '121, Yogi Villa, Opera Street, New York.',
        type: 'work',
    },
    {
        id: '3',
        address: '121, Yogi Villa, Opera Street, New York.',
        type: 'other',
    },
];

class MyAddressesScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.goBack()
        return true;
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1, }}>
                    {this.header()}
                    {this.addresses()}
                </View>
                {this.addNewAddressButton()}
            </SafeAreaView>
        )
    }

    addNewAddressButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('AddNewAddress')}
                style={styles.addNewAddressButtonStyle}>
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Add new address
                </Text>
            </TouchableOpacity>
        )
    }

    addresses() {
        const renderItem = ({ item }) => (
            <View style={styles.addressWrapStyle}>
                <View style={styles.addressIconWrapStyle}>
                    {item.type == 'home' ?
                        <MaterialIcons name="home" size={30} color={Colors.primaryColor} />
                        :
                        item.type == 'work' ?
                            <MaterialIcons name="work" size={30} color={Colors.primaryColor} />
                            :
                            <MaterialIcons name="language" size={30} color={Colors.primaryColor} />
                    }
                </View>
                <Text style={{
                    width: width / 1.7,
                    ...Fonts.blackColor14Medium,
                    marginLeft: Sizes.fixPadding
                }}>
                    {item.address}
                </Text>
            </View>
        )
        return (
            <FlatList
                data={addressesList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: Sizes.fixPadding * 2.0,
                    paddingBottom: Sizes.fixPadding * 6.0
                }}
            />
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor}
                    onPress={() => this.props.navigation.goBack()}
                    style={{ position: 'absolute', left: 20.0 }}
                />
                <Text style={{

                    ...Fonts.blackColor18Bold, marginLeft: Sizes.fixPadding + 5.0,
                }}>
                    My Address
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
    addressWrapStyle: {
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        borderColor: '#D7D7D7',
        borderWidth: 1.0,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        padding: Sizes.fixPadding * 2.0
    },
    addressIconWrapStyle: {
        width: 60.0,
        height: 60.0,
        borderRadius: 30.0,
        backgroundColor: '#D8D8D8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addNewAddressButtonStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        backgroundColor: Colors.primaryColor,
        height: 50.0,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

MyAddressesScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(MyAddressesScreen);