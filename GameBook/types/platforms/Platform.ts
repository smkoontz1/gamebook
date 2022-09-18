export enum Category {
  Console = 1,
  Arcade = 2,
  Platform = 3, 
  OperatingSystem = 4,
  PortableConsole = 5,
  Computer = 6
}

interface PlatformDetails {
  category: Category,
  generation: number,
  summary: string,
}

export interface Platform {
  igdbId: number,
  slug: string,
  name: string,
  logoImgId?: string,
  details?: PlatformDetails
}