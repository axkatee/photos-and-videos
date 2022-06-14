export interface User {
  id: string;
  name: string;
  url: string;
}

export interface Src {
  original: string;
  large: string;
  large2x: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

export interface VideoFile {
  id: string;
  quality: 'hd' | 'sd';
  file_type: string;
  width: number;
  height: number;
  link: string;
}

export interface VideoPicture {
  id: string;
  picture: string;
  nr: number;
}

export interface CommonResponse {
  page: number;
  per_page: number;
  total_results: number;
  prev_page?: number;
  next_page?: number;
}

export enum Pages {
  photos = 'photos',
  videos = 'videos',
  collections = 'collections'
}

export enum ExcludedFromMenuPages {
  collectionInner = 'collectionInner'
}

export type Page = 'photos' | 'videos' | 'collections' | 'collectionInner';
