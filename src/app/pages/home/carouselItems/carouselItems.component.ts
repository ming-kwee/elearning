import {Component, ViewChild, AfterViewInit, ViewEncapsulation, OnInit, Input} from '@angular/core';
import {KSSwiperContainer, KSSwiperSlide} from 'angular2-swiper';
import { RuntimeCompiler} from '@angular/compiler'; // add this
import {CarouselItemsService} from './carouselItems.service';

@Component({
  selector: 'carouselItemsme',
  encapsulation: ViewEncapsulation.Emulated,
  styles: [require('./carouselItems.scss')],
  template: require('./carouselItems.html')
})
export class CarouselItems implements AfterViewInit, OnInit {
  
  @Input() HeaderTitle;
  @Input() Courses;  
  // this is how you get access to the child component
  @ViewChild(KSSwiperContainer) swiperContainer: KSSwiperContainer;
  public example1SwipeOptions: any;

  constructor() {

    this.example1SwipeOptions = {
      slidesPerView: 5,
      loop: false,
      spaceBetween: 15, 
      setWrapperSize: true,
      breakpoints: {
        // when window width is <= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 0
        },
        // when window width is <= 480px
        480: {
          slidesPerView: 2,
          spaceBetween: 0
        },
        // // when window width is <= 640px
        640: {
          slidesPerView: 2,
          spaceBetween: 5
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 0
        },    
        800: {
          slidesPerView: 3,
          spaceBetween: 10
        },     
        992: {
          slidesPerView: 4,
          spaceBetween: 10
        },   
        // 1112: {
        //   slidesPerView: 4,
        //   spaceBetween: 10
        // },           
        1204: {
          slidesPerView: 5,
          spaceBetween: 10
        }           
      }
    };
  }

  moveNext() {
    this.swiperContainer.swiper.slideNext();
  }

  movePrev() {
    this.swiperContainer.swiper.slidePrev();
  }

  ngOnInit(){
    setTimeout(() => {
console.log('thiscourses', this.Courses)
    });
    
  }

  ngAfterViewInit() {
  }

}