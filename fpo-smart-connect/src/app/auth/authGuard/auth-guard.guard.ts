import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(private authServ: AuthService, private router: Router, private toastr: ToastrService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any | UrlTree> | Promise<any | UrlTree> | boolean | UrlTree {
    const role = route.data?.role;
    // console.log(role, "role");

    // return this.authServ.authenticateUserRole().pipe(
    //   map((result) => {
    //     console.log(result, "roleeeee");
    //     console.log(role[0], "111");

    //     if (role.includes(result)) {
    //       // if (role[0] == result.userType) {
    //       // this.authServ.userRole = data.userType;
    //       // this.authServ.userName = data.userName;
    //       return true;
    //     } else {
    //       this.toastr.warning('User is not authenticated')
    //       this.authServ.logout().subscribe(
    //         data => {
    //           if (data.status == true) {
    //             this.router.navigate(['/login'])
    //           }
    //         }
    //       )
    //       return false;
    //     }
    //   })
    // );

    return new Promise(resolve => {
      this.authServ.getUserRoleForAuth().subscribe((result: any) => {
        // console.log(result,"resultresult");
        
        console.log(role, "role");
        console.log(result,"userRole");
        // console.log(result.status === true && role[0] === result.userType,"ggggggggggggg");
        
        
        if (result.status === true && role[0] === result.userType || result.status === true && role[1] === result.userType) {
          
          this.authServ.userRole = result.userType;
          this.authServ.userName = result.userName;
          resolve(true);
        } else {
          this.toastr.warning('User is not authenticated')
          this.authServ.logout().subscribe(
            data => {
              if (data.status == true) {
                this.router.navigate(['/login'])
              }
            }
          )
          resolve(false);
        }
      }, error => {
        this.toastr.warning('User is not authenticated')
        this.authServ.logout().subscribe(
          data => {
            if (data.status == true) {
              this.router.navigate(['/login'])
            }
          }
        )
        resolve(false);
      }
      );
    });
  }

}
