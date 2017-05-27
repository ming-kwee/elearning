import { Routes } from '@angular/router';
import './app.loader.ts';
import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { GlobalState } from './global.state';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from './theme/services';
import { layoutPaths } from './theme/theme.constants';
import { BaThemeConfig } from './theme/theme.config';
import { BaMenuService } from './theme';
import { AuthService } from './pages/login/auth.service';

import { MENU } from './app.menu';

/* ming 15/11/16 */
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
// import { BaSearchMenuService } from './theme/components/baSearchMenu/baSearchMenu.service';
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [require('normalize.css'), require('./app.scss')],
  providers: [ ],
  template: `
    <main [ngClass]="{'menu-collapsed': isMenuCollapsed}" baThemeRun>
      <div class="additional-bg"></div>
      <ba-page-top></ba-page-top>
      <router-outlet></router-outlet>
      <footer class="al-footer clearfix">
        <div class="al-footer-right">Created with <i class="ion-heart"></i></div>
        <div class="al-footer-main clearfix">
          <div class="al-copy">&copy; <a href="http://akveo.com">Akveo</a> 2016</div>
          <ul class="al-share clearfix">
            <li><i class="socicon socicon-facebook"></i></li>
            <li><i class="socicon socicon-twitter"></i></li>
            <li><i class="socicon socicon-google"></i></li>
            <li><i class="socicon socicon-github"></i></li>
          </ul>
        </div>
      </footer>
      <ba-back-top position="200"></ba-back-top>      
    </main>
  `
  
})
export class App {

  isMenuCollapsed: boolean = false;

  constructor(private _state: GlobalState,
              private _imageLoader: BaImageLoaderService,
              private _spinner: BaThemeSpinner,
              private _config: BaThemeConfig,
              private _menuService: BaMenuService,
              private viewContainerRef: ViewContainerRef,
              private af: AngularFire,
              private router: Router,
              private localStorageService: LocalStorageService,
              private authService: AuthService) {

    
    // this.baSearchMenuService.getData().subscribe(data => {
    //   this.localStorageService.set("SearchMenu", _.cloneDeep(data));
    // });

    // this.af.auth.subscribe(auth => {
		//   if(auth){
		//   }else {
    //     this.router.navigate(['/login']);
		//   }
    // });
    this._menuService.updateMenuByRoutes(<Routes>MENU);
  //   setInterval(() => {
	// 		let menuPart           = _.cloneDeep(MENU);
	// 		menuPart[ 0 ].children = menuPart[ 0 ].children.filter(() => Math.random() > 0.5);
	// 		console.log('Updating routes', menuPart);
	// 		this._menuService.updateMenuByRoutes(<Routes>menuPart);
	// }, 4000);

          let menuPart = [];
          let menuFilter = [];
          this.authService.getMenu(localStorage.getItem('menu')).then(
            data2 => {
              for (let x in data2) {
                menuFilter.push(data2[x]);
              }
              menuPart = _.cloneDeep(MENU);
              //let menuFilter = new Array("dashboard", "company");
              //menuPart[0].children = menuPart[0].children.filter(menu => menu.path === 'company');
              menuPart[0].children = menuPart[0].children.filter(menu => {
                menu.data.menu.hidden=false;
                for (let field in menuFilter) {
                  if (menu.path === menuFilter[field]) {
                    return true;
                  }
                }
                return false;
              });

              this._menuService.updateMenuByRoutes(<Routes>menuPart);
            }
          );

    this._loadImages();

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public ngAfterViewInit(): void {
    // hide spinner once all loaders are completed
    BaThemePreloader.load().then((values) => {
      this._spinner.hide();
    });
  }

  private _loadImages(): void {
    // register some loaders
    BaThemePreloader.registerLoader(this._imageLoader.load(layoutPaths.images.root + 'sky-bg.jpg'));
  }
}
