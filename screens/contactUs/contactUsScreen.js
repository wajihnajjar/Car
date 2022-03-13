import React, { Component } from "react";
import { SafeAreaView, View, StatusBar, BackHandler, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";

class ContactUsScreen extends Component {

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

    state = {
        name: '',
        email: '',
        message: '',
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {this.nameTextField()}
                    {this.emailTextField()}
                    {this.messageTextField()}
                    {this.submitButton()}
                </View>
            </SafeAreaView>
        )
    }

    submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.submitButton}
                onPress={ async () => {
                    await axios.post("http://192.168.159.22:5000/admin/addReview",{message:this.state.message}).then(res=> { 
console.log("Review Done ")
                    })
                    
                
                    
                    this.props.navigation.goBack()}
                }
                    >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Sumbit
                </Text>
            </TouchableOpacity>
        )
    }

    messageTextField() {
        return (
            <TextInput
                mode="outlined"
                selectionColor={Colors.primaryColor}
                placeholder="Write here"
                placeholderTextColor={Colors.grayColor}
                value={this.state.message}
                onChangeText={text => this.setState({ message: text })}
                multiline={true}
                numberOfLines={4}
                style={{ marginHorizontal: Sizes.fixPadding * 2.0, backgroundColor: Colors.whiteColor, marginTop: Sizes.fixPadding + 5.0 }}
                multiline={true}
                numberOfLines={6}
                theme={{ colors: { primary: Colors.primaryColor } }}
            />
        )
    }

    emailTextField() {
        return (
            <TextInput
                placeholder="Email Address"
                mode="outlined"
                placeholderTextColor={Colors.grayColor}
                value={this.state.email}
                onChangeText={text => this.setState({ email: text })}
                style={{ ...styles.textFieldStyle }}
                selectionColor={Colors.primaryColor}
                theme={{ colors: { primary: Colors.primaryColor, } }}
            />
        )
    }

    nameTextField() {
        return (
            <TextInput
                placeholder="Name"
                mode="outlined"
                placeholderTextColor={Colors.grayColor}
                value={this.state.name}
                onChangeText={text => this.setState({ name: text })}
                style={styles.textFieldStyle}
                selectionColor={Colors.primaryColor}
                theme={{ colors: { primary: Colors.primaryColor, } }}
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
                <Text style={{ ...Fonts.blackColor18Bold, marginLeft: Sizes.fixPadding + 5.0, }}>
                    Contact us
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
    textFieldStyle: {
        ...Fonts.grayColor16Medium,
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding,
        height: 40.0,
        paddingHorizontal: Sizes.fixPadding,
        marginTop: Sizes.fixPadding + 5.0,
    },
    submitButton: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding + 10.0,
        alignItems: 'center',
        justifyContent: 'center',
        height: 56.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 5.0,
    }
})

ContactUsScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(ContactUsScreen);