interface Size {
  small?: number
  medium?: number
  large?: number
  left?: number
  right?: number
  top?: number
  middle?: number
  bottom?: number
  text?: Size
  notext?: Size
  x?: Size
  mini?: Size
}

interface Type {
  [sizeName: string]: Size
}

const phoneSize: Type = {
  /*

      Supported devices
      =================
      The following device measurements have been confirmed in iOS 18.

      */

  // 16 Pro Max
  2868: {
    text: {
      small: 510,
      medium: 1092,
      large: 1146,
      left: 114,
      right: 696,
      top: 276,
      middle: 912,
      bottom: 1548
    },
    notext: {
      small: 530,
      medium: 1138,
      large: 1136,
      left: 91,
      right: 699,
      top: 276,
      middle: 882,
      bottom: 1488
    }
  },

  // 16 Plus, 15 Plus, 15 Pro Max, 14 Pro Max
  2796: {
    text: {
      small: 510,
      medium: 1092,
      large: 1146,
      left: 98,
      right: 681,
      top: 252,
      middle: 888,
      bottom: 1524
    },
    notext: {
      small: 530,
      medium: 1139,
      large: 1136,
      left: 75,
      right: 684,
      top: 252,
      middle: 858,
      bottom: 1464
    }
  },

  // 16 Pro
  2622: {
    text: {
      small: 486,
      medium: 1032,
      large: 1098,
      left: 87,
      right: 633,
      top: 261,
      middle: 872,
      bottom: 1485
    },
    notext: {
      small: 495,
      medium: 1037,
      large: 1035,
      left: 84,
      right: 626,
      top: 270,
      middle: 810,
      bottom: 1350
    }
  },

  // 16, 15, 15 Pro, 14 Pro
  2556: {
    text: {
      small: 474,
      medium: 1017,
      large: 1062,
      left: 81,
      right: 624,
      top: 240,
      middle: 828,
      bottom: 1416
    },
    notext: {
      small: 495,
      medium: 1047,
      large: 1047,
      left: 66,
      right: 618,
      top: 243,
      middle: 795,
      bottom: 1347
    }
  },

  // SE3, SE2
  1334: {
    text: {
      small: 296,
      medium: 642,
      large: 648,
      left: 54,
      right: 400,
      top: 60,
      middle: 412,
      bottom: 764
    },
    notext: {
      small: 309,
      medium: 667,
      large: 667,
      left: 41,
      right: 399,
      top: 67,
      middle: 425,
      bottom: 783
    }
  },

  /*

  In-limbo devices
  =================
  The following device measurements were confirmed in older versions of iOS.
  Please comment if you can confirm these for iOS 18.

  */

  // 14 Plus, 13 Pro Max, 12 Pro Max
  2778: {
    small: 510,
    medium: 1092,
    large: 1146,
    left: 96,
    right: 678,
    top: 246,
    middle: 882,
    bottom: 1518
  },

  // 11 Pro Max, XS Max
  2688: {
    small: 507,
    medium: 1080,
    large: 1137,
    left: 81,
    right: 654,
    top: 228,
    middle: 858,
    bottom: 1488
  },

  // 14, 13, 13 Pro, 12, 12 Pro
  2532: {
    small: 474,
    medium: 1014,
    large: 1062,
    left: 78,
    right: 618,
    top: 231,
    middle: 819,
    bottom: 1407
  },

  // 13 mini, 12 mini / 11 Pro, XS, X
  2436: {
    x: {
      small: 465,
      medium: 987,
      large: 1035,
      left: 69,
      right: 591,
      top: 213,
      middle: 783,
      bottom: 1353
    },
    mini: {
      small: 465,
      medium: 987,
      large: 1035,
      left: 69,
      right: 591,
      top: 231,
      middle: 801,
      bottom: 1371
    }
  },

  // 11, XR
  1792: {
    small: 338,
    medium: 720,
    large: 758,
    left: 55,
    right: 437,
    top: 159,
    middle: 579,
    bottom: 999
  },

  // 11 and XR in Display Zoom mode
  1624: {
    small: 310,
    medium: 658,
    large: 690,
    left: 46,
    right: 394,
    top: 142,
    middle: 522,
    bottom: 902
  },

  /*

  Older devices
  =================
  The following devices cannot be updated to iOS 18 or later.

  */

  // Home button Plus phones
  2208: {
    small: 471,
    medium: 1044,
    large: 1071,
    left: 99,
    right: 672,
    top: 114,
    middle: 696,
    bottom: 1278
  },

  // Home button Plus in Display Zoom mode
  2001: {
    small: 444,
    medium: 963,
    large: 972,
    left: 81,
    right: 600,
    top: 90,
    middle: 618,
    bottom: 1146
  },

  // SE1
  1136: {
    small: 282,
    medium: 584,
    large: 622,
    left: 30,
    right: 332,
    top: 59,
    middle: 399,
    bottom: 399
  }
}

export default phoneSize
