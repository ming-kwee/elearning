import {Component, ViewEncapsulation, HostListener} from '@angular/core';
import {GlobalState} from '../../../global.state';
import { AuthService } from '../../../pages/login/auth.service';
/* ming 15/11/16 */
import { LogoutService } from './logout.service'
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'ba-page-top',
  styles: [require('./baPageTop.scss')],
  template: require('./baPageTop.html'),
  encapsulation: ViewEncapsulation.None,
  providers:[LogoutService]
})
export class BaPageTop {
  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;
  public position:number = 450;
  public fixedOrabsolute:string= "absolute";
  public isHome: boolean = true ;
  public isLoggedIn: boolean=false;
  public isMobileScreen = false;
  constructor(private auth: AuthService, private _state:GlobalState, private _user: LogoutService, private _router: Router, private activatedRoute: ActivatedRoute) {
 

    this._state.subscribe('user.isLoggedIn', (isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    }); 
 
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
    this._state.subscribe('menu.isHideShow', (isHideShow) => {
      if (isHideShow==true){
        this.fixedOrabsolute= "absolute";
        this.isHome = true;
      } else {
        this.fixedOrabsolute= "fixed";  
        this.isHome = false;              
      }
    });       
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  public logInOut(){

    if (this.isLoggedIn){
      this.auth.logout();
      this._router.navigate(['/']);
      this.isLoggedIn = false;
    } else {
      this._router.navigate(['/login']);
    }        

  }

  public signUpOrConsole(){
    if (this.isLoggedIn){      
      this._router.navigate(['/pages/dashboard']);
    } else {
      this._router.navigate(['/register']);
    }            
  }


  ngOnInit(){
    console.log(window.matchMedia('(min-width:768px)').matches)
    if(window.matchMedia('(min-width:768px)').matches){
		  this.isMobileScreen=false
    } else {
      this.isMobileScreen=true
    }    
  }

  ngAfterViewInit () {

    this._onWindowScroll();
  }


  @HostListener('window:scroll')
  _onWindowScroll():void {
    if (this.isHome == true) { 

      if (window.scrollY > this.position){
        this.fixedOrabsolute="fixed animated fadeInDown";
      }

      if (window.scrollY < this.position){
        this.fixedOrabsolute="absolute";
      }      
    }
  }
}
