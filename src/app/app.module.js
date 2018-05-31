import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { ActiveSprintPage } from "../pages/active-sprint/active-sprint";
import { DailyPage } from "../pages/daily/daily";
import { DailyDescriptionPage } from '../pages/daily-description/daily-description';
import { DailyDescriptionProvider } from '../providers/daily-description/daily-description';
import { BacklogPage } from '../pages/backlog/backlog';
import { AvatarComponent } from '../components/avatar/avatar';
import { ReportsPage } from "../pages/reports/reports";
import { UsersPage } from "../pages/users/users";
import { IssuePage } from "../pages/issue/issue";
import { AccordionDetailComponent } from "../components/accordion/accordion-detail/accordion-detail";
import { AccordionPeopleComponent } from "../components/accordion/accordion-people/accordion-people";
import { AccordionDateComponent } from "../components/accordion/accordion-date/accordion-date";
import { AccordionCommentComponent } from "../components/accordion/accordion-comment/accordion-comment";
var AppModule = (function () {
    function AppModule() {
    }
    AppModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        MyApp,
                        HomePage,
                        LoginPage,
                        ActiveSprintPage,
                        DailyPage,
                        DailyDescriptionPage,
                        BacklogPage,
                        AvatarComponent,
                        ReportsPage,
                        UsersPage,
                        IssuePage,
                        AccordionDetailComponent,
                        AccordionPeopleComponent,
                        AccordionDateComponent,
                        AccordionCommentComponent
                    ],
                    imports: [
                        BrowserModule,
                        IonicModule.forRoot(MyApp),
                        HttpClientModule
                    ],
                    bootstrap: [IonicApp],
                    entryComponents: [
                        MyApp,
                        HomePage,
                        LoginPage,
                        ActiveSprintPage,
                        DailyPage,
                        DailyDescriptionPage,
                        BacklogPage,
                        AvatarComponent,
                        ReportsPage,
                        UsersPage,
                        IssuePage,
                        AccordionDetailComponent,
                        AccordionPeopleComponent,
                        AccordionDateComponent,
                        AccordionCommentComponent
                    ],
                    providers: [
                        StatusBar,
                        SplashScreen,
                        DailyDescriptionProvider,
                        { provide: ErrorHandler, useClass: IonicErrorHandler }
                    ]
                },] },
    ];
    /** @nocollapse */
    AppModule.ctorParameters = function () { return []; };
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map