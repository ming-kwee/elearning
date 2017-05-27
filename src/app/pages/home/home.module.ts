import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { NgaModule } from '../../theme/nga.module';

import { CarouselModule } from 'ng2-bootstrap/ng2-bootstrap'
import { Home } from './home.component';
import { routing }       from './home.routing';
import { HomeService }       from './home.service';

import { Carousel } from './carousel';
import { CarouselItems } from './carouselItems';
import { KSSwiperModule } from 'angular2-swiper';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing,
    CarouselModule,
    KSSwiperModule
  ],
  declarations: [
    Carousel,
    CarouselItems,
    Home
  ],
  providers: [
    HomeService
  ]
})
export default class HomeModule {}
