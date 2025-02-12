import React from 'react';
import {createAppContainer, createDrawerNavigator, createStackNavigator} from "react-navigation";
// @ts-ignore
import {fadeIn, fromLeft, fromRight, zoomIn, zoomOut} from 'react-navigation-transitions';
// import LogoScreen from '../screens/signin/LogoScreen';
import SignInScreen from '../screens/signin/SignInScreen';
import SignUpScreen from '../screens/signin/SignUpScreen';
import DrawerScreen from "./DrawerScreen";
import FormFolderScreen from '../screens/form/FormFolderScreen';
import FormMainScreen from '../screens/form/FormMainScreen';
import CreateFormScreen from '../screens/form/CreateFormScreen';
import ReportFolderScreen from '../screens/report/ReportFolderScreen';
import ReportMainScreen from '../screens/report/ReportMainScreen';
import ReportListScreen from '../screens/report/ReportListScreen';
import CreateReportScreen from '../screens/report/CreateReportScreen';
import FolderMainScreen from '../screens/admin/FolderMainScreen';
import CreateFolderScreen from '../screens/admin/CreateFolderScreen';
// import CreateFormScreen from '../screens/report/';

import ROUTES from './ROUTES';

// The stack for the UserProfile
const SplashStack = createStackNavigator(
    {
        // [ROUTES.Logo]: {
        //     screen: LogoScreen,
        // },
        [ROUTES.SignIn]: {
            screen: SignInScreen,
        },
        [ROUTES.SignUp]: {
            screen: SignUpScreen,
        },
    },
    {
        headerMode: "none",
        transitionConfig: (nav: any) => fromRight(),
    });

const FormStack = createStackNavigator(
    {
        [ROUTES.FormFolder]: {
            screen: FormFolderScreen,
        },
        [ROUTES.FormMain]: {
            screen: FormMainScreen,
        },
        [ROUTES.CreateForm]: {
            screen: CreateFormScreen,
        },
    },
    {
        headerMode: "none",
        transitionConfig: (nav: any) => fromRight(),
    });

const ReportStack = createStackNavigator(
    {
        [ROUTES.ReportFolder]: {
            screen: ReportFolderScreen,
        },
        [ROUTES.ReportMain]: {
            screen: ReportMainScreen,
        },
        [ROUTES.ReportList]: {
            screen: ReportListScreen,
        },
        [ROUTES.CreateReport]: {
            screen: CreateReportScreen,
        },
    },
    {
        headerMode: "none",
        transitionConfig: (nav: any) => fromRight(),
    });

const AdminStack = createStackNavigator(
    {
        [ROUTES.FolderMain]: {
            screen: FolderMainScreen,
        },
        [ROUTES.CreateFolder]: {
            screen: CreateFolderScreen,
        },
    },
    {
        headerMode: "none",
        transitionConfig: (nav: any) => fromRight(),
    });

const MainDrawer = createDrawerNavigator(
    {
        [ROUTES.AdminStack]: {
            screen: AdminStack,
        },
        [ROUTES.FormStack]: {
            screen: FormStack,
        },
        [ROUTES.ReportStack]: {
            screen: ReportStack,
        },
    },
    {
        initialRouteName: ROUTES.FormStack,
        contentOptions: {
            activeTintColor: "#e91e63"
        },
        contentComponent: (props: any) => <DrawerScreen {...props} />
        // contentComponent: (props) => DrawerScreen(props)
    });

const MainDrawerStack = createStackNavigator(
    {
        DrawerNavigator: {
            screen: MainDrawer
        }
    }, {
        headerMode: "none",
    });

// const AdminStack = cre

const mainNavigator = createStackNavigator(
    {
        [ROUTES.Splash]: {
            screen: SplashStack,
        },
        [ROUTES.MainDrawerStack]: {
            screen: MainDrawerStack,
        },
        // [ROUTES.AdminStack]: {
        //     screen: AdminStack,
        // },
    }, {
        headerMode: "none",
        transitionConfig: () => fadeIn(500),
    });

export default createAppContainer(mainNavigator);

export {
    ROUTES,
}
