import {Component, ViewEncapsulation, OnInit, Input, HostListener, OnDestroy, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ba-search-menu',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./baSearchMenu.scss')],
  template: require('./baSearchMenu.html'),
})

// TODO: move chart.js to it's own component
export class BaSearchMenu implements OnInit, OnDestroy, AfterViewInit {
  @Input() title: string;  
  private routes:any=[];
  private style: string;
  private typeofScreen: string = "fullscreen";
  private typeofControl: string = "absoluteposition";
  private scrollpos: number;

  constructor(
    private router: Router){
  }

  ngOnInit() {

      
      if (this.router.url.search('mapgallery') > 0){
        this.typeofScreen = "halfscreen";
        this.typeofControl = "relativeposition";
      } else {
        this.typeofScreen = "fullscreen";
        this.typeofControl = "relativeposition"; //"absoluteposition";        
      };
 }


	public navToggle: boolean = false;
  	toggleNav(){
		this.navToggle = !this.navToggle;
    if (this.navToggle){
      if (this.router.url.search('mapgallery') > 0){
        this.typeofScreen = "halfscreen";
        this.typeofControl = "relativeposition";
      } else {
        this.typeofScreen = "fullscreen";
        this.typeofControl = "absoluteposition";        
      };
      this.style = "nonscrollablebody";
    }else{
      this.style = "scrollablebody";
    }

    var links = document.getElementsByTagName("link");
    for(var i=0; i < links.length; i++) {
        var link = links[i];
        if(link.getAttribute("rel").indexOf("style") != -1 && link.getAttribute("title")) {
              link.disabled = true;
              if(link.getAttribute("title") === this.style)
                 link.disabled = false; 
        }
    }
	}
  public ngAfterViewInit():void {
      this.scrollpos = window.scrollY;
      window.scrollTo(0,0);
  }
  ngOnDestroy() {
    // alert('tes');
    var links = document.getElementsByTagName("link");
    for(var i=0; i < links.length; i++) {
        var link = links[i];
        if(link.getAttribute("rel").indexOf("style") != -1 && link.getAttribute("title")) {
              link.disabled = true;
              if(link.getAttribute("title") === "scrollablebody")
                 link.disabled = false; 
        }
    }
    window.scrollTo(0,this.scrollpos);
 }

}
