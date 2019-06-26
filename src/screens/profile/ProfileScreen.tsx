import React, {Component} from "react";
import {Image, ScrollView, StyleSheet} from 'react-native';
import {NavigationScreenProps} from "react-navigation";
import {
    Body,
    Button,
    Container,
    Content,
    Header,
    Icon,
    Label,
    Left,
    Right,
    Text,
    Title,
    Toast,
    View
} from 'native-base';
// @ts-ignore
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Colors, CommonStyles, Fonts, Images, Metrics, Presets} from '../../theme';
// @ts-ignore
import numeral from 'numeral';
import {NUMBERS, STRINGS} from "../../tools";
import QrcodeModal from './QrcodeModal';
import SendFeedbackModal from './SendFeedbackModal';
import AboutModal from './AboutModal';

interface MyProps {

}

type Props = MyProps & NavigationScreenProps;

export default class ProfileScreen extends Component<Props> {
    state = {
        showQrcodeModal: false,
        showReferrallMembersModal: false,
        showSendFeedbackModal: false,
        showAboutModal: false,

        balance: 6297502.123,
        dailyProfit: 223761.518,
        lifeProfit: 6014182.576,
        qrcode: '4281 0009 9290 6411',
        referrallCode: '0702440789',
        level: 25,

        feedback: '',

        aboutUrl: 'https://www.google.com',

        doingSendFeedback: false,
    };

    constructor(props: Props) {
        super(props);
    }

    hideQrcodeModal = () => {
        this.setState({
            showQrcodeModal: false,
        });
    };

    hideSendFeedbackModal = () => {
        this.setState({
            showSendFeedbackModal: false,
        });
    };

    hideAboutModal = () => {
        this.setState({
            showAboutModal: false,
        });
    };

    onQrcodeButtonPressed = () => {
        this.setState({
            showQrcodeModal: true,
        });
    };

    onReferrallCodeCopyButtonPressed = () => {
        Toast.show({
            text: STRINGS.copied,
            buttonText: STRINGS.okay,
            duration: NUMBERS.toastShowTime1,
            buttonStyle: {backgroundColor: Colors.colorSuccess},
        });
    };

    onReferrallMembersButtonPressed = () => {

    };

    onFeedbackButtonPressed = () => {
        this.setState({
            showSendFeedbackModal: true,
            feedback: '',
        });
    };

    onAboutButtonPressed = () => {
        this.setState({
            showAboutModal: true,
        });
    };

    onFeedbackChanged = (text: string) => {
        this.setState({
            feedback: text,
        })
    };

    onSendFeedbackButtonPressed = () => {

    };

