import {NUMBERS} from "../tools";
import {Colors, Presets} from "../theme";
import {Button, Col, Icon, Row, Text, View} from "native-base";
import Modal from 'react-native-modal';
import React from "react";
import {StyleSheet} from "react-native";
import STRINGS from '../tools/STRINGS';
import ModalStyles from '../theme/ModalStyles';

export default (isShow: boolean, title: string, message: string, onNo?: () => void, onYes?: () => void, cancelable?: boolean) => {
    return (
        <Modal
            style={ModalStyles.modal}
            isVisible={isShow}
            animationIn={"bounceIn"}
            animationInTiming={NUMBERS.modalAnimationTiming3}
            animationOut={"bounceOut"}
            animationOutTiming={NUMBERS.modalAnimationTiming2}
            backdropColor={Colors.mainBackground1}
        >
            <View style={ModalStyles.modalContent}>
                <Text style={[Presets.h3.bold, ModalStyles.modalTitle]}>{title}</Text>
                <Text style={[Presets.textFont.regular, ModalStyles.modalDescription]}>{message}</Text>
                <View style={ModalStyles.modalButtonsSec}>
                    <Row>
                        <Col style={ModalStyles.modalButtonSec}>
                            <Button style={[Presets.modalRejectButton, ModalStyles.modalButton]}
                                    onPress={() => !!onNo && onNo()}>
                                <Icon style={[Presets.textFont.regular, ModalStyles.modalButtonIcon]} type={'FontAwesome5'} name={'times'}/>
                                <Text uppercase={false} style={[Presets.textFont.semiBold, ModalStyles.modalButtonText]}>{STRINGS.no}</Text>
                            </Button>
                        </Col>
                        <Col style={ModalStyles.modalButtonSec}>
                            <Button style={[Presets.modalAcceptButton, ModalStyles.modalButton]}
                                    onPress={() => !!onYes && onYes()}>
                                <Icon style={[Presets.textFont.regular, ModalStyles.modalButtonIcon]} type={'FontAwesome5'} name={'check'}/>
                                <Text uppercase={false} style={[Presets.textFont.semiBold, ModalStyles.modalButtonText]}>{STRINGS.yes}</Text>
                            </Button>
                        </Col>
                    </Row>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    // modal: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    // },
    // modalContent: {
    //     width: wp(90),
    //     padding: Metrics.basePadding,
    //     borderRadius: Metrics.baseDoubleRadius,
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     backgroundColor: Colors.modalBackground,
    // },
    // modalTitle: {
    //     color: Colors.mainForeground,
    // },
    // modalDescription: {
    //     // marginTop: Metrics.baseMargin,
    //     padding: Metrics.basePadding,
    //     color: Colors.mainForeground,
    // },
    // modalButtonsSec: {
    //     // position: 'absolute',
    //     // bottom: 0,
    //     // flex: 1,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    // },
    // modalButtonSec: {
    //     marginLeft: Metrics.baseMargin,
    //     marginRight: Metrics.baseMargin,
    // },
    // modalButton: {
    //     // marginTop: Metrics.baseMargin,
    //     width: '100%',
    //     height: Metrics.section,
    //     justifyContent: "center",
    //     borderRadius: Metrics.baseDoubleRadius,
    // },
    // modalButtonIcon: {
    //     // marginRight: 0,
    //     // paddingRight: 0,
    // },
    // modalButtonText: {
    //     marginLeft: 0,
    //     paddingLeft: 0,
    // },
});
