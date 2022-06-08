export interface User {
  id: number;
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
  id: number;
  quality: 'hd' | 'sd';
  file_type: string;
  width: number;
  height: number;
  link: string;
}

export interface VideoPicture {
  id: number;
  picture: string;
  nr: number;
}

export interface CommonResponse {
  page: number;
  per_page: number;
  total_results: number;
  prev_page?: string;
  next_page?: string;
}
