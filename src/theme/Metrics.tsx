import {Dimensions, Platform, StatusBar} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

const { width, height } = Dimensions.get('window');
const IS_ANDROID = Platform.OS === "android";

// Used via Metrics.baseMargin
const metrics = {
  ANDROID_STATUSBAR: 24,
  DEVICE_HEIGHT: IS_ANDROID ? height - 24 : height,
  HEIGHT: IS_ANDROID ? height - 24 : height,
  DEVICE_WIDTH: width,
  WIDTH: width,
  section: 44,
  doubleSection: 88,
  baseMargin: 18,
  basePadding: 18,
  baseDoubleMargin: 36,
  baseDoublePadding: 36,
  smallMargin: 10,
  smallPadding: 10,
  tinyMargin: 7,
  tinyPadding: 7,
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === "ios" ? 48 : 48,
  buttonRadius: 4,
  icons: {
    tiny: 16,
    small: 20,
    medium: 24,
    large: 32,
    xl: 32,
    xxl: 50,
  },
  baseRadius: 5,
  baseDoubleRadius: 8,
  // images: {
  //   small: hp(2.2),
  //   medium: hp(3.5),
  //   large: hp(5),
  //   logo: hp(25),
  // },
  logoWidth: wp(30),
  avatarWidth: wp(25),
  avatarRadius: wp(14),
  qrcodeSize: wp(38),
  qrcodeLogoSize: 30,
  // statusBarHeight: 24,
  statusBarHeight: Platform.OS === 'ios' ? (!!StatusBar.currentHeight ? StatusBar.currentHeight : 32) : 0,
  // statusBarHeight:(!!StatusBar.currentHeight ? StatusBar.currentHeight : 24),
};

export default metrics
