import React, {Component} from "react";
import {Dimensions, Image, Platform, StyleSheet} from "react-native";
import {NavigationScreenProps} from "react-navigation";
import {Container, Content, Icon, Left, List, ListItem, Text} from "native-base";
import {Colors, Images, Presets} from "../theme";
import ROUTES from "./ROUTES";
import {G, STRINGS} from "../tools";
import {connect} from 'react-redux';
import {setReportProcMode} from '../actions/reports';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

// const drawerCover = require("../../assets/images/drawer-cover.jpeg");
// const drawerImage = require("../../assets/images/logo-kitchen-sink.png");
// const drawerImage = require("../../assets/images/logo.png");
const items = [
    {
        name: STRINGS.folderMain,
        route: ROUTES.FolderMain,
        iconType: "FontAwesome",
        iconName: "folder-open",
        bg: "#C5F442",
        users: [STRINGS.admin],
    },
    {
        name: STRINGS.formMain,
        route: ROUTES.FormMain,
        iconType: "FontAwesome5",
        iconName: "clipboard-list",
        bg: "#C5F442",
        users: [STRINGS.admin],
    },
    {
        name: STRINGS.maintenanceMain,
        route: ROUTES.ReportFolder,
        iconType: "FontAwesome5",
        iconName: "hammer",
        bg: "#C5F442",
        users: [STRINGS.user1, STRINGS.user2, STRINGS.admin],
    },
    {
        name: STRINGS.reportMain,
        route: ROUTES.ReportFolder,
        iconType: "FontAwesome5",
        iconName: "binoculars",
        bg: "#C5F442",
        users: [STRINGS.user1, STRINGS.user2, STRINGS.admin],
    },
    // {
    //     name: STRINGS.setting,
    //     route: ROUTES.Setting,
    //     iconType: "FontAwesome5",
    //     iconName: "cog",
    //     bg: "#C5F442",
    // },
    {
        name: STRINGS.signOut,
        route: ROUTES.SignOut,
        iconType: "FontAwesome5",
        iconName: "sign-out-alt",
        bg: "#477EEA",
        types: "11",
        users: [STRINGS.user1, STRINGS.user2, STRINGS.admin],
    },
];
interface MyProps {
    reportProcMode: string,
    setReportProcMode: (data: any) => void,
}

type Props = MyProps & NavigationScreenProps;

class DrawerScreen extends Component<Props> {
    state = {
        navigationAllowed: true,
        shadowOffsetWidth: 1,
        shadowRadius: 4,
    };
    constructor(props: Props) {
        super(props);
    }

    onMenuClicked = (route: string, name: string) => {
        let self = this;
        if (!self.state.navigationAllowed) {
            return;
        }
        self.setState({navigationAllowed: false});
        setTimeout(() => {
            self.setState({navigationAllowed: true});
        }, 1000);
        if (name == STRINGS.maintenanceMain) {
            self.props.setReportProcMode(STRINGS.maintenanceMain);
        } else if (name == STRINGS.reportMain) {
            self.props.setReportProcMode(STRINGS.reportMain);
        }
        // else {
        //     this.props.setReportProcMode('undefined');
        // }
        self.props.navigation.navigate(route);
        self.props.navigation.closeDrawer();
    };

    render() {
        return (
            <Container>
                <Content
                    // bounces={false}
                    style={styles.content}
                >
                    <Image source={Images.logo} style={styles.drawerCover} />
                    <ListItem
                        style={styles.listItem}
                    >
                        <Left>
                            <Icon
                                type={"FontAwesome"}
                                name={"user"}
                                style={[Presets.textFont.regular, styles.icon]}
                            />
                            <Text style={[Presets.textFont.semiBold, styles.text]}>
                                Signed as: {G.UserProfile.data.name}
                            </Text>
                        </Left>
                    </ListItem>
                    {/*<Image*/}
                    {/*square*/}
                    {/*style={styles.drawerImage} source={drawerImage} />*/}

                    <List>
                        {items.map((value: any) => {
                            if (value.users.indexOf(G.UserProfile.data.role) !== -1) {
                                return (
                                    <ListItem
                                        style={styles.listItem}
                                        button
                                        // noBorder
                                        onPress={() => this.onMenuClicked(value.route, value.name)}
                                    >
                                        <Left>
                                            <Icon
                                                // active
                                                type={value.iconType}
                                                name={value.iconName}
                                                style={[Presets.textFont.regular, styles.icon]}
                                            />
                                            <Text style={[Presets.textFont.semiBold, styles.text]}>
                                                {value.name}
                                            </Text>
                                        </Left>
                                    </ListItem>
                                );
                            }
                        })}
                    </List>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: Colors.mainBackground,
        top: -1
    },
    drawerCover: {
        width: '100%',
        height: deviceHeight / 4,
        // width: 'unset',
        position: "relative",
        marginBottom: 10,
        resizeMode: "stretch",
    },
    drawerImage: {
        position: "absolute",
        left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
        top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
        width: 210,
        height: 75,
        resizeMode: "stretch",
    },
    listItem: {
        marginLeft: 0,
        paddingLeft: 18,
    },
    icon: {
        color: Colors.drawIconColor,
        fontSize: 26,
        width: 30
    },
    text: {
        marginLeft: 20,
        color: Colors.mainForeground,
    },
});

const mapStateToProps = (state: any) => {
    return {
        reportProcMode: state.reports.reportProcMode,
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        setReportProcMode: (data: any) => {
            dispatch(setReportProcMode(data));
        },
    }
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(DrawerScreen);
