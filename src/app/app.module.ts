import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenuSidenavComponent} from '@components/menu-sidenav/menu-sidenav.component';
import {FilterComponent} from '@components/filter/filter.component';
import {PhotosComponent} from '@pages/photos/photos.component';
import {VideosComponent} from '@pages/videos/videos.component';
import {CollectionsComponent} from '@pages/collections/collections.component';
import {ApiKeyInterceptor} from '@apikey-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MenuSidenavComponent,
    FilterComponent,
    PhotosComponent,
    VideosComponent,
    CollectionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
