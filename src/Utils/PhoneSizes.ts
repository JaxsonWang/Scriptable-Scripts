interface w2h {
  w: number
  h: number
}

interface Size {
  models: string[]
  small: w2h
  medium: w2h
  large: w2h
  left: number
  right: number
  top: number
  middle: number
  bottom: number
}

interface Type {
  [sizeName: string]: Size
}

const phoneSize: Type = {
  '2796': {
    models: ['14 Pro Max'],
    small: { w: 510, h: 510 },
    medium: { w: 1092, h: 510 },
    large: { w: 1092, h: 1146 },
    left: 99,
    right: 681,
    top: 282,
    middle: 918,
    bottom: 1554
  },

  '2556': {
    models: ['14 Pro'],
    small: { w: 474, h: 474 },
    medium: { w: 1014, h: 474 },
    large: { w: 1014, h: 1062 },
    left: 82,
    right: 622,
    top: 270,
    middle: 858,
    bottom: 1446
  },

  '2778': {
    models: ['12 Pro Max', '13 Pro Max', '14 Plus'],
    small: { w: 510, h: 510 },
    medium: { w: 1092, h: 510 },
    large: { w: 1092, h: 1146 },
    left: 96,
    right: 678,
    top: 246,
    middle: 882,
    bottom: 1518
  },

  '2532': {
    models: ['12', '12 Pro', '13', '14'],
    small: { w: 474, h: 474 },
    medium: { w: 1014, h: 474 },
    large: { w: 1014, h: 1062 },
    left: 78,
    right: 618,
    top: 231,
    middle: 819,
    bottom: 1407
  },

  '2688': {
    models: ['Xs Max', '11 Pro Max'],
    small: { w: 507, h: 507 },
    medium: { w: 1080, h: 507 },
    large: { w: 1080, h: 1137 },
    left: 81,
    right: 654,
    top: 228,
    middle: 858,
    bottom: 1488
  },

  '1792': {
    models: ['11', 'Xr'],
    small: { w: 338, h: 338 },
    medium: { w: 720, h: 338 },
    large: { w: 720, h: 758 },
    left: 54,
    right: 436,
    top: 160,
    middle: 580,
    bottom: 1000
  },

  '2436': {
    models: ['X', 'Xs', '11 Pro'],
    small: { w: 465, h: 465 },
    medium: { w: 987, h: 465 },
    large: { w: 987, h: 1035 },
    left: 69,
    right: 591,
    top: 213,
    middle: 783,
    bottom: 1353
  },

  '2436_mini': {
    models: ['12 Mini'],
    small: { w: 465, h: 465 },
    medium: { w: 987, h: 465 },
    large: { w: 987, h: 1035 },
    left: 69,
    right: 591,
    top: 231,
    middle: 801,
    bottom: 1371
  },

  '2208': {
    models: ['6+', '6s+', '7+', '8+'],
    small: { w: 471, h: 471 },
    medium: { w: 1044, h: 471 },
    large: { w: 1044, h: 1071 },
    left: 99,
    right: 672,
    top: 114,
    middle: 696,
    bottom: 1278
  },

  '1334': {
    models: ['6', '6s', '7', '8'],
    small: { w: 296, h: 296 },
    medium: { w: 642, h: 296 },
    large: { w: 642, h: 648 },
    left: 54,
    right: 400,
    top: 60,
    middle: 412,
    bottom: 764
  },

  '1136': {
    models: ['5', '5s', '5c', 'SE'],
    small: { w: 282, h: 282 },
    medium: { w: 584, h: 282 },
    large: { w: 584, h: 622 },
    left: 30,
    right: 332,
    top: 59,
    middle: 399,
    bottom: 399
  },

  '1624': {
    models: ['11 Display Zoom mode', 'XR Display Zoom mode'],
    small: { w: 310, h: 310 },
    medium: { w: 658, h: 310 },
    large: { w: 658, h: 690 },
    left: 46,
    right: 394,
    top: 142,
    middle: 522,
    bottom: 902
  },

  '2001': {
    models: ['6+ Display Zoom mode', '6s+ Display Zoom mode', '7+ Display Zoom mode', '8+ Display Zoom mode'],
    small: { w: 444, h: 444 },
    medium: { w: 963, h: 444 },
    large: { w: 963, h: 972 },
    left: 81,
    right: 600,
    top: 90,
    middle: 618,
    bottom: 1146
  }
}

export default phoneSize
