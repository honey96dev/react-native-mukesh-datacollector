import React from "react";
import {Button, Col, Icon, Item, Row, Text, Textarea, View} from "native-base";
import Modal from "react-native-modal";
import {NUMBERS, STRINGS} from "../../tools";
import {Colors, Presets} from "../../theme";
import {ModalStyles} from '../../theme';

const modal = (show: boolean, feedback: string, doingSendFeedback: boolean, onFeedbackChanged: (text: string) => void, onSendFeedbackButtonPressed: () => void, onClose: () => void) => {
    return (
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
                <Text style={[Presets.h3.bold, ModalStyles.modalTitle]}>{STRINGS.sendFeedback}</Text>
                <Text
                    style={[Presets.textFont.regular, ModalStyles.modalDescription]}>{STRINGS.sendFeedbackDescription}</Text>
                <Item regular style={ModalStyles.modalItem}>
                <Textarea rowSpan={10}
                          // disabled={!!doingSendFeedback}
                          style={[ModalStyles.modalItem, Presets.textFont.regular]} value={feedback}
                          onChangeText={onFeedbackChanged}/>
                </Item>
                <View style={ModalStyles.modalButtonsSec}>
                    <Row>
                        <Col style={ModalStyles.modalButtonSec}>
                            <Button style={[Presets.modalRejectButton, ModalStyles.modalButton]}
                                    onPress={onClose}>
                                <Icon style={[Presets.textFont.regular, ModalStyles.modalButtonIcon]} type={'FontAwesome5'} name={'times'}/>
                                <Text uppercase={false} style={[Presets.textFont.semiBold, ModalStyles.modalButtonText]}>{STRINGS.close}</Text>
                            </Button>
                        </Col>
                        <Col style={ModalStyles.modalButtonSec}>
                            <Button style={[Presets.modalAcceptButton, ModalStyles.modalButton]}
                                    onPress={onSendFeedbackButtonPressed}>
                                <Icon style={[Presets.textFont.regular, ModalStyles.modalButtonIcon]} type={'FontAwesome'} name={'paper-plane'}/>
                                <Text uppercase={false} style={[Presets.textFont.semiBold, ModalStyles.modalButtonText]}>{STRINGS.send}</Text>
                            </Button>
                        </Col>
                    </Row>
                </View>
            </View>
        </Modal>
    );
};

export default modal;
