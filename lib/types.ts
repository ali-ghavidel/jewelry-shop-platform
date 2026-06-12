export type RateSource = 'api' | 'manual'

export interface Rate {
  id: string
  name: string
  price: number
  changePercent: number
  source: RateSource
  updatedAt: string
}

export interface Shop {
  id: string
  name: string
  address: string
  phone: string
  workingHours: string
  lat: number
  lng: number
  district: string
  rating: number
  imageUrl: string
}

export interface District {
  id: string
  name: string
  slug: string
  lat: number
  lng: number
}

export type CommentStatus = 'pending' | 'approved' | 'rejected'

export interface Comment {
  id: string
  shopId: string
  userName: string
  rating: number
  text: string
  status: CommentStatus
  createdAt: string
}
