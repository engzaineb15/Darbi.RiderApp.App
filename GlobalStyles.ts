import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');


/* fonts */

export const FontFamily = {
  abelRegular: "Abel-Regular",
  headline15Semibold: "Inter-SemiBold",
  frutigerLTArabic: "Frutiger LT Arabic",
};
/* font sizes */
export const FontSize = {
  headline15Semibold_size: 15,
  size_sm: 14,
  size_3xl: 22,
  size_mid_6: 18,
  size_sm_2: 13,
  size_mid: 17,
  size_xs: 12,
  size_base: 16,
  size_mini_8: 15,
  size_13xl: 32,
  size_lg: 18,
  size_sm_1: 13,
  size_xl: 20,
  size_25xl: 44,
  size_6xl: 25,
  size_3xs: 10,
};
/* Colors */
export const Color = {
  colorGray_100: "#fefefe",
  colorDark2: "#282a3e",
  colorGray_200: "#232323",
  colorGray_500: "#202020",
  colorGray_600: "#0f172a",
  colorGray_300: "#121212",
  textTitle: "#000814",
  baseBlack: "#02080a",
  colorGray_700: "rgba(255, 255, 255, 0.9)",
  colorGray_400: "rgba(255, 255, 255, 0.8)",
  colorDarkcyan: "#068b80",
  baseWhite: "#fff",
  colorGainsboro_200: "#e3e8ec",
  colorGainsboro_100: "#e4e5e7",
  colorLightcoral: "#ffa0a0",
  colorDimgray_100: "#676767",
  appColorSubtitle: "#595d5b",
  grey700: "#5a5a5a",
  textSubtitle: "#545a62",
  colorDimgray_200: "#585858",
  colorLightcyan: "#e0ffff",
  darkBlackPrimary: "#000",
  colorLightseagreen: "#18aca0",
  greyscale400: "#94a3b8",
  colorGrey400: "#a0a3ad",
  inputPlaceholder: "#9aa4b2",
  colorPaleturquoise_100: "#a9ffff",
  colorWhitesmoke_100: "#f8f9fb",
  colorWhitesmoke: "#eff2f3",
  secondary500: "#3855a4",
  mainColorsPrimary: "#19224c",
  coolGray700: "#374151",
  appColorBody: "#343736",
  appColorTitles: "#2c2f2e",
  inputBorder: "#cdd5df",
  accentLight007AFF: "#007aff",
  colorIndianred: "#e15a5a",
  mainColorsSecondary: "#f6f8fe",
};
/* Paddings */
export const Padding = {
  p_101xl: 120,
  p_2xl: 21,
  p_5xs: 8,
  p_base: 16,
  p_3xs: 10,
  p_9xs: 4,
  p_mid_6: 18,
  p_4xs_8: 9,
  p_8xl: 27,
  p_lg: 18,
  p_7xl: 26,
  p_sm: 14,
  p_xs: 12,
  p_3xl: 22,
  p_4xl_5: 24,
  p_base_7: 16,
  p_3xl_7: 23,
  p_smi_2: 12,
  p_6xs_3: 6,
  p_7xs: 6,
  p_4xs_7: 9,
  p_xl: 20,
};
/* border radiuses */
export const Border = {
  br_81xl: 100,
  br_71xl: 90,
  br_sm: 14,
  br_base_7: 17,
  br_33xl_9: 53,
  br_lg_5: 19,
  br_11xs_3: 1,
  br_9xs_5: 4,
  br_3xl: 22,
  br_xs: 12,
  br_49xl: 68,
  br_base_1: 16,
  br_11xs_2: 1,
  br_9xs_1: 3,
  br_4xs_6: 9,
  br_base: 16,
  br_3xs: 10,
  br_smi: 13,
  br_xs_1: 11,
  br_59xl_4: 78,
  br_5xs: 8,
  br_8xs_4: 4,
  br_1201xl: 1220,
  br_171xl: 190,
  br_8xs_6: 5,
};


export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  margin: 20,

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]