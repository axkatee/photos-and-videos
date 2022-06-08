import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PhotosComponent} from '@pages/photos/photos.component';
import {VideosComponent} from '@pages/videos/videos.component';
import {CollectionsComponent} from '@pages/collections/collections.component';

const routes: Routes = [
  {
    path: 'photos',
    component: PhotosComponent
  },
  {
    path: 'videos',
    component: VideosComponent
  },
  {
    path: 'collections',
    component: CollectionsComponent
  },
  {
    path: '**',
    redirectTo: 'photos'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
