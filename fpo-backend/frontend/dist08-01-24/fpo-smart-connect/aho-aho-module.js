(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["aho-aho-module"],{

/***/ "1m9B":
/*!*******************************************!*\
  !*** ./src/app/aho/aho-routing.module.ts ***!
  \*******************************************/
/*! exports provided: AhoRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AhoRoutingModule", function() { return AhoRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_auth_authGuard_auth_guard_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/auth/authGuard/auth-guard.guard */ "dEjV");
/* harmony import */ var _aho_dashboard_aho_dashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./aho-dashboard/aho-dashboard.component */ "q1lP");






const routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    }, {
        path: 'dashboard',
        canActivate: [src_app_auth_authGuard_auth_guard_guard__WEBPACK_IMPORTED_MODULE_2__["AuthGuardGuard"]],
        data: { role: ['AHO'] },
        component: _aho_dashboard_aho_dashboard_component__WEBPACK_IMPORTED_MODULE_3__["AhoDashboardComponent"]
    }
];
class AhoRoutingModule {
}
AhoRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AhoRoutingModule });
AhoRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AhoRoutingModule_Factory(t) { return new (t || AhoRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AhoRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AhoRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "JwPZ":
/*!***********************************!*\
  !*** ./src/app/aho/aho.module.ts ***!
  \***********************************/
/*! exports provided: AhoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AhoModule", function() { return AhoModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _aho_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./aho-routing.module */ "1m9B");
/* harmony import */ var _aho_dashboard_aho_dashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./aho-dashboard/aho-dashboard.component */ "q1lP");





class AhoModule {
}
AhoModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AhoModule });
AhoModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AhoModule_Factory(t) { return new (t || AhoModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _aho_routing_module__WEBPACK_IMPORTED_MODULE_2__["AhoRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AhoModule, { declarations: [_aho_dashboard_aho_dashboard_component__WEBPACK_IMPORTED_MODULE_3__["AhoDashboardComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _aho_routing_module__WEBPACK_IMPORTED_MODULE_2__["AhoRoutingModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AhoModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _aho_dashboard_aho_dashboard_component__WEBPACK_IMPORTED_MODULE_3__["AhoDashboardComponent"]
                ],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _aho_routing_module__WEBPACK_IMPORTED_MODULE_2__["AhoRoutingModule"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "q1lP":
/*!**************************************************************!*\
  !*** ./src/app/aho/aho-dashboard/aho-dashboard.component.ts ***!
  \**************************************************************/
/*! exports provided: AhoDashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AhoDashboardComponent", function() { return AhoDashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class AhoDashboardComponent {
    constructor() { }
    ngOnInit() {
    }
}
AhoDashboardComponent.ɵfac = function AhoDashboardComponent_Factory(t) { return new (t || AhoDashboardComponent)(); };
AhoDashboardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AhoDashboardComponent, selectors: [["app-aho-dashboard"]], decls: 2, vars: 0, template: function AhoDashboardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "aho-dashboard works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhaG8tZGFzaGJvYXJkLmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AhoDashboardComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-aho-dashboard',
                templateUrl: './aho-dashboard.component.html',
                styleUrls: ['./aho-dashboard.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ })

}]);
//# sourceMappingURL=aho-aho-module.js.map