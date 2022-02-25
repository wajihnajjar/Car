import React, { Component } from "react";
import { SafeAreaView, View, StatusBar, BackHandler, StyleSheet, Text, TextInput, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { BottomSheet } from 'react-native-elements';
import { TransitionPresets } from 'react-navigation-stack';

const colorsList = [
    {
        id: '1',
        color: '#FF0000',
    },
    {
        id: '2',
        color: '#FFFFFF',
    },
    {
        id: '3',
        color: '#5B44E8',
    },
    {
        id: '4',
        color: '#E5E3EF',
    },
    {
        id: '5',
        color: '#000000',
    },
];

class AddNewCarScreen extends Component {

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
        selectedCarColorId: colorsList[0].id,
        carBrandName: '',
        carModel: '',
        carNumber: '',
        showBottomSheet: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {this.cameraSelection()}
                        {this.carBrandNameTextField()}
                        {this.carModelTextField()}
                        {this.carNumberTextField()}
                        {this.selectColorInfo()}
                        {this.addCarButton()}

                    </ScrollView>
                    {this.addNewCarBottomSheet()}
                </View>
            </SafeAreaView>
        )
    }

    addNewCarBottomSheet() {
        return (
            <BottomSheet
                isVisible={this.state.showBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.setState({ showBottomSheet: false })}
                    style={styles.bottomSheetWrapStyle}
                >
                    <Text style={{ ...Fonts.blackColor18Bold, textAlign: 'center' }}>
                        Choose Option
                    </Text>
                    <View style={styles.bottomSheetDividerStyle} />
                    <View style={{ flexDirection: 'row', marginHorizontal: Sizes.fixPadding * 2.0 }}>
                        <MaterialIcons name="photo-camera" size={24} color={Colors.blackColor} />
                        <Text style={{ ...Fonts.blackColor16Medium, marginLeft: Sizes.fixPadding }}>
                            Camera
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: Sizes.fixPadding + 2.0, marginHorizontal: Sizes.fixPadding * 2.0 }}>
                        <MaterialIcons name="photo-album" size={24} color={Colors.blackColor} />
                        <Text style={{ ...Fonts.blackColor16Medium, marginLeft: Sizes.fixPadding }}>
                            Choose from gallery
                        </Text>
                    </View>
                </TouchableOpacity>
            </BottomSheet>
        )
    }

    addCarButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.pop()}
                style={styles.addCarButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Add Car
                </Text>
            </TouchableOpacity>
        )
    }

    selectColorInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.setState({ selectedCarColorId: item.id })}
                style={{
                    backgroundColor: item.color,
                    ...styles.displayColorStyle,
                }}>
                {
                    this.state.selectedCarColorId == item.id
                        ?
                        <MaterialIcons
                            name="check"
                            size={24}
                            color={item.color == '#ffffff' || item.color == '#FFFFFF' ? Colors.blackColor : Colors.whiteColor}
                        />
                        :
                        null
                }
            </TouchableOpacity>
        )
        return (
            <View style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding
            }}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    Select color
                </Text>
                <FlatList
                    data={colorsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={{ paddingTop: Sizes.fixPadding }}
                />
            </View>
        )
    }

    carNumberTextField() {
        return (
            <TextInput
                value={this.state.carNumber}
                onChangeText={(text) => this.setState({ carNumber: text })}
                selectionColor={Colors.primaryColor}
                placeholder="Enter car number"
                style={{ ...styles.textFieldStyle, marginTop: Sizes.fixPadding * 2.0 }}
                placeholderTextColor={Colors.grayColor}
            />
        )
    }

    carModelTextField() {
        return (
            <TextInput
                value={this.state.carModel}
                onChangeText={(text) => this.setState({ carModel: text })}
                selectionColor={Colors.primaryColor}
                placeholder="Enter car model"
                style={{ ...styles.textFieldStyle, marginTop: Sizes.fixPadding * 2.0 }}
                placeholderTextColor={Colors.grayColor}
            />
        )
    }

    carBrandNameTextField() {
        return (
            <TextInput
                value={this.state.carBrandName}
                onChangeText={(text) => this.setState({ carBrandName: text })}
                selectionColor={Colors.primaryColor}
                placeholder="Enter car brand name"
                style={styles.textFieldStyle}
                placeholderTextColor={Colors.grayColor}
            />
        )
    }

    cameraSelection() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.setState({ showBottomSheet: true })}
                style={styles.cameraSelectionStyle}>
                <MaterialIcons name="add-a-photo" size={30} color={Colors.primaryColor} />
            </TouchableOpacity>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    Add New Car
                </Text>
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color={Colors.blackColor}
                    style={{ position: 'absolute', left: 20.0, }}
                    onPress={() => this.props.navigation.pop()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        height: 50.0,
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textFieldStyle: {
        ...Fonts.blackColor16Bold,
        borderColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderWidth: 1.0,
        height: 44.0,
        paddingHorizontal: Sizes.fixPadding + 5.0
    },
    displayColorStyle: {
        width: 46.0,
        height: 46.0,
        borderRadius: 23.0,
        borderColor: Colors.blackColor,
        borderWidth: 1.0,
        marginRight: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addCarButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding + 10.0,
        alignItems: 'center',
        justifyContent: 'center',
        height: 56.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 5.0,
    },
    cameraSelectionStyle: {
        width: 100.0,
        height: 100.0,
        borderRadius: 50.0,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Sizes.fixPadding * 3.0
    },
    bottomSheetWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingTop: Sizes.fixPadding + 2.0,
        paddingBottom: Sizes.fixPadding + 2.0,
    },
    bottomSheetDividerStyle: {
        backgroundColor: Colors.grayColor,
        height: 1.0,
        marginVertical: Sizes.fixPadding + 2.0,
    }
})

AddNewCarScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(AddNewCarScreen);