    render() {
        const self = this;
        const {showQrcodeModal, showReferrallMembersModal, showSendFeedbackModal, showAboutModal, balance, dailyProfit, lifeProfit, qrcode, referrallCode, level, feedback, aboutUrl, doingSendFeedback} = self.state;
        return (
            <Container style={styles.container}>
                <Header
                    style={CommonStyles.header}>
                    <Left style={CommonStyles.headerLeft}>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.openDrawer()}
                        >
                            <Icon style={Presets.h3.regular} name="menu"/>
                        </Button>
                    </Left>
                    <Body style={CommonStyles.headerBody}>
                    <Title style={Presets.h4.bold}>{STRINGS.profile}</Title>
                    </Body>
                    <Right style={CommonStyles.headerRight}>
                    </Right>
                </Header>
                <Content contentContainerStyle={styles.content}>
                    <Body style={styles.body}>
                    <Image style={styles.photo} source={Images.avatarRound1}/>
                    <Label style={[styles.name, Presets.h4.regular]}>Alexandra</Label>
                    <View style={styles.profitSec}>
                        <View style={styles.balanceSec}>
                            <Icon style={[Presets.h4.regular, styles.dollarSign]} type={"FontAwesome5"}
                                  name={"dollar-sign"}/>
                            <Label
                                style={[Presets.h1.regular, styles.balance]}>{numeral(balance).format('0,0.00')}</Label>
                        </View>
                        <View style={styles.profitSec2}>
                            <View style={styles.profitNodeSec1}>
                                <View style={styles.profitNodeSec2}>
                                    <Icon style={[Presets.h5.regular, styles.profitIcon]} type={"FontAwesome5"}
                                          name={'download'}/>
                                    <View style={styles.profitNodeSec3}>
                                        <Label
                                            style={[Presets.textFont.regular, styles.profitText]}>{STRINGS.dailyProfitLabel}</Label>
                                        <Label
                                            style={[Presets.textFont.regular, styles.profitText]}>{numeral(dailyProfit).format('0,0.00')}</Label>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.profitNodeSec1}>
                                <View style={styles.profitNodeSec2}>
                                    <Icon style={[Presets.h5.regular, styles.profitIcon]} type={"FontAwesome5"}
                                          name={'download'}/>
                                    <View style={styles.profitNodeSec3}>
                                        <Label
                                            style={[Presets.textFont.regular, styles.profitText]}>{STRINGS.lifetimeProfitLabel}</Label>
                                        <Label
                                            style={[Presets.textFont.regular, styles.profitText]}>{numeral(lifeProfit).format('0,0.00')}</Label>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <ScrollView style={styles.scrollSec}>
                        <View style={styles.referrallSec}>
                            <Icon style={[Presets.h2.regular, styles.referrallSecIcon]} type={"FontAwesome5"}
                                  name={"code"}/>
                            <View>
                                <View style={styles.qrcodeSec}>
                                    <Label style={[Presets.textFont.regular, styles.referrallText]}>{qrcode}</Label>
                                    <Icon style={[Presets.h5.regular, styles.referrallCodeIcon]} type={"FontAwesome5"}
                                          name={"qrcode"} onPress={self.onQrcodeButtonPressed}/>
                                </View>
                                <View style={styles.referrallCodeSec}>
                                    <Label
                                        style={[Presets.textFont.regular, styles.referrallText]}>{STRINGS.referrallCode}{referrallCode}</Label>
                                    <Icon style={[Presets.h5.regular, styles.referrallCodeIcon]} type={"FontAwesome5"}
                                          name={"copy"} onPress={self.onReferrallCodeCopyButtonPressed}/>
                                </View>
                            </View>
                        </View>
                        <View style={styles.levelSec}>
                            <Icon style={[Presets.h2.regular, styles.levelSecIcon]} type={"FontAwesome5"}
                                  name={"balance-scale"}/>
                            <View>
                                <View style={styles.qrcodeSec}>
                                    <Label
                                        style={[Presets.textFont.regular, styles.referrallText]}>{STRINGS.level}</Label>
                                    <Label style={[Presets.textFont.regular, styles.referrallCodeIcon]}>{level}</Label>
                                </View>

                                <View style={styles.referrallCodeSec}>
                                    <Label
                                        style={[Presets.textFont.regular, styles.referrallText]}>{STRINGS.referrallMembers}</Label>
                                    <Icon style={[Presets.h5.regular, styles.referrallCodeIcon]} type={'FontAwesome5'}
                                          name={'list-alt'} onPress={self.onReferrallMembersButtonPressed}/>
                                </View>
                            </View>
                        </View>
                        <View style={styles.feedbackSec}>
                            <Button style={[Presets.primaryButton, styles.button]}
                                    onPress={self.onFeedbackButtonPressed}>
                                <Icon style={[Presets.textFont.regular, styles.buttonIcon]} type={'FontAwesome'}
                                      name={'comments'}/>
                                <Text uppercase={false}
                                      style={[Presets.textFont.semiBold, styles.buttonText]}>{STRINGS.sendFeedback}</Text>
                            </Button>
                        </View>
                        <View style={styles.feedbackSec}>
                            <Button style={[Presets.secondaryButton, styles.button]}
                                    onPress={self.onAboutButtonPressed}>
                                <Icon style={[Presets.textFont.regular, styles.buttonIcon]} type={'FontAwesome'}
                                      name={'question-circle'}/>
                                <Text uppercase={false}
                                      style={[Presets.textFont.semiBold, styles.buttonText]}>{STRINGS.about}</Text>
                            </Button>
                        </View>
                    </ScrollView>
                    </Body>
                </Content>
                {QrcodeModal(showQrcodeModal, qrcode, self.hideQrcodeModal)}
                {SendFeedbackModal(showSendFeedbackModal, feedback, doingSendFeedback, self.onFeedbackChanged, self.onSendFeedbackButtonPressed, self.hideSendFeedbackModal)}
                {AboutModal(showAboutModal, aboutUrl, self.hideAboutModal)}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.mainBackground,
    },
    content: {
        padding: Metrics.baseMargin,
        paddingTop: Metrics.basePadding + Metrics.statusBarHeight,
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    body: {
        width: '100%',
        height: '100%',
    },
    photo: {
        // marginTop: Metrics.baseMargin,
        width: Metrics.avatarWidth,
        height: Metrics.avatarWidth,
        borderRadius: Metrics.avatarWidth,
        resizeMode: 'stretch',
    },
    name: {
        // margin: Metrics.baseMargin / 2,
        color: Colors.mainForeground,
        // marginLeft:
    },
    profitSec: {
        // width: '80%',
        // margin: Metrics.smallPadding,
        // padding: Metrics.smallPadding,
        // backgroundColor: Colors.white,
        // borderRadius: Metrics.baseRadius,
        // borderTopWidth: 1,
        // borderLeftWidth: 1,
        // borderRightWidth: 1,
        // borderBottomWidth: 2,
        // borderTopColor: Colors.lightGray,
        // borderLeftColor: Colors.lightGray,
        // borderRightColor: Colors.lightGray,
        // borderBottomColor: Colors.primaryButtonBackground,
        flexDirection: "column",
        alignItems: "center",
    },
    balanceSec: {
        flexDirection: "row",
        alignItems: "center",
    },
    dollarSign: {
        marginRight: Metrics.smallMargin,
        color: Colors.primaryButtonBackground,
    },
    balance: {
        color: Colors.primaryButtonBackground,
        fontFamily: Fonts.Family.Oswald,
    },
    profitSec2: {
        width: '100%',
        flexDirection: "row",
        alignItems: "center",
    },
    profitNodeSec1: {
        width: '50%',
        flexDirection: "column",
        alignItems: "center",
    },
    profitNodeSec2: {
        flexDirection: "row",
        alignItems: "center",
    },
    profitNodeSec3: {
        flexDirection: "column",
        alignItems: "flex-start",
    },
    profitIcon: {
        marginRight: Metrics.smallMargin,
        color: Colors.mainForeground,
    },
    profitText: {
        color: Colors.mainForeground,
    },
    scrollSec: {
        marginTop: Metrics.baseDoubleMargin,
        // flexDirection: 'column',
        // alignItems: "flex-start",
    },
    referrallSec: {
        width: wp(90),
        backgroundColor: Colors.white,
        padding: Metrics.basePadding,
        borderRadius: Metrics.baseRadius,
        flexDirection: 'row',
        alignItems: "center",
    },
    referrallSecIcon: {
        marginRight: Metrics.baseMargin,
        color: Colors.primaryButtonBackground,
    },
    qrcodeSec: {
        flexDirection: 'row',
        alignItems: "center",
    },
    referrallCodeSec: {
        flexDirection: 'row',
        alignItems: "center",
    },
    referrallCodeIcon: {
        marginLeft: Metrics.smallMargin,
        color: Colors.modalRejectButtonBackground,
    },
    referrallText: {
        color: Colors.modalForeground,
    },

    levelSec: {
        marginTop: Metrics.baseMargin,
        width: wp(90),
        backgroundColor: Colors.white,
        padding: Metrics.basePadding,
        borderRadius: Metrics.baseRadius,
        flexDirection: 'row',
        alignItems: "center",
    },

    levelSecIcon: {
        marginRight: Metrics.baseMargin,
        color: Colors.primaryButtonBackground,
    },

    feedbackSec: {
        marginTop: Metrics.baseMargin,
        width: wp(90),
        flexDirection: 'row',
        alignItems: "center",
    },

    buttonsSec: {
        position: 'absolute',
        bottom: 0,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonSec: {
        margin: Metrics.baseMargin,
    },
    button: {
        width: '100%',
        padding: Metrics.basePadding,
        // flexDirection: "column",
        justifyContent: "center",
        borderRadius: Metrics.baseRadius,
    },
    buttonIcon: {
        // marginRight: 0,
        // paddingRight: 0,
    },
    buttonText: {
        marginLeft: 0,
        paddingLeft: 0,
        // textDecorationStyle: 'unset',
    },
    transparentButtonText: {
        // textDecorationStyle: 'unset',
        color: Colors.secondaryButtonBackground,
    },

    item: {
        color: Colors.mainForeground,
    },
    modalQrcode: {
        marginTop: Metrics.baseMargin,
    },
});
