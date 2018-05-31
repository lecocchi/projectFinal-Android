import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IssuePage } from './issue';
var IssuePageModule = (function () {
    function IssuePageModule() {
    }
    IssuePageModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [],
                    imports: [
                        IonicPageModule.forChild(IssuePage),
                    ],
                },] },
    ];
    /** @nocollapse */
    IssuePageModule.ctorParameters = function () { return []; };
    return IssuePageModule;
}());
export { IssuePageModule };
//# sourceMappingURL=issue.module.js.map