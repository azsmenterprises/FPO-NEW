(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "VADE":
/*!******************************************************************************!*\
  !*** ./node_modules/ngx-filter-pipe/__ivy_ngcc__/esm2015/ngx-filter-pipe.js ***!
  \******************************************************************************/
/*! exports provided: FilterPipeModule, FilterPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterPipeModule", function() { return FilterPipeModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterPipe", function() { return FilterPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

class FilterPipe {
    /**
     * @param {?} value
     * @param {?} key
     * @return {?}
     */
    static isFoundOnWalking(value, key) {
        let /** @type {?} */ walker = value;
        let /** @type {?} */ found = false;
        do {
            if (walker.hasOwnProperty(key) || Object.getOwnPropertyDescriptor(walker, key)) {
                found = true;
                break;
            }
        } while (walker = Object.getPrototypeOf(walker));
        return found;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    static isNumber(value) {
        return !isNaN(parseInt(value, 10)) && isFinite(value);
    }
    /**
     * Checks function's value if type is function otherwise same value
     * @param {?} value
     * @return {?}
     */
    static getValue(value) {
        return typeof value === 'function' ? value() : value;
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    filterByString(filter) {
        if (filter) {
            filter = filter.toLowerCase();
        }
        return value => !filter || (value ? ('' + value).toLowerCase().indexOf(filter) !== -1 : false);
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    filterByBoolean(filter) {
        return value => Boolean(value) === filter;
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    filterByObject(filter) {
        return value => {
            for (const /** @type {?} */ key in filter) {
                if (key === '$or') {
                    if (!this.filterByOr(filter.$or)(FilterPipe.getValue(value))) {
                        return false;
                    }
                    continue;
                }
                if (!value || !FilterPipe.isFoundOnWalking(value, key)) {
                    return false;
                }
                if (!this.isMatching(filter[key], FilterPipe.getValue(value[key]))) {
                    return false;
                }
            }
            return true;
        };
    }
    /**
     * @param {?} filter
     * @param {?} val
     * @return {?}
     */
    isMatching(filter, val) {
        switch (typeof filter) {
            case 'boolean':
                return this.filterByBoolean(filter)(val);
            case 'string':
                return this.filterByString(filter)(val);
            case 'object':
                return this.filterByObject(filter)(val);
        }
        return this.filterDefault(filter)(val);
    }
    /**
     * Filter value by $or
     * @param {?} filter
     * @return {?}
     */
    filterByOr(filter) {
        return (value) => {
            const /** @type {?} */ length = filter.length;
            const /** @type {?} */ arrayComparison = (i) => value.indexOf(filter[i]) !== -1;
            const /** @type {?} */ otherComparison = (i) => this.isMatching(filter[i], value);
            const /** @type {?} */ comparison = Array.isArray(value) ? arrayComparison : otherComparison;
            for (let /** @type {?} */ i = 0; i < length; i++) {
                if (comparison(i)) {
                    return true;
                }
            }
            return false;
        };
    }
    /**
     * Default filterDefault function
     * @param {?} filter
     * @return {?}
     */
    filterDefault(filter) {
        return (value) => filter === undefined || filter == value;
    }
    /**
     * @param {?} array
     * @param {?} filter
     * @return {?}
     */
    transform(array, filter) {
        if (!array) {
            return array;
        }
        switch (typeof filter) {
            case 'boolean':
                return array.filter(this.filterByBoolean(filter));
            case 'string':
                if (FilterPipe.isNumber(filter)) {
                    return array.filter(this.filterDefault(filter));
                }
                return array.filter(this.filterByString(filter));
            case 'object':
                return array.filter(this.filterByObject(filter));
            case 'function':
                return array.filter(filter);
        }
        return array.filter(this.filterDefault(filter));
    }
}
FilterPipe.ɵfac = function FilterPipe_Factory(t) { return new (t || FilterPipe)(); };
FilterPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "filterBy", type: FilterPipe, pure: false });
FilterPipe.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: FilterPipe, factory: FilterPipe.ɵfac });
/** @nocollapse */
FilterPipe.ctorParameters = () => [];
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FilterPipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"],
        args: [{
                name: 'filterBy',
                pure: false
            }]
    }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FilterPipeModule {
}
FilterPipeModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: FilterPipeModule });
FilterPipeModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function FilterPipeModule_Factory(t) { return new (t || FilterPipeModule)(); }, providers: [FilterPipe] });
/** @nocollapse */
FilterPipeModule.ctorParameters = () => [];
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](FilterPipeModule, { declarations: [FilterPipe], exports: [FilterPipe] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FilterPipeModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [FilterPipe],
                providers: [FilterPipe],
                exports: [FilterPipe]
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */



//# sourceMappingURL=ngx-filter-pipe.js.map

/***/ })

}]);
//# sourceMappingURL=common.js.map