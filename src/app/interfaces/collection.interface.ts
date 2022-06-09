import {Video} from '@interfaces/video.interface';
import {Photo} from '@interfaces/photo.interface';
import {CommonResponse} from '@interfaces/common.interface';

export enum CollectionUrl {
  featured = 'v1/collections/featured/',
  collection = 'v1/collections/'
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  private: boolean;
  media_count: number;
  photos_count: number;
  videos_count: number;
}

export interface FeaturedCollectionsResponse extends CommonResponse {
  collections: Collection[];
}

export interface CollectionResponse extends CommonResponse {
  id: string;
  media: Photo[] | Video[];
}
