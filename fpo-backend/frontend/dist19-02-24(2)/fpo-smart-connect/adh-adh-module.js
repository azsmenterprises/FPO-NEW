(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["adh-adh-module"],{

/***/ "N/En":
/*!**************************************************************!*\
  !*** ./src/app/adh/adh-dashboard/adh-dashboard.component.ts ***!
  \**************************************************************/
/*! exports provided: AdhDashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdhDashboardComponent", function() { return AdhDashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class AdhDashboardComponent {
    constructor() { }
    ngOnInit() {
    }
}
AdhDashboardComponent.ɵfac = function AdhDashboardComponent_Factory(t) { return new (t || AdhDashboardComponent)(); };
AdhDashboardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AdhDashboardComponent, selectors: [["app-adh-dashboard"]], decls: 2, vars: 0, template: function AdhDashboardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "adh-dashboard works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZGgtZGFzaGJvYXJkLmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AdhDashboardComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-adh-dashboard',
                templateUrl: './adh-dashboard.component.html',
                styleUrls: ['./adh-dashboard.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "PkJw":
/*!***********************************!*\
  !*** ./src/app/adh/adh.module.ts ***!
  \***********************************/
/*! exports provided: AdhModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdhModule", function() { return AdhModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _adh_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./adh-routing.module */ "Xjp4");
/* harmony import */ var _adh_dashboard_adh_dashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./adh-dashboard/adh-dashboard.component */ "N/En");





class AdhModule {
}
AdhModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AdhModule });
AdhModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AdhModule_Factory(t) { return new (t || AdhModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _adh_routing_module__WEBPACK_IMPORTED_MODULE_2__["AdhRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AdhModule, { declarations: [_adh_dashboard_adh_dashboard_component__WEBPACK_IMPORTED_MODULE_3__["AdhDashboardComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _adh_routing_module__WEBPACK_IMPORTED_MODULE_2__["AdhRoutingModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AdhModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _adh_dashboard_adh_dashboard_component__WEBPACK_IMPORTED_MODULE_3__["AdhDashboardComponent"]
                ],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _adh_routing_module__WEBPACK_IMPORTED_MODULE_2__["AdhRoutingModule"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "Xjp4":
/*!*******************************************!*\
  !*** ./src/app/adh/adh-routing.module.ts ***!
  \*******************************************/
/*! exports provided: AdhRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdhRoutingModule", function() { return AdhRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_auth_authGuard_auth_guard_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/auth/authGuard/auth-guard.guard */ "dEjV");
/* harmony import */ var _adh_dashboard_adh_dashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./adh-dashboard/adh-dashboard.component */ "N/En");






const routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    }, {
        path: 'dashboard',
        canActivate: [src_app_auth_authGuard_auth_guard_guard__WEBPACK_IMPORTED_MODULE_2__["AuthGuardGuard"]],
        data: { role: ['ADH'] },
        component: _adh_dashboard_adh_dashboard_component__WEBPACK_IMPORTED_MODULE_3__["AdhDashboardComponent"]
    }
];
class AdhRoutingModule {
}
AdhRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AdhRoutingModule });
AdhRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AdhRoutingModule_Factory(t) { return new (t || AdhRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AdhRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AdhRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ })

}]);
//# sourceMappingURL=adh-adh-module.js.map