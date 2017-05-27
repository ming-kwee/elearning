import {Component, ViewEncapsulation} from '@angular/core';

import {CarouselService} from './carousel.service';

@Component({
  selector: 'carouselme',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./carousel.scss')],
  template: require('./carousel.html')
})
export class Carousel {
  public myInterval:number = 5000;
  public noWrapSlides:boolean = false;
  public slides:Array<any> = [];
 
  public constructor() {
    for (let i = 0; i < 1; i++) {
      this.addSlide();
    }
  }

  //http://res-5.cloudinary.com/demo/image/upload/group.jpg
  // http://loremflickr.com/1350/550/paris,girl/all
  // https://unsplash.it/1350/550/?random
 
  public addSlide():void {
    let newWidth = 600 + this.slides.length + 1;
    this.slides.push({
      image: `https://firebasestorage.googleapis.com/v0/b/enterevent-a094f.appspot.com/o/slide1.jpg?alt=media&token=abbc8f0b-1e83-40cb-ab9e-2b85aeb97665`,
      text: `${['More', 'Extra', 'Lots of', 'Surplus'][this.slides.length % 4]}
      ${['Cats', 'Kittys', 'Felines', 'Cutes'][this.slides.length % 4]}`
    });
    this.slides.push({
      image: `https://firebasestorage.googleapis.com/v0/b/enterevent-a094f.appspot.com/o/slide2.jpg?alt=media&token=b4f6c10d-97db-4a11-b741-120466147fec`,
      text: `${['More', 'Extra', 'Lots of', 'Surplus'][this.slides.length % 4]}
      ${['Cats', 'Kittys', 'Felines', 'Cutes'][this.slides.length % 4]}`
    });
    this.slides.push({
      image: `https://firebasestorage.googleapis.com/v0/b/enterevent-a094f.appspot.com/o/slide3.jpg?alt=media&token=bb0aa3e0-283f-4ea2-8679-7777b951ecb7`,
      text: `${['More', 'Extra', 'Lots of', 'Surplus'][this.slides.length % 4]}
      ${['Cats', 'Kittys', 'Felines', 'Cutes'][this.slides.length % 4]}`
    });
    this.slides.push({
      image: `https://firebasestorage.googleapis.com/v0/b/enterevent-a094f.appspot.com/o/slide4.jpg?alt=media&token=6f42268b-0219-4944-88e4-e1192db79fec`,
      text: `${['More', 'Extra', 'Lots of', 'Surplus'][this.slides.length % 4]}
      ${['Cats', 'Kittys', 'Felines', 'Cutes'][this.slides.length % 4]}`
    });
  }
 
  public removeSlide(index:number):void {
    this.slides.splice(index, 1);
  }
}
