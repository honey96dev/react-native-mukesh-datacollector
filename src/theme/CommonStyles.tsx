import {StyleSheet} from "react-native";
import {Colors, Fonts, Metrics} from "./index";

export default StyleSheet.create({
    header: {
        backgroundColor: Colors.mainBackground,
        // shadowOffset: {height: 0, width: 0},
        // shadowOpacity: 0,
        elevation: 0,
    },
    headerLeft: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    headerBody: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    headerRight: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },

    headerIcon: {
        color: Colors.mainForeground,
    },

    headerTitle: {
        color: Colors.headerTitle,
    },

    title: {
        width: '100%',
        fontFamily: Fonts.Family.Nunino.Bold,
        fontSize: Fonts.Size.title,
        color: Colors.title,
    },
});
