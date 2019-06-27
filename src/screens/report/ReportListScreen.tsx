import React, {Component} from "react";
import {ScrollView, StyleSheet} from 'react-native';
import {NavigationScreenProps} from "react-navigation";
import {Body, Button, Container, Content, Header, Icon, Label, Left, List, ListItem, Right, Title} from 'native-base';
// @ts-ignore
import {Colors, CommonStyles, Metrics, Presets} from '../../theme';
// @ts-ignore
import {STRINGS} from "../../tools";
import {ROUTES} from "../../routes";
import {api_list, DELETE, fetch, GET} from "../../apis";
import {sprintf} from "sprintf-js";
import MyAlert from "../../components/MyAlert";
import MyConfirm from "../../components/MyConfirm";

import {connect} from 'react-redux';
import {listReport, addReport, deleteReport, deleteReportByForm, editReport, setSelectedFormId, setCreateReportMode} from '../../actions/reports';

interface MyProps {
    selectedFormId: any,
    reports: Array<any>,
    listReport: (items: Array<any>) => void,
    addReport: (item: any) => void,
    deleteReport: (item: any) => void,
    deleteReportByForm: (form: any) => void,
    editReport: (prev: any, current: any) => void,
    setSelectedFormId: (data: any) => void,
    setCreateReportMode: (data: any) => void,
}

type Props = MyProps & NavigationScreenProps;

class ReportListScreen extends Component<Props> {
    state = {
        showAlert: false,
        alertTitle: '',
        alertMessage: '',

        showConfirm: false,
        confirmTitle: '',
        confirmMessage: '',

        deletingReportId: -1,
    };

    constructor(props: Props) {
        super(props);
    }

    hideAlert = () => {
        this.setState({
            showAlert: false,
        })
    };

    hideConfirm = () => {
        this.setState({
            showConfirm: false,
        })
    };

    onBackButtonPressed = () => {
        this.props.navigation.navigate(ROUTES.ReportMain);
    };

    onPlusButtonPressed = () => {
        this.props.setCreateReportMode({
            mode: 'create',
        });
        this.props.navigation.navigate(ROUTES.CreateReport);
    };


    onListItemPressed = (value: any) => {
        // let {forms} = this.state;
        // // @ts-ignore
        // const index = columns.indexOf(value);
        // console.log(index);
        this.props.setCreateReportMode({
            mode: 'edit',
            data: value,
        });
        this.props.navigation.navigate(ROUTES.CreateReport);
    };

    onDeleteListItemButtonPressed = (value: any) => {
        // @ts-ignore
        const message = sprintf("Form name: %s", value.name);
        console.log(message);
        this.setState({
            deletingReportId: value._id,
            showConfirm: true,
            confirmTitle: STRINGS.delete,
            confirmMessage: STRINGS.deleteDescription,
        });
    };

    onDeleteReport = () => {
        // @ts-ignore
        fetch(DELETE, api_list.reportDelete, {_id: this.state.deletingReportId})
            .then((response: any) => {
                this.setState({
                    showConfirm: false,
                    showAlert: true,
                    alertTitle: response.result,
                    alertMessage: response.message,
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    showConfirm: false,
                    showAlert: true,
                    alertTitle: STRINGS.error,
                    alertMessage: STRINGS.unknownServerError,
                });
            })
            .finally(() => {
                // @ts-ignore
                fetch(GET, api_list.reportList, {})
                    .then((response: any) => {
                        console.log(response);
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
            });
    };

    renderListItemBody = (value: any) => {

        let items: Array<any> = [];
        Object.entries(value).forEach((entry: any) => {
            let key = entry[0];
            let value = entry[1];
            if (key == '_id' || key == 'formId') return;
            items.push(
                <Label style={Presets.h5.regular}>{key}: {value}</Label>
            )
        });
        console.log('items', items);
        return items;
    };

    render() {
        const self = this;
        const {showConfirm, confirmTitle, confirmMessage, showAlert, alertTitle, alertMessage} = self.state;
        const {reports, selectedFormId} = self.props;
        let report: any;
        let reportsByForm: Array<any> = [];
        for (report of reports) {
            // console.log(report, selectedFormId);
            if (report._id == selectedFormId) {
                // console.log(report);
                reportsByForm = report.reports;
                break;
            }
        }

        // console.log(reports, 'reportsByForm',  reportsByForm);
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
                    <Title style={[Presets.h4.bold, CommonStyles.headerTitle]}>{STRINGS.reportList}</Title>
                    </Body>
                    <Right style={CommonStyles.headerRight}>
                        <Button
                            transparent
                            onPress={self.onPlusButtonPressed}
                        >
                            <Icon style={[Presets.h3.regular, CommonStyles.headerIcon]} type={"FontAwesome5"} name="plus"/>
                        </Button>
                    </Right>
                </Header>
                <Content contentContainerStyle={styles.content}>
                    <Body style={styles.body}>
                    <ScrollView style={styles.scrollSec}>
                        <List style={styles.scrollSec}>
                            {reportsByForm.map((value: any) => {
                                return (
                                    <ListItem key={value._id} style={styles.listItem} onPress={() => self.onListItemPressed(value)}>
                                        <Body>
                                        {/*{self.renderListItemBody(value)}*/}
                                        <Label style={Presets.h5.regular}>{value.byWho}</Label>
                                        <Label style={Presets.h6.regular}>Modified Date: {value.lastModifiedDate}</Label>
                                        {/*<Label style={Presets.h6.regular}>Columns Count: {value._id}</Label>*/}
                                        {/*<Label style={Presets.h6.regular}>{value.aaaa}</Label>*/}
                                        </Body>
                                        <Right>
                                            <Button
                                                transparent
                                                onPress={() => self.onDeleteListItemButtonPressed(value)}
                                            >
                                                <Icon
                                                    style={[Presets.h3.regular, CommonStyles.headerIcon, styles.listItemDeleteIcon]}
                                                    type={"FontAwesome5"} name="times"/>
                                            </Button>
                                        </Right>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </ScrollView>
                    </Body>
                </Content>
                {MyAlert(showAlert, alertTitle, alertMessage, self.hideAlert)}
                {MyConfirm(showConfirm, confirmTitle, confirmMessage, self.hideConfirm, self.onDeleteReport)}
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
    listItemDeleteIcon: {
        marginRight: 0,
        color: Colors.danger,
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
        selectedFormId: state.reports.selectedFormId,
        reports: state.reports.items,
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
        setSelectedFormId: (data: any) => {
            dispatch(setSelectedFormId(data));
        },
        setCreateReportMode: (data: any) => {
            dispatch(setCreateReportMode(data));
        },
    }
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(ReportListScreen);
