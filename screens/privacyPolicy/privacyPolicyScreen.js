import React, { Component } from "react";
import { SafeAreaView, BackHandler, View, StatusBar, Text, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from 'react-navigation-stack';

class PrivacyPolicyScreen extends Component {

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
                    {this.privacyPolicyInfo()}
                </View>
            </SafeAreaView>
        )
    }

    privacyPolicyInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding + 5.0 }}>
                <Text style={{ ...Fonts.blackColor14Regular }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Maecenas aenean scelerisque egestas turpis
                    suspendisse arcu eu. Vitae malesuada ac et arcu,
                    luctus condimentum nec. Egestas adipiscing et,
                    euismod elementum cras. Risus, est ullamcorper
                    urna vel consequat, quis at.
                </Text>
                <Text style={{ ...Fonts.blackColor14Regular, marginTop: Sizes.fixPadding }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Maecenas aenean scelerisque egestas turpis
                    suspendisse arcu eu. Vitae malesuada ac et arcu,
                    luctus condimentum nec. Egestas adipiscing et,
                    euismod elementum cras. Risus, est ullamcorper
                    urna vel consequat, quis at.
                </Text>
                <Text style={{ ...Fonts.blackColor14Regular, marginTop: Sizes.fixPadding }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Maecenas aenean scelerisque egestas turpis
                    suspendisse arcu eu. Vitae malesuada ac et arcu,
                    luctus condimentum nec. Egestas adipiscing et,
                    euismod elementum cras. Risus, est ullamcorper
                    urna vel consequat, quis at.
                </Text>
            </View>
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
                    Privacy Policy
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

PrivacyPolicyScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(PrivacyPolicyScreen)