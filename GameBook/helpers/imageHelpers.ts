import { Image } from 'react-native'

const IGDB_IMAGE_BASE_URL = 'https://images.igdb.com/igdb/image/upload'

export const getImgLogoUrl = (imgId: string) => {
  return `${IGDB_IMAGE_BASE_URL}/t_cover_small/${imgId}.png`
}

export const getPlatformDetailsImgLogoUrl = (imgId: string) => {
  return `${IGDB_IMAGE_BASE_URL}/t_720p/${imgId}.png`
}

export const getSmallGameCoverImageUrl = (imgId: string) => {
  return `${IGDB_IMAGE_BASE_URL}/t_cover_small/${imgId}.png`
}

export const getBigGameCoverImageUrl = (imgId: string) => {
  return `${IGDB_IMAGE_BASE_URL}/t_cover_big/${imgId}.png`
}

/**
 * @returns an array with width in the first index and height in the second
 */
export const getImageSize = async (imgSrc: string): Promise<[number, number]> => {
  let returnWidth = 0
  let returnHeight = 0
  
  Image.getSize(imgSrc,
  (width, height) => {
    console.log('Retrieved dimensions', width, height)
    
    returnWidth = width
    returnHeight = height

    console.log('After assignment w', returnWidth)
    console.log('After assignment h', returnHeight)
  },
  () => {
    console.error('Error retrieving image size')
  })

  console.log(returnWidth, returnHeight)

  return [returnWidth, returnHeight]
}