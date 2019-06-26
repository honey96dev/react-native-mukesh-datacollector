import {NUMBERS} from "../tools";
import {Colors, Metrics, Presets} from "../theme";
import {Button, Icon, Text, View} from "native-base";
import Modal from 'react-native-modal';
import React from "react";
import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import STRINGS from "../tools/STRINGS";

export default (isShow: boolean, title: string, message: string, onOkay?: () => void, cancelable?: boolean) => {
    return (
        <Modal
            style={styles.modal}
            isVisible={isShow}
            animationIn={"bounceIn"}
            animationInTiming={NUMBERS.modalAnimationTiming3}
            animationOut={"bounceOut"}
            animationOutTiming={NUMBERS.modalAnimationTiming2}
            backdropColor={Colors.mainBackground1}
        >
            <View style={styles.modalContent}>
                <Text style={[Presets.h3.bold, styles.modalTitle]}>{title}</Text>
                <Text style={[Presets.textFont.regular, styles.modalDescription]}>{message}</Text>
                <Button style={[Presets.modalAcceptButton, styles.modalButton]} onPress={() => !!onOkay && onOkay()}>
                    <Icon style={[Presets.textFont.regular, styles.modalButtonIcon]} type={'FontAwesome5'} name={'check'}/>
                    <Text uppercase={false} style={[Presets.textFont.semiBold, styles.modalButtonText]}>{STRINGS.okay}</Text>
                </Button>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalContent: {
        width: wp(90),
        padding: Metrics.basePadding,
        borderRadius: Metrics.baseDoubleRadius,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: Colors.modalBackground,
    },
    modalTitle: {
        color: Colors.modalForeground,
    },
    modalDescription: {
        // marginTop: Metrics.baseMargin,
        padding: Metrics.basePadding,
        color: Colors.modalForeground,
    },
    modalButton: {
        // marginTop: Metrics.baseMargin,
        width: '100%',
        height: Metrics.section,
        justifyContent: "center",
        borderRadius: Metrics.baseDoubleRadius,
    },
    modalButtonIcon: {
        // marginRight: 0,
        // paddingRight: 0,
    },
    modalButtonText: {
        marginLeft: 0,
        paddingLeft: 0,
    },
});
