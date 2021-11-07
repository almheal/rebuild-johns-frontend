const DEFAULT_HALVES_IMG =
  'https://res.cloudinary.com/dimdjrct2/image/upload/v1636012794/halvesPreviewPizza_v6atou.png'

export const halvesOptions = [
  {
    variety: 'app.varieties.items.traditional',
    img: DEFAULT_HALVES_IMG,
    sizes: [
      {
        size: {
          title: '35',
          unit: 'app.sizes.units.cm',
        },
        price: 839,
      },
      {
        size: {
          title: '40',
          unit: 'app.sizes.units.cm',
        },
        price: 1029,
      },
    ],
  },
]
