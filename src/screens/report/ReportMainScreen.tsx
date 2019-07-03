import React, {Component} from "react";
import {ScrollView, StyleSheet} from 'react-native';
import {NavigationScreenProps} from "react-navigation";
import {
    Body,
    Button,
    Container,
    Content,
    Header,
    Icon,
    Input,
    Item,
    Label,
    Left,
    List,
    ListItem,
    Right,
    Title,
    View
} from 'native-base';
// @ts-ignore
import {Colors, CommonStyles, Fonts, Metrics, Presets} from '../../theme';
// @ts-ignore
import {STRINGS} from "../../tools";
import {ROUTES} from "../../routes";
import {api_list, fetch, GET} from "../../apis";
import MyAlert from "../../components/MyAlert";

import {connect} from 'react-redux';
import {
    addReport,
    deleteReport,
    deleteReportByForm,
    editReport,
    listReport,
    setCreateReportMode,
    setReportProcMode,
    setSelectedFormData
} from '../../actions/reports';

interface MyProps {
    selectedFolder: any,
    reportProcMode: string,
    reports: Array<any>,
    listReport: (items: Array<any>) => void,
    addReport: (item: any) => void,
    deleteReport: (item: any) => void,
    deleteReportByForm: (form: any) => void,
    editReport: (prev: any, current: any) => void,
    setSelectedFormData: (data: any) => void,
    setCreateReportMode: (data: any) => void,
    setReportProcMode: (data: any) => void,
}

type Props = MyProps & NavigationScreenProps;

class ReportMainScreen extends Component<Props> {
    state = {
        showAlert: false,
        alertTitle: '',
        alertMessage: '',

        searchWord: '',

        forms: [],
    };

    constructor(props: Props) {
        super(props);
    }

