import React from 'react';
import {createAppContainer, createDrawerNavigator, createStackNavigator} from "react-navigation";
// @ts-ignore
import {fadeIn, fromLeft, fromRight, zoomIn, zoomOut} from 'react-navigation-transitions';
// import LogoScreen from '../screens/signin/LogoScreen';
import SignInScreen from '../screens/signin/SignInScreen';
import SignUpScreen from '../screens/signin/SignUpScreen';
import DrawerScreen from "./DrawerScreen";
import FormMainScreen from '../screens/form/FormMainScreen';
import CreateFormScreen from '../screens/form/CreateFormScreen';

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

const MainDrawer = createDrawerNavigator(
    {
        [ROUTES.FormStack]: {
            screen: FormStack,
        },
        // [ROUTES.Profile]: {
        //     screen: ProfileScreen,
        // },
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

const mainNavigator = createStackNavigator(
    {
        [ROUTES.Splash]: {
            screen: SplashStack,
        },
        [ROUTES.MainDrawerStack]: {
            screen: MainDrawerStack,
        },
    }, {
        headerMode: "none",
        transitionConfig: () => fadeIn(500),
    });

export default createAppContainer(mainNavigator);

export {
    ROUTES,
}
