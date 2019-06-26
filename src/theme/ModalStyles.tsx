import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import {Colors, Fonts, Metrics} from "./index";

export default StyleSheet.create({

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
    // modalItem: {
    //     color: Colors.mainForeground,
    // },
    modalItem: {
        marginLeft: 0,
        marginRight: 0,
        width: '100%',
        paddingLeft: Metrics.tinyPadding,
        paddingRight: Metrics.tinyPadding,
        // marginBottom: 0,
        backgroundColor: Colors.modalTextBackground,
        color: Colors.modalTextForeground,
        borderRadius: Metrics.baseDoubleRadius,
        borderColor: Colors.modalTextBorder,
    },
    credentialSec: {
        width: '100%',
        padding: Metrics.basePadding,
    },
    credentialItem: {
        marginTop: Metrics.baseMargin,
        marginLeft: 0,
        marginRight: 0,
        paddingLeft: Metrics.tinyPadding,
        paddingRight: Metrics.tinyPadding,
        // marginBottom: 0,
        backgroundColor: Colors.modalTextBackground,
        borderRadius: Metrics.baseDoubleRadius,
        borderColor: Colors.modalTextBorder,
    },
    credentialIcon: {
        margin: 0,
        color: Colors.modalPlaceholder,
        fontSize: Fonts.Size.text,
    },
    credential: {
        color: Colors.modalForeground,
    },
    modalButtonsSec: {
        // position: 'absolute',
        // bottom: 0,
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalButtonSec: {
        marginLeft: Metrics.baseMargin,
        marginRight: Metrics.baseMargin,
    },
    modalButton: {
        marginTop: Metrics.baseMargin,
        width: '100%',
        height: Metrics.section,
        padding: Metrics.basePadding,
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