    componentDidMount(): void {
        // @ts-ignore
        fetch(GET, api_list.reportList, {})
            .then((response: any) => {
                // console.log(response);
                if (response.result == STRINGS.success) {
                    // this.props.navigation.navigate(ROUTES.Profile);
                    this.props.listReport(response.data);
                } else {
                    this.props.listReport([]);
                }
            })
            .catch(err => {
                console.log(err);
                this.props.listReport([]);
            });

        // @ts-ignore
        fetch(GET, api_list.folder2Forms, {folderId: this.props.selectedFolder._id})
            .then((response: any) => {
                // console.log(response);
                if (response.result == STRINGS.success) {
                    let forms1 = response.data;
                    // @ts-ignore
                    fetch(GET, api_list.formList, {folderId: this.props.selectedFolder._id})
                        .then((response: any) => {
                            // console.log(response);
                            if (response.result == STRINGS.success) {
                                let forms2 = response.data;
                                for (let form1 of forms1) {
                                    for (let form2 of forms2) {
                                        if (form1['_id'] == form2['_id']) {
                                            form1['reports'] = form2['reports'];
                                            break;
                                        }
                                    }
                                }

                                this.setState({forms: forms1});
                                // this.setState({forms: response.data});
                            } else {
                                this.setState({forms: []});
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            this.setState({forms: []});
                        });

                } else {
                    this.setState({forms: []});
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({forms: []});
            });
            // .finally(() => {
            //     this.setState({
            //         doingRegister: false,
            //     });
            // });
    }

    hideAlert = () => {
        this.setState({
            showAlert: false,
        })
    };

    onBackButtonPressed = () => {
        this.props.navigation.navigate(ROUTES.ReportFolder);
    };

    onKeyValueFieldChanged = (key: any, value:any) => {
        this.setState({
            [key]: value,
        });
    };

    onListItemPressed = (value: any) => {
        // let {forms} = this.state;
        // // @ts-ignore
        // const index = columns.indexOf(value);
        // console.log(value);
        this.props.setSelectedFormData({
            id: value._id,
            columns: value.columns,
        });
        this.props.navigation.navigate(ROUTES.ReportList);
    };

    render() {
        const self = this;
        const {showAlert, alertTitle, alertMessage, searchWord} = self.state;

        const searchWord2 = searchWord.length > 2 ? searchWord : '';

        const {reportProcMode} = self.props;
        const {forms} = self.state;
        return (
            <Container style={styles.container}>
                <Header
                    style={CommonStyles.header}>
                    <Left style={CommonStyles.headerLeft}>
                        <Button
                            transparent
                            onPress={self.onBackButtonPressed}
                        >
                            <Icon style={[Presets.h3.regular, CommonStyles.headerIcon]} type={"FontAwesome5"}
                                  name="angle-left"/>
                        </Button>
                    </Left>
                    <Body style={CommonStyles.headerBody}>
                    <Title style={[Presets.h4.bold, CommonStyles.headerTitle]}>{reportProcMode == STRINGS.maintenanceMain ? STRINGS.maintenanceMain : STRINGS.reportMain}</Title>
                    </Body>
                    <Right style={CommonStyles.headerRight}>
                    </Right>
                </Header>
                <Content contentContainerStyle={styles.content}>
                    <Body style={styles.body}>
                    <Item regular style={styles.credentialItem}>
                        <Icon style={styles.credentialIcon} type={'FontAwesome5'} name={'search'}/>
                        <Input style={[styles.credential, Presets.textFont.regular]} value={searchWord} placeholderTextColor={Colors.placeholder} placeholder={STRINGS.search} onChangeText={(text) => self.onKeyValueFieldChanged('searchWord', text)}/>
                        {/*<Icon style={styles.credentialIcon} type={'FontAwesome5'} name={'arrow-right'} onPress={}/>*/}
                    </Item>
                    <ScrollView style={styles.scrollSec}>
                        <List style={styles.scrollSec}>
                            {forms.map((value: any, index: number) => {
                                if (value.name.includes(searchWord2)) {
                                    return (
                                        <ListItem style={styles.listItem}
                                                  onPress={() => self.onListItemPressed(value)}>
                                            {/*<Left style={styles.listItemLeft}>*/}
                                            {/*<Label style={Presets.h5.regular}>Name:</Label>*/}
                                            {/*<Label style={Presets.h6.regular}>Columns Count:</Label>*/}
                                            {/*</Left>*/}
                                            <Body>
                                            <Label style={Presets.h5.regular}>{index + 1}. {value.name}</Label>
                                            {/*<Label style={Presets.h6.regular}>Reports*/}
                                                {/*Count: {value.reports.length}</Label>*/}
                                            {/*<Label style={Presets.h6.regular}>{columnIdx}</Label>*/}
                                            </Body>
                                            <Right>
                                                {/*<Button*/}
                                                {/*transparent*/}
                                                {/*onPress={() => self.onDeleteListItemButtonPressed(value)}*/}
                                                {/*>*/}
                                                <View style={styles.listItemRight}>
                                                    <Label style={Presets.h6.regular}>#{value.reports.length}</Label>
                                                    <Icon
                                                        style={[Presets.h4.regular, CommonStyles.headerIcon, styles.listItemIcon]}
                                                        type={"FontAwesome5"} name="angle-right"/>
                                                </View>
                                                {/*</Button>*/}
                                            </Right>
                                        </ListItem>
                                    );
                                }
                            })}
                        </List>
                    </ScrollView>
                    </Body>
                </Content>
                {MyAlert(showAlert, alertTitle, alertMessage, self.hideAlert)}
                {/*{MyConfirm(showConfirm, confirmTitle, confirmMessage, self.hideConfirm, self.onDeleteForm)}*/}
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
    scrollSec: {
        width: '100%',
        // marginTop: Metrics.baseDoubleMargin,
        // flexDirection: 'column',
        // alignItems: "flex-start",
    },
    listItem: {
        marginLeft: 0,
        marginRight: 0,
        paddingLeft: 0,
        paddingRight: 0,
    },
    listItemLeft: {
        width: Metrics.doubleSection,
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    listItemRight: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    listItemDeleteIcon: {
        marginRight: 0,
        color: Colors.danger,
    },
    listItemIcon: {
        marginLeft: Metrics.baseMargin,
        marginRight: 0,
    },
    listItemAddButton: {
        marginTop: Metrics.baseMargin,
        width: '100%',
        // height: Metrics.section,
        // flexDirection: "column",
        justifyContent: "center",
        borderRadius: Metrics.baseDoubleRadius,
    },

});

const mapStateToProps = (state: any) => {
    // console.log(state);
    return {
        selectedFolder: state.folders.selectedFolder,
        reports: state.reports.items,
        reportProcMode: state.reports.reportProcMode,
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        listReport: (forms: any) => {
            dispatch(listReport(forms));
        },
        addReport: (form: any) => {
            dispatch(addReport(form));
        },
        deleteReport: (form: any) => {
            dispatch(deleteReport(form));
        },
        deleteReportByForm: (form: any) => {
            dispatch(deleteReportByForm(form));
        },
        editReport: (prev: any, current: any) => {
            dispatch(editReport(prev, current));
        },
        setSelectedFormData: (data: any) => {
            dispatch(setSelectedFormData(data));
        },
        setCreateReportMode: (data: any) => {
            dispatch(setCreateReportMode(data));
        },
        setReportProcMode: (data: any) => {
            dispatch(setReportProcMode(data));
        },
    }
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(ReportMainScreen);
