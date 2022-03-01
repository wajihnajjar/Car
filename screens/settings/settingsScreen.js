import React, { Component } from "react";
import { SafeAreaView, View, BackHandler, StatusBar, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

class SettingsScreen extends Component {

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
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {this.title({ title: 'About' })}
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.props.navigation.push('PrivacyPolicy')}
                        >
                            {this.settingInfo({ title: 'Privacy policy' })}
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.props.navigation.push('TermsOfUse')}
                        >
                            {this.settingInfo({ title: 'Terms of use' })}
                        </TouchableOpacity>
                        {this.title({ title: 'App' })}
                        {this.settingInfo({ title: 'Support' })}
                        {this.settingInfo({ title: 'Report a bug' })}
                        {this.settingInfo({ title: 'App version 1.0' })}
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

    settingInfo({ title }) {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.blackColor16Medium }}>
                        {title}
                    </Text>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                </View>
                <View style={{ marginVertical: Sizes.fixPadding + 2.0, backgroundColor: Colors.grayColor, height: 0.8 }} />
            </View>
        )
    }

    title({ title }) {
        return (
            <Text style={{ ...Fonts.blackColor14Regular, margin: Sizes.fixPadding * 2.0 }}>
                {title}
            </Text>
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
                    Settings
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
})

SettingsScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(SettingsScreen);