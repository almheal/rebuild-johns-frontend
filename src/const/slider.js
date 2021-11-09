import { IMAGES_SIZES_MEDIA } from '@const'
import { generateUrlImageVariousSize } from '@utils'

export const SLIDER_IMAGES = [
  {
    jpg: 'https://res.cloudinary.com/dimdjrct2/image/upload/v1634749608/1_hhtkmf.jpg',
    webp: 'https://res.cloudinary.com/dimdjrct2/image/upload/v1634749608/1_zcburt.webp',
  },
  {
    jpg: 'https://res.cloudinary.com/dimdjrct2/image/upload/v1634749639/2_gemnox.jpg',
    webp: 'https://res.cloudinary.com/dimdjrct2/image/upload/v1634749637/2_hqtusg.webp',
  },
  {
    jpg: 'https://res.cloudinary.com/dimdjrct2/image/upload/v1634749647/3_soijks.jpg',
    webp: 'https://res.cloudinary.com/dimdjrct2/image/upload/v1634749639/3_ix1ta8.webp',
  },
  {
    jpg: 'https://res.cloudinary.com/dimdjrct2/image/upload/v1634749646/5_bju3ie.jpg',
    webp: 'https://res.cloudinary.com/dimdjrct2/image/upload/v1634749640/5_ylckyt.webp',
  },
  {
    jpg: 'https://res.cloudinary.com/dimdjrct2/image/upload/v1634749640/6_cuquku.jpg',
    webp: 'https://res.cloudinary.com/dimdjrct2/image/upload/v1634749641/6_m8gkwi.webp',
  },
  {
    jpg: 'https://res.cloudinary.com/dimdjrct2/image/upload/v1634749643/7_le4m3g.jpg',
    webp: 'https://res.cloudinary.com/dimdjrct2/image/upload/v1634749642/7_pci4hu.webp',
  },
  {
    jpg: 'https://res.cloudinary.com/dimdjrct2/image/upload/v1634749645/8_py4nwl.jpg',
    webp: 'https://res.cloudinary.com/dimdjrct2/image/upload/v1634749644/8_vtwzv7.webp',
  },
  {
    jpg: 'https://res.cloudinary.com/dimdjrct2/image/upload/v1634749645/9_savr8v.jpg',
    webp: 'https://res.cloudinary.com/dimdjrct2/image/upload/v1634749645/9_x6yzn5.webp',
  },
  {
    jpg: 'https://res.cloudinary.com/dimdjrct2/image/upload/v1634749646/10_mkh7ia.jpg',
    webp: 'https://res.cloudinary.com/dimdjrct2/image/upload/v1634749646/10_noh8ls.webp',
  },
  {
    jpg: 'https://res.cloudinary.com/dimdjrct2/image/upload/v1634749650/11_vqzogd.png',
    webp: 'https://res.cloudinary.com/dimdjrct2/image/upload/v1634749647/11_o6eqrd.webp',
  },
]

export const sliderImageUrls = SLIDER_IMAGES.map((item) => {
  const defaultMediaSize = '(min-width: 1601px)'
  const defaultWebpUrl = generateUrlImageVariousSize({
    defaultUrl: item.webp,
    sizes: [{ value: '1920', media: defaultMediaSize }],
  })

  return {
    defaultWebp: {
      url: defaultWebpUrl[defaultMediaSize],
      media: defaultMediaSize,
    },
    jpg: generateUrlImageVariousSize({
      defaultUrl: item.jpg,
      sizes: IMAGES_SIZES_MEDIA,
    }),
    webp: generateUrlImageVariousSize({
      defaultUrl: item.webp,
      sizes: IMAGES_SIZES_MEDIA,
    }),
  }
})
