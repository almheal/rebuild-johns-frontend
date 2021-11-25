export const LOCALE_NAME = 'locale'
export const DEFAULT_LOCALE = 'ru'
export const TOKEN_NAME = 'rJf'
export const COUNTRY_FLAG_IMAGES = {
  RU: 'ru-flag.svg',
}
export const MINIMUM_PASSWORD_LENGTH = 6
export const PHONE_LENGTH_WITH_PREFIX = 12
export const PHONE_LENGTH = 11
export const CART_NAME = 'cart'
export const NOTIFICATION_TIMEOUT = 3000
export const SCROLL_TO_CATEGORY_TIMEOUT = 600
export const DEFAULT_CONSTRUCTOR_IMG =
  'https://res.cloudinary.com/dimdjrct2/image/upload/w_320,h_200,c_scale/v1635943461/constructor-product_io1mv7.png'
export const DEFAULT_PIZZA_OPTIONS = [
  {
    variety: 'app.varieties.items.traditional',
    img: DEFAULT_CONSTRUCTOR_IMG,
    sizes: [
      { size: { title: '23', unit: 'app.sizes.units.cm' }, price: 349 },
      { size: { title: '30', unit: 'app.sizes.units.cm' }, price: 698 },
      { size: { title: '35', unit: 'app.sizes.units.cm' }, price: 868 },
      { size: { title: '40', unit: 'app.sizes.units.cm' }, price: 998 },
    ],
  },
  {
    variety: 'app.varieties.items.thin',
    img: DEFAULT_CONSTRUCTOR_IMG,
    sizes: [
      { size: { title: '30', unit: 'app.sizes.units.cm' }, price: 489 },
      { size: { title: '35', unit: 'app.sizes.units.cm' }, price: 659 },
      { size: { title: '40', unit: 'app.sizes.units.cm' }, price: 789 },
    ],
  },
]
export const MAX_LENGTH_ONE_INGREDIENT = 2
export const MAX_LENGTH_INGREDIENTS = 10
export const GENDERS = {
  MALE: {
    title: 'app.profile.gender.male',
    param: 'male',
  },
  FEMALE: {
    title: 'app.profile.gender.female',
    param: 'female',
  },
}
export const CARD_NUMBER_LENGTH = 16
export const CVV_LENGTH = 3
export const MY_LENGTH = 5
export const DELIVERY_METHODS = {
  DELIVERY: 'delivery',
  PICKUP: 'pickup',
}
export const PAYMENT_METHODS = {
  CASH: 'cash',
  CARD_TO_COURIER: 'cardToCourier',
  GOOGLE_PAY: 'googlePay',
  BY_CARD: 'byCard',
}
export const DELIVERY_TIMES = {
  SOON_AS_POSSIBLE: 'soonAsPossible',
  IN_TIME: 'inTime',
}
export const IMAGES_SIZES_MEDIA = [
  { value: '1600', media: '(min-width: 1367px)' },
  { value: '1366', media: '(min-width: 1025px)' },
  { value: '1024', media: '(min-width: 769px)' },
  { value: '768', media: '(min-width: 641px)' },
  { value: '640', media: '(max-width: 641px)' },
]

export const TEST_USER = {
  phoneNumber: '+79149112061',
  password: '123456',
}

export const TEST_CART_PRODUCT = {
  _id: '61545420b45ffc71bcf64b34',
  category: '615449f5b45ffc71bcf64a70',
  size: {
    price: '169',
    nutritionalValue: {
      proteins: '11',
      fats: '7',
      carbohydrates: '21',
      energyValue: '190/800',
      weight: '130',
    },
  },
  variety: {
    img: 'http://res.cloudinary.com/dimdjrct2/image/upload/v1632916511/yapzpmgrr2kd9qhpx1qg.jpg',
    sizes: [
      {
        price: '169',
        nutritionalValue: {
          proteins: '11',
          fats: '7',
          carbohydrates: '21',
          energyValue: '190/800',
          weight: '130',
        },
      },
    ],
  },
  options: [
    {
      img: 'http://res.cloudinary.com/dimdjrct2/image/upload/v1632916511/yapzpmgrr2kd9qhpx1qg.jpg',
      sizes: [
        {
          price: '169',
          nutritionalValue: {
            proteins: '11',
            fats: '7',
            carbohydrates: '21',
            energyValue: '190/800',
            weight: '130',
          },
        },
      ],
    },
  ],
  ingredients: [],
  title: 'app.products.snacks.items.chickenJohner.title',
}
