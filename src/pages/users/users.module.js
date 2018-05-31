import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsersPage } from './users';
var UsersPageModule = (function () {
    function UsersPageModule() {
    }
    UsersPageModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [],
                    imports: [
                        IonicPageModule.forChild(UsersPage),
                    ],
                },] },
    ];
    /** @nocollapse */
    UsersPageModule.ctorParameters = function () { return []; };
    return UsersPageModule;
}());
export { UsersPageModule };
//# sourceMappingURL=users.module.js.map