import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BacklogPage } from './backlog';
var BacklogPageModule = (function () {
    function BacklogPageModule() {
    }
    BacklogPageModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [],
                    imports: [
                        IonicPageModule.forChild(BacklogPage),
                    ],
                },] },
    ];
    /** @nocollapse */
    BacklogPageModule.ctorParameters = function () { return []; };
    return BacklogPageModule;
}());
export { BacklogPageModule };
//# sourceMappingURL=backlog.module.js.map