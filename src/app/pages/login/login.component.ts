import { Component, ViewEncapsulation, } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { AuthService } from './auth.service';
import { GlobalState } from '../../global.state';
import { BaMenuService } from '../../theme';

import { MENU } from '../../app.menu';

@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./login.scss')],
  template: require('./login.html'),
})
export class Login {

  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;

  public errorMsg: String;

  constructor(private _state: GlobalState, fb: FormBuilder, public authService: AuthService, public router: Router,
    private _menuService: BaMenuService, ) {
    this.authService.logout();

    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }


  public logout(): void {
    this.authService.logout();
  }

  public onSubmit(values: Object): void {

    this.submitted = true;
    let menuFilter = [];

    if (this.form.valid) {
      this.authService.login(values)
        .then(
        data => {

          let menuPart = [];
          
          this.authService.getMenu(localStorage.getItem('menu')).then(
            data2 => {
              for (let x in data2) {
                menuFilter.push(data2[x]);
              }
                        
              menuPart = _.cloneDeep(MENU);
              menuPart[0].children = menuPart[0].children.filter(menu => {
                menu.data.menu.hidden=false;
                for (let field in menuFilter) {
                  if (menu.path === menuFilter[field]) {
                    return true;
                  }
                }
                return false;
              });

              // console.log(menuPart);
              this._menuService.updateMenuByRoutes(<Routes>menuPart);
              this.router.navigate(['pages3/instructor-board']);
            }
          );
          this._state.notifyDataChanged('user.isLoggedIn', false);           
          this._state.notifyDataChanged('user.isLoggedIn', true);          
        },
        error => {
          this.errorMsg = <any>error._body;
        });
    }
  }

}
