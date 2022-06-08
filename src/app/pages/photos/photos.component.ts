import {Component, OnInit} from '@angular/core';
import {PhotosService} from '@services/photos.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  constructor(
    private _photos: PhotosService
  ) { }

  ngOnInit(): void {
  }

  getPhotos(): void {
    this._photos.getPhotos().subscribe(res => {
      console.log(res);
    });
  }

}
