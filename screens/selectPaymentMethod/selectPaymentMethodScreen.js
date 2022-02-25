import React, { Component } from "react";
import { SafeAreaView, BackHandler, View, StatusBar, StyleSheet, Text, ScrollView, Dimensions, TouchableOpacity, Image } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import { TransitionPresets } from 'react-navigation-stack';

const { width } = Dimensions.get('screen');

class SelectPaymentMethodScreen extends Component {

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

    state = {
        currentPaymentMethodIndex: 1,
        showSuccessDialog: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 8.0 }}
                    >
                        {this.payableAmount()}
                        {this.paymentMethod({
                            icon: require('../../assets/images/payment/card.png'),
                            paymentType: 'Card',
                            index: 1,
                        })}
                        {this.paymentMethod({
                            icon: require('../../assets/images/payment/paypal.png'),
                            paymentType: 'Paypal',
                            index: 2,
                        })}
                        {this.paymentMethod({
                            icon: require('../../assets/images/payment/skrill.png'),
                            paymentType: 'Skrill',
                            index: 3,
                        })}
                    </ScrollView>
                    {this.payButton()}
                    {this.successDialog()}
                </View>
            </SafeAreaView>
        )
    }

    successDialog() {
        return (
            <Dialog.Container
                visible={this.state.showSuccessDialog}
                contentStyle={styles.dialogWrapStyle}
                headerStyle={{ margin: 0.0 }}
            >
                <View style={{ backgroundColor: Colors.whiteColor, alignItems: 'center' }}>
                    <View style={styles.successIconWrapStyle}>
                        <MaterialIcons name="done" size={24} color={Colors.primaryColor} />
                    </View>
                    <Text style={{ ...Fonts.grayColor18Bold, marginTop: Sizes.fixPadding }}>
                        Success
                    </Text>
                </View>
            </Dialog.Container>
        )
    }

    payButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    this.setState({ showSuccessDialog: true })
                    setTimeout(() => {
                        this.setState({ showSuccessDialog: false })
                        this.props.navigation.push('Home');
                    }, 2000);
                }
                }
                style={styles.payButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Pay
                </Text>
            </TouchableOpacity>
        )
    }

    payableAmount() {
        return (
            <TouchableOpacity style={{
                flexDirection: 'row',
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding,
                marginBottom: Sizes.fixPadding - 5.0
            }}>
                <Text style={{ ...Fonts.primaryColor18Bold }}>
                    Pay:
                </Text>
                <Text style={{ ...Fonts.blackColor18Medium, marginLeft: Sizes.fixPadding - 5.0 }}>
                    $50
                </Text>
            </TouchableOpacity>
        )
    }

    paymentMethod({ icon, paymentType, index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.setState({ currentPaymentMethodIndex: index })}
                style={{
                    borderColor: this.state.currentPaymentMethodIndex == index ? Colors.primaryColor : '#E0E0E0',
                    ...styles.paymentMethodWrapStyle
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={icon}
                        style={{
                            width: 55.0,
                            height: 55.0,
                        }}
                        resizeMode="contain"
                    />
                    <Text numberOfLines={1} style={{
                        ...Fonts.blackColor18Bold,
                        marginLeft: Sizes.fixPadding,
                        width: width / 2.2,
                    }}>
                        {paymentType}
                    </Text>
                </View>
                <View style={{
                    borderColor: this.state.currentPaymentMethodIndex == index ? Colors.primaryColor : '#E0E0E0',
                    ...styles.radioButtonStyle
                }}>
                    {
                        this.state.currentPaymentMethodIndex == index ?
                            <View style={{
                                width: 12.0,
                                height: 12.0,
                                borderRadius: 6.0,
                                backgroundColor: Colors.primaryColor
                            }}>
                            </View>
                            :
                            null
                    }
                </View>
            </TouchableOpacity>
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
                    Select Payment Method
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
    paymentMethodWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        borderWidth: 1.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: Sizes.fixPadding,
    },
    radioButtonStyle: {
        width: 20.0,
        height: 20.0,
        borderRadius: 10.0,
        borderWidth: 1.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    payButtonOuterWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        borderTopColor: '#ECECEC',
        borderTopWidth: 1.0,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0
    },
    payButtonStyle: {
        position: 'absolute',
        left: 0.0,
        right: 0.0,
        bottom: 0.0,
        backgroundColor: Colors.primaryColor,
        height: 50.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogWrapStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 40,
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
    },
    successIconWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        width: 60.0,
        height: 60.0,
        borderRadius: 30.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding,
    },
})

SelectPaymentMethodScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(SelectPaymentMethodScreen);