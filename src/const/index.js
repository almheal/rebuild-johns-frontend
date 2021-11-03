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
