import React from "react";
import {StyleSheet} from "react-native";
import {Button, Icon, Text, View} from "native-base";
import Modal from "react-native-modal";
import {WebView} from 'react-native-webview';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {NUMBERS, STRINGS} from "../../tools";
import {Colors, Metrics, Presets} from "../../theme";
import {ModalStyles} from '../../theme';

const modal = (show: boolean, url: string, onClose: () => void) => (
    <Modal
        style={ModalStyles.modal}
        isVisible={show}
        animationIn={"bounceIn"}
        animationInTiming={NUMBERS.modalAnimationTiming3}
        animationOut={"bounceOut"}
        animationOutTiming={NUMBERS.modalAnimationTiming2}
        backdropColor={Colors.mainBackground1}
    >
        <View style={ModalStyles.modalContent}>
            <Text style={[Presets.h3.bold, ModalStyles.modalTitle]}>{STRINGS.about}</Text>
            <View style={styles.webpageSec}>
                <WebView
                    source={{uri: url}}
                    // url={url}
                    // style={styles.webpage}
                    // javaScriptEnabled={true}
                    // domStorageEnabled={true}
                />
            </View>
            <Button style={[Presets.modalAcceptButton, ModalStyles.modalButton]}
                    onPress={onClose}>
                <Icon style={[Presets.textFont.regular, ModalStyles.modalButtonIcon]} type={'FontAwesome5'}
                      name={'times'}/>
                <Text uppercase={false}
                      style={[Presets.textFont.semiBold, ModalStyles.modalButtonText]}>{STRINGS.close}</Text>
            </Button>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    webpageSec: {
        marginTop: Metrics.baseMargin,
        width: '100%',
        height: hp(70),
        backgroundColor: 'red',
    },
    webpage: {
        // flex: 1,
        // width: '100%',
        // height: hp(70),
    },
});

export default modal;
