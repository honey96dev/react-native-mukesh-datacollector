import React, {Component} from "react";
import {Animated, LayoutAnimation, StyleSheet, UIManager} from 'react-native';
import {NavigationScreenProps} from "react-navigation";
import {Body, Button, Container, Content, Icon, Input, Item, Label, Spinner, Text, View} from 'native-base';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AutoHeightImage from 'react-native-auto-height-image';
import {Colors, CommonStyles, Fonts, Images, Metrics, Presets} from '../../theme';
import {G, STRINGS} from '../../tools';
import {ROUTES} from "../../routes";
import MyAlert from "../../components/MyAlert";
import {fetch, api_list, GET, POST, PUT, DELETE} from '../../apis'

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

interface MyProps {

}

type Props = MyProps & NavigationScreenProps;

export default class SignInScreen extends Component<Props> {
    private animatedValue: Animated.Value;
    state = {
        showPassword: false,

        email: 'honey96dev@gmail.com',
        password: '123456',

        showModal: false,
        // resetPasswordEmail: '',

        doingSignIn: false,
        // doingResetPassword: false,
        // didResetPassword: false,

        showAlert: false,
        alertTitle: '',
        alertMessage: '',
    };

    constructor(props: Props) {
        super(props);
        this.animatedValue = new Animated.Value(0);
    }

    animateState(nextState: any | Pick<any, never> | null, delay: number = 0) {
        setTimeout(() => {
            this.setState(() => {
                LayoutAnimation.easeInEaseOut();
                return nextState;
            });
        }, delay);
    }

    // hideModal = () => {
    //     this.setState({
    //         showModal: false,
    //     });
    // };

    hideAlert = () => {
        this.setState({
            showAlert: false,
        });
    };
    //
    // resetPassword = () => {
    //     const self = this;
    //     let {resetPasswordEmail} = self.state;
    //     resetPasswordEmail = resetPasswordEmail.trim();
    //     if (resetPasswordEmail.length == 0) {
    //         this.setState({
    //             showAlert: true,
    //             alertTitle: STRINGS.email,
    //             alertMessage: STRINGS.emailRequired,
    //         });
    //         return;
    //     }
    //     if (!G.isValidEmail(resetPasswordEmail)) {
    //         this.setState({
    //             showAlert: true,
    //             alertTitle: STRINGS.email,
    //             alertMessage: STRINGS.emailInvalid,
    //         });
    //         return;
    //     }
    //     this.setState({
    //         doingResetPassword: true,
    //     });
    //     setTimeout(() => {
    //         this.setState({
    //             didResetPassword: true,
    //             doingResetPassword: false,
    //             showModal: false,
    //         });
    //         Toast.show({
    //             text: STRINGS.passwordReseted,
    //             buttonText: STRINGS.okay,
    //             duration: NUMBERS.toastShowTime2,
    //             buttonStyle: { backgroundColor: Colors.colorSuccess },
    //         });
    //     }, 1000);
    //     // setTimeout(() => {
    //     //     this.animateState({
    //     //         didResetPassword: true,
    //     //     });
    //     //     setTimeout(() => {
    //     //         this.setState({
    //     //             doingResetPassword: false,
    //     //             showAlert: false,
    //     //         });
    //     //     }, 3500);
    //     // }, 1000);
    // };

    onBackButtonPressed = () => {
        this.props.navigation.navigate(ROUTES.Logo);
    };

    onShowPasswordButtonPressed = () => {
        this.setState({
            showPassword: !this.state.showPassword,
        });
    };

    onKeyValueFieldChanged = (key: string, text: string) => {
        this.setState({
            [key]: text,
        });
    };
    //
    // onForgetPasswordButtonPressed = () => {
    //     this.setState({
    //         resetPasswordEmail: '',
    //         showModal: true,
    //         didResetPassword: false,
    //     });
    // };

    onSignInButtonPressed = () => {
        const self = this;
        let {email, password} = self.state;
        email = email.trim();
        if (email.length == 0) {
            this.setState({
                showAlert: true,
                alertTitle: STRINGS.email,
                alertMessage: STRINGS.emailRequired,
            });
            return;
        }
        if (!G.isValidEmail(email)) {
            this.setState({
                showAlert: true,
                alertTitle: STRINGS.email,
                alertMessage: STRINGS.emailInvalid,
            });
            return;
        }
        if (password.length == 0) {
            this.setState({
                showAlert: true,
                alertTitle: STRINGS.password,
                alertMessage: STRINGS.passwordRequired,
            });
            return;
        }
        this.setState({
            doingSignIn: true,
        });
        // @ts-ignore
        fetch(POST, api_list.signIn, {email, password})
            .then((response: any) => {
                console.log(response);
                if (response.result == STRINGS.success) {
                    G.UserProfile.role = response.role;
                    if (response.role == STRINGS.user1) {
                        this.props.navigation.navigate(ROUTES.CreateForm);
                    } else if (response.role == STRINGS.user2) {
                        this.props.navigation.navigate(ROUTES.CreateForm);
                    } else if (response.role == STRINGS.admin) {

                    }
                } else {
                    this.setState({
                        showAlert: true,
                        alertTitle: response.result,
                        alertMessage: response.message,
                    });
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    showAlert: true,
                    alertTitle: STRINGS.error,
                    alertMessage: STRINGS.passwordRequired,
                });
            })
            .finally(() => {
                this.setState({
                    doingSignIn: false,
                });
            });
        // setTimeout(() => {
        //     this.setState({
        //         doingSignIn: false,
        //     });
        //     this.props.navigation.navigate(ROUTES.Profile);
        // }, 500);
    };

    onNotRegisteredButtonPressed = () => {
        this.props.navigation.navigate(ROUTES.SignUp);
    };

    render() {
        const self = this;
        const {showPassword, email, password, doingSignIn, showAlert, alertTitle, alertMessage} = self.state;
        return (
            <Container style={styles.container}>
                {/*<Header style={CommonStyles.header}>*/}
                    {/*<Left style={CommonStyles.headerLeft} >*/}
                        {/*<Button*/}
                            {/*transparent*/}
                            {/*onPress={self.onBackButtonPressed} >*/}
                            {/*<Icon style={Presets.h3.regular} type={"FontAwesome5"} name="angle-left"/>*/}
                        {/*</Button>*/}
                    {/*</Left>*/}
                    {/*<Body style={CommonStyles.headerBody}>*/}
                    {/*<Title style={Presets.h4.bold}>{STRINGS.signIn}</Title>*/}
                    {/*</Body>*/}
                    {/*<Right style={CommonStyles.headerRight}>*/}
                    {/*</Right>*/}
                {/*</Header>*/}
                <Content contentContainerStyle={styles.content}>
                    <Body style={styles.body}>
                    <View style={styles.waveSec}>
                        <AutoHeightImage source={Images.wave} width={wp(100)}/>
                        <Label style={[CommonStyles.title, Presets.h3.bold, styles.title]}>{STRINGS.signIn}</Label>
                    </View>
                    {/*<Label style={[CommonStyles.title, Presets.h3.bold]}></Label>*/}
                    <View style={styles.credentialSec}>
                        <Item regular style={styles.credentialItem}>
                            <Icon style={styles.credentialIcon} type={'FontAwesome'} name={'envelope'}/>
                            <Input disabled={!!doingSignIn} style={[styles.credential, Presets.textFont.regular]} value={email} placeholderTextColor={Colors.placeholder} placeholder={STRINGS.email} onChangeText={(text) => self.onKeyValueFieldChanged('email', text)}/>
                        </Item>
                        <Item regular style={styles.credentialItem}>
                            <Icon style={styles.credentialIcon} type={'FontAwesome5'} name={'key'}/>
                            <Input disabled={!!doingSignIn} style={[styles.credential, Presets.textFont.regular]} value={password} placeholderTextColor={Colors.placeholder} placeholder={STRINGS.password} secureTextEntry={!showPassword} onChangeText={(text) => self.onKeyValueFieldChanged('password', text)}/>
                            <Icon style={styles.credentialIcon} type={'FontAwesome5'}
                                  name={showPassword ? 'eye-slash' : 'eye'} onPress={() => {!doingSignIn && self.onShowPasswordButtonPressed()}}/>
                        </Item>
                    </View>
                    <View style={styles.buttonsSec}>
                        <View style={styles.buttonInnerSec}>
                            {/*<Button disabled={!!doingSignin} transparent iconLeft style={[styles.flatButton]}*/}
                            {/*onPress={self.onForgetPasswordButtonPressed}>*/}
                            {/*<Text uppercase={false} style={[Presets.textFont.semiBold, styles.flatButtonText]}>{STRINGS.forgotPassword}</Text>*/}
                            {/*</Button>*/}
                            <Button disabled={!!doingSignIn} iconLeft style={[Presets.primaryButton, styles.button]}
                                    onPress={self.onSignInButtonPressed}>
                                {!!doingSignIn ? <Spinner color={Colors.primaryButtonText}/> :
                                    <Icon type={"FontAwesome5"} name={"sign-in-alt"}/>}
                                {!doingSignIn && <Text style={[Presets.textFont.semiBold]}>{STRINGS.signIn}</Text>}
                            </Button>
                            <Button disabled={!!doingSignIn} transparent style={[styles.flatButton]}
                                    onPress={self.onNotRegisteredButtonPressed}>
                                <Text uppercase={false} style={[Presets.textFont.semiBold]}>{STRINGS.notRegistered}</Text>
                            </Button>
                        </View>
                    </View>
                    </Body>
                </Content>
                {/*<Modal*/}
                    {/*style={ModalStyles.modal}*/}
                    {/*isVisible={showModal}*/}
                    {/*animationIn={"bounceIn"}*/}
                    {/*animationInTiming={NUMBERS.modalAnimationTiming3}*/}
                    {/*animationOut={"bounceOut"}*/}
                    {/*animationOutTiming={NUMBERS.modalAnimationTiming2}*/}
                    {/*backdropColor={Colors.mainBackground1}*/}
                {/*>*/}
                    {/*<View style={ModalStyles.modalContent}>*/}
                        {/*<Text style={[Presets.h3.bold, ModalStyles.modalTitle]}>{STRINGS.forgotPassword}</Text>*/}
                        {/*<Text style={[Presets.textFont.regular, ModalStyles.modalDescription]}>{STRINGS.forgotPasswordDescription}</Text>*/}
                        {/*<Item regular style={ModalStyles.credentialItem}>*/}
                            {/*<Icon style={ModalStyles.credentialIcon} type={'FontAwesome'} name={'envelope'}/>*/}
                            {/*<Input disabled={!!doingResetPassword} style={[ModalStyles.credential, Presets.textFont.regular]} value={resetPasswordEmail} placeholderTextColor={Colors.modalPlaceholder} placeholder={STRINGS.email} onChangeText={self.onResetPasswordEmailChanged}/>*/}
                        {/*</Item>*/}
                        {/*<View style={ModalStyles.modalButtonsSec}>*/}
                            {/*<Row>*/}
                                {/*<Col style={ModalStyles.modalButtonSec}>*/}
                                    {/*<Button style={[Presets.modalRejectButton, ModalStyles.modalButton]}*/}
                                            {/*onPress={self.hideModal}>*/}
                                        {/*<Icon style={[Presets.textFont.regular, ModalStyles.modalButtonIcon]} type={'FontAwesome5'} name={'times'}/>*/}
                                        {/*<Text uppercase={false} style={[Presets.textFont.semiBold, ModalStyles.modalButtonText]}>{STRINGS.cancel}</Text>*/}
                                    {/*</Button>*/}
                                {/*</Col>*/}
                                {/*<Col style={ModalStyles.modalButtonSec}>*/}
                                    {/*<Button style={[Presets.modalAcceptButton, ModalStyles.modalButton]}*/}
                                            {/*onPress={self.resetPassword}>*/}
                                        {/*{!!doingResetPassword ? <Spinner color={Colors.primaryButtonText}/> :*/}
                                            {/*<Icon style={[Presets.textFont.regular, ModalStyles.modalButtonIcon]} type={'FontAwesome5'} name={'undo-alt'}/>}*/}
                                        {/*<Text uppercase={false} style={[Presets.textFont.semiBold, ModalStyles.modalButtonText]}>{STRINGS.recover}</Text>*/}
                                    {/*</Button>*/}
                                {/*</Col>*/}
                            {/*</Row>*/}
                        {/*</View>*/}

                        {/*/!*{!!didResetPassword && <Text style={[Presets.textFont.regular, styles.modalDidResetPassword]}>*!/*/}
                        {/*/!*New password is sent to your email!*!/*/}
                        {/*/!*</Text>}*!/*/}
                    {/*</View>*/}
                {/*</Modal>*/}
                {MyAlert(showAlert, alertTitle, alertMessage, self.hideAlert)}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.mainBackground,
    },
    content: {
        // height: '100%',
        padding: Metrics.basePadding,
        paddingTop: Metrics.statusBarHeight,
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    body: {
        width: '100%',
        height: '100%',
    },
    // backSec: {
    //     width: '100%',
    //     // flex: 1,
    //     flexDirection: 'column',
    //     alignItems: 'flex-start',
    // },
    // back: {
    //     color: Colors.primaryButtonBackground,
    // },
    waveSec: {
        height: hp(25),
        // backgroundImage: Images.wave,
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        // position: 'absolute',
        marginTop: - hp(15),
        color: Colors.white,
    },
    credentialSec: {
        width: '100%',
        // marginTop: Metrics.baseDoubleMargin,
        padding: Metrics.basePadding,
    },
    credentialItem: {
        marginTop: Metrics.baseMargin,
        marginLeft: 0,
        marginRight: 0,
        paddingLeft: Metrics.tinyPadding,
        paddingRight: Metrics.tinyPadding,
        // marginBottom: 0,
        backgroundColor: Colors.textBackground,
        borderRadius: Metrics.baseDoubleRadius,
        borderColor: Colors.textBorder,
    },
    credentialIcon: {
        margin: 0,
        color: Colors.placeholder,
        fontSize: Fonts.Size.text,
    },
    credential: {
        color: Colors.textForeground,
    },
    buttonsSec: {
        position: 'absolute',
        width: '100%',
        marginStart: Metrics.baseMargin,
        marginEnd: Metrics.baseMargin,
        paddingStart: Metrics.basePadding,
        paddingEnd: Metrics.basePadding,
        bottom: 0,
        // marginTop: Metrics.baseMargin,
        // height: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    buttonInnerSec: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        width: '100%',
        height: Metrics.section,
        // flexDirection: "column",
        justifyContent: "center",
        borderRadius: Metrics.baseDoubleRadius,
    },
    flatButton: {
        // marginTop: Metrics.baseMargin,
        // marginBottom: Metrics.baseMargin,
        width: '100%',
        // flexDirection: "column",
        justifyContent: "center",
    },
    buttonText: {
        // textDecorationStyle: 'unset',
    },
    flatButtonText: {
        color: Colors.flatButtonText,
        paddingRight: 0,
    },
});