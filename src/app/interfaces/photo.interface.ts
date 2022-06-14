import {CommonResponse, Src} from '@interfaces/common.interface';

export enum PhotoUrl {
  search = 'v1/search/',
  curated = 'v1/curated/',
  photo = 'v1/photos/'
}

export interface Photo {
  id: string;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: string;
  avg_color: string;
  src: Src;
  alt: string;
}

export interface PhotosResponse extends CommonResponse {
  photos: Photo[];
}
