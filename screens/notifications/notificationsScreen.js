import React, { useState, useRef, Component } from 'react';
import { Fonts, Colors, Sizes, } from "../../constants/styles";
import { Text,View,SafeAreaView,StatusBar,StyleSheet,Animated,Dimensions,BackHandler} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { withNavigation } from "react-navigation";
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';
import { TransitionPresets } from 'react-navigation-stack';

const { width } = Dimensions.get('screen');

const notificationList = [
    {
        key: '1',
        title: 'Get 30% Off',
        description: 'Use code carclean30 & get 30% off on your car service.',

    },
    {
        key: '2',
        title: 'Congratulations..',
        description: 'Congratulations.. Your car has been successfully serviced.',
    },
    {
        key: '3',
        title: 'Rate us now',
        description: 'Your feedback are very important for us.Tap here to rate us now.',
    },
];

class NotificationsScreen extends Component {

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

    render() {
        {console.log(this.props,'props')}
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <Notifications props={this.props} />
            </SafeAreaView>
        )
    }
}

const rowTranslateAnimatedValues = {};

const Notifications = ({ props }) => {

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [snackBarMsg, setSnackBarMsg] = useState('');

    const [listData, setListData] = useState(notificationList);

    Array(listData.length + 1)
        .fill('')
        .forEach((_, i) => {
            rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });

    const animationIsRunning = useRef(false);

    const onSwipeValueChange = swipeData => {

        const { key, value } = swipeData;

        if (
            value < -Dimensions.get('window').width &&
            !animationIsRunning.current
        ) {
            animationIsRunning.current = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {

                const newData = [...listData];
                const prevIndex = listData.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                const removedItem = listData.find(item => item.key === key);

                setSnackBarMsg(`${removedItem.title} dismissed`);

                setListData(newData);

                setShowSnackBar(true);

                animationIsRunning.current = false;
            });
        }
    };

    const renderItem = data => (
        <Animated.View
            style={[
                {
                    height: rowTranslateAnimatedValues[
                        data.item.key
                    ].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 100],
                    }),
                },
            ]}
        >
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <View style={styles.notificationWrapStyle}>
                    <View style={styles.notificationIconWrapStyle}>
                        <MaterialIcons name="notifications" size={28} color={Colors.whiteColor} />
                    </View>
                    <View style={{
                        marginLeft: Sizes.fixPadding + 5.0,
                        width: width - 140,
                    }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                            {data.item.title}
                        </Text>
                        <Text numberOfLines={2} style={{ ...Fonts.blackColor14Medium, marginTop: Sizes.fixPadding - 8.0 }}>
                            {data.item.description}
                        </Text>
                    </View>
                </View>
            </View>
        </Animated.View>
    );

    const renderHiddenItem = () => (
        <View style={styles.rowBack}>
        </View>
    );

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor}
                    onPress={() => props.navigation.pop()}
                    style={{ position: 'absolute', left: 20.0 }}
                />
                <Text style={{ ...Fonts.blackColor18Bold, marginLeft: Sizes.fixPadding + 5.0, }}>
                    Notifications
                </Text>
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: Colors.whiteColor, flex: 1, }}>
            {header()}
            {listData.length == 0 ?
                <View style={{
                    flex: 1,
                    alignItems: 'center', justifyContent: 'center',
                }}>
                    <MaterialIcons name="notifications-off" size={60} color={Colors.grayColor} />
                    <Text style={{ ...Fonts.grayColor20Bold, marginTop: Sizes.fixPadding }}>
                        No new notifications..
                    </Text>
                </View>
                :
                <SwipeListView
                    disableRightSwipe
                    data={listData}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-Dimensions.get('window').width}
                    onSwipeValueChange={onSwipeValueChange}
                    useNativeDriver={false}
                    contentContainerStyle={{ paddingVertical: Sizes.fixPadding + 2.0 }}
                />
            }
            <Snackbar
                style={styles.snackBarStyle}
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
            >
                {snackBarMsg}
            </Snackbar>
        </View>
    );
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
    notificationWrapStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: '#D7D7D7',
        borderWidth: 1.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding - 5.0,
        borderRadius: Sizes.fixPadding,
        elevation: 3.0,
        paddingLeft: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding
    },
    notificationIconWrapStyle: {
        height: 50.0,
        width: 50.0,
        backgroundColor: Colors.primaryColor,
        borderRadius: 25.0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        marginTop: Sizes.fixPadding - 3.0,
        marginBottom: Sizes.fixPadding + 3.0,
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333'
    }
});

NotificationsScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(NotificationsScreen);