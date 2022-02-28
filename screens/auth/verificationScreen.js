import React, { Component } from "react";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    ImageBackground,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Dimensions,
    BackHandler,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { withNavigation } from "react-navigation";
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Sizes, Fonts } from "../../constants/styles";
import Dialog from "react-native-dialog";
import { CircleFade } from 'react-native-animated-spinkit';

const { width } = Dimensions.get('screen');

class VerificationScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop();
        return true;
    };

    state = {
        isLoading: false,
        firstDigit: '',
        secondDigit: '',
        thirdDigit: '',
        forthDigit: '',
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
                <ImageBackground
                    style={{ flex: 1 }}
                    source={require('../../assets/images/bg.jpg')}
                    resizeMode="cover"
                >
                    <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        colors={['black', 'rgba(0,0.10,0,0.70)', 'rgba(0,0,0,0.0)',]}
                        style={{ flex: 1, paddingHorizontal: Sizes.fixPadding * 2.0 }}
                    >
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        >
                           
                            {this.backArrow()}
                            {this.otpText()}
                            {this.verificationInfo()}
                            {this.otpFields()}
                            {this.resendInfo()}
                            {this.continueButton()}
                        </ScrollView>
                    </LinearGradient>
                </ImageBackground>
                {this.loading()}
            </SafeAreaView >
        )
    }
    otpText() {
        return (
          <Text style={{ ...Fonts.whiteColor18Medium, textAlign: "center" }}>
            We’ll send otp for verification
          </Text>
        );
      }
    backArrow() {
        return (
            <MaterialIcons
                name="arrow-back"
                size={24}
                color={Colors.whiteColor}
                style={{
                    marginTop: Sizes.fixPadding * 7.0,
                    marginBottom: Sizes.fixPadding
                }}
                onPress={() => this.props.navigation.pop()}
            />
        )
    }

    loading() {
        return (
            <Dialog.Container
                visible={this.state.isLoading}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <CircleFade size={56} color={Colors.primaryColor} />
                    <Text style={{
                        ...Fonts.grayColor12Medium,
                        marginTop: Sizes.fixPadding * 2.0,
                        marginBottom: Sizes.fixPadding
                    }}>
                        Please wait...
                    </Text>
                </View>
            </Dialog.Container>
        );
    }

    continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    this.setState({ isLoading: true })
                    setTimeout(() => {
                        this.setState({ isLoading: false })
                        this.props.navigation.push('Home');
                    }, 2000);
                }}
            >
                <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    colors={['rgba(219, 24, 24, 1.0)', 'rgba(219, 24, 24, 0.49)',]}
                    style={styles.continueButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor18Bold }}>
                        Continue
                    </Text>
                </LinearGradient>
            </TouchableOpacity >
        )
    }

    resendInfo() {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: Sizes.fixPadding * 7.0,
            }}>
                <Text style={{ ...Fonts.whiteColor14Medium, paddingBottom: Sizes.fixPadding - 8.0, alignSelf: 'flex-end', }}>
                    Didn’t receive otp code!
                </Text>
                <Text style={{ ...Fonts.whiteColor18Bold, marginLeft: Sizes.fixPadding - 5.0 }}>
                    Resend
                </Text>
            </View>
        )
    }

    otpFields() {
        return (
            <View style={styles.otpFieldsWrapStyle}>
                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.whiteColor}
                        value={this.state.firstDigit}
                        style={{ ...Fonts.whiteColor18Medium, }}
                        onChangeText={(text) => {
                            this.setState({ firstDigit: text })
                            this.secondTextInput.focus();
                        }}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.whiteColor}
                        value={this.state.secondDigit}
                        style={{ ...Fonts.whiteColor18Medium, }}
                        ref={(input) => { this.secondTextInput = input; }}
                        keyboardType="numeric"
                        onChangeText={(text) => {
                            this.setState({ secondDigit: text })
                            this.thirdTextInput.focus();
                        }}
                    />
                </View>

                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.whiteColor}
                        style={{ ...Fonts.whiteColor18Medium, }}
                        keyboardType="numeric"
                        value={this.state.thirdDigit}
                        ref={(input) => { this.thirdTextInput = input; }}
                        onChangeText={(text) => {
                            this.setState({ thirdDigit: text })
                            this.forthTextInput.focus();
                        }}

                    />
                </View>

                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.whiteColor}
                        style={{ ...Fonts.whiteColor18Medium, }}
                        keyboardType="numeric"
                        value={this.state.forthDigit}
                        ref={(input) => { this.forthTextInput = input; }}
                        onChangeText={(text) => {
                            this.setState({ forthDigit: text })
                            this.setState({ isLoading: true })
                            setTimeout(() => {
                                this.setState({ isLoading: false })
                                this.props.navigation.navigate('Home');
                            }, 2000);
                        }}
                    />
                </View>
            </View>
        )
    }

    verificationInfo() {
        return (
            <View style={{
                marginTop: Sizes.fixPadding * 3.0,
                marginBottom: Sizes.fixPadding * 4.0
            }}>
                <Text style={{ ...Fonts.whiteColor36Bold }}>
                    Verification
                </Text>
                <Text style={{ ...Fonts.whiteColor14Medium, }}>
                    Enter the otp code from the phone we just sent you
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    otpFieldsWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding * 4.0,
    },
    textFieldWrapStyle: {
        height: 60.0,
        width: 60.0,
        borderRadius: Sizes.fixPadding,
        backgroundColor: 'rgba(203, 189, 189, 0.73)',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        paddingLeft: Sizes.fixPadding - 4.0,
    },
    continueButtonStyle: {
        borderRadius: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 5.0,
        height: 56.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 40,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding,
    },
})

VerificationScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(VerificationScreen);