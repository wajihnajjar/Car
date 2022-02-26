import React, { Component } from "react";
import { SafeAreaView, BackHandler, View, StatusBar, StyleSheet, Text, TouchableOpacity, } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { TransitionPresets } from 'react-navigation-stack';

class RateScreen extends Component {

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
        rate1: false,
        rate2: false,
        rate3: false,
        rate4: false,
        rate5: false,
        review: '',
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {this.rating()}
                    {this.reviewField()}
                    {this.submitButton()}
                </View>
            </SafeAreaView>
        )
    }

    submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.pop()}
                style={styles.submitButtonStyle} >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Submit
                </Text>
            </TouchableOpacity>
        )
    }

    reviewField() {
        return (
            <TextInput
                mode="outlined"
                selectionColor={Colors.primaryColor}
                placeholder="Write your review here"
                placeholderTextColor={Colors.grayColor}
                value={this.state.review}
                onChangeText={text => this.setState({ review: text })}
                style={styles.textFieldWrapStyle}
                multiline={true}
                numberOfLines={6}
                theme={{ colors: { primary: Colors.primaryColor } }}
            />
        )
    }

    rating() {
        return (
            <View style={styles.ratingWrapStyle}>
                <MaterialIcons
                    name={this.state.rate1 ? "star" : "star-border"}
                    size={33}
                    color={Colors.ratingColor}
                    onPress={() => {
                        if (this.state.rate1) {
                            this.setState({
                                rate2: false,
                                rate3: false,
                                rate4: false,
                                rate5: false,
                            })
                        }
                        else {
                            this.setState({ rate1: true })
                        }
                    }}
                />
                <MaterialIcons
                    name={this.state.rate2 ? "star" : "star-border"}
                    size={33}
                    color={Colors.ratingColor}
                    onPress={() => {
                        if (this.state.rate2) {
                            this.setState({
                                rate1: true,
                                rate3: false,
                                rate4: false,
                                rate5: false,
                            })
                        }
                        else {
                            this.setState({
                                rate2: true,
                                rate1: true,
                            })
                        }
                    }}
                />
                <MaterialIcons
                    name={this.state.rate3 ? "star" : "star-border"}
                    size={33}
                    color={Colors.ratingColor}
                    onPress={() => {
                        if (this.state.rate3) {
                            this.setState({
                                rate4: false,
                                rate5: false,
                                rate2: true,
                            })
                        }
                        else {
                            this.setState({
                                rate3: true,
                                rate2: true,
                                rate1: true,
                            })
                        }
                    }}
                />
                <MaterialIcons
                    name={this.state.rate4 ? "star" : "star-border"}
                    size={33}
                    color={Colors.ratingColor}
                    onPress={() => {
                        if (this.state.rate4) {
                            this.setState({
                                rate5: false,
                                rate3: true,
                            })
                        }
                        else {
                            this.setState({
                                rate4: true,
                                rate3: true,
                                rate2: true,
                                rate1: true,
                            })
                        }
                    }}
                />
                <MaterialIcons
                    name={this.state.rate5 ? "star" : "star-border"}
                    size={33}
                    color={Colors.ratingColor}
                    onPress={() => {
                        if (this.state.rate5) {
                            this.setState({
                                rate4: true,
                            })
                        }
                        else {
                            this.setState({
                                rate5: true,
                                rate4: true,
                                rate3: true,
                                rate2: true,
                                rate1: true,
                            })
                        }
                    }}
                />
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
                    Rate Your Service Provider
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
    ratingWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Sizes.fixPadding * 3.0
    },
    textFieldWrapStyle: {
        ...Fonts.blackColor14Regular,
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        marginVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding,
    },
    submitButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding + 10.0,
        alignItems: 'center',
        justifyContent: 'center',
        height: 56.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 3.0,
    }
})

RateScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(RateScreen);