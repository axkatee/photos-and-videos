import {CommonResponse, User, VideoFile, VideoPicture} from '@interfaces/common.interface';

export enum VideoUrl {
  search = 'videos/search/',
  popular = 'videos/popular/',
  video = 'videos/videos/'
}

export interface Video {
  id: number;
  width: number;
  height: number;
  url: string;
  image: string;
  duration: number;
  user: User;
  video_files: VideoFile[];
  video_pictures: VideoPicture[];
}

export interface VideosResponse extends CommonResponse {
  videos: Video[];
  url: string;
}
