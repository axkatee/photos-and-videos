import {CommonResponse, Src} from '@interfaces/common.interface';

export enum PhotoUrl {
  search = 'v1/search/',
  curated = 'v1/curated/',
  photo = 'v1/photos/'
}

export interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: Src;
  alt: string;
}

export interface PhotosResponse extends CommonResponse {
  photos: Photo[];
}
