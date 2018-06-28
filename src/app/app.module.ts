import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {HttpClientModule} from '@angular/common/http';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {ActiveSprintPage} from "../pages/active-sprint/active-sprint";
import {DailyPage} from "../pages/daily/daily";
import {DailyDescriptionPage} from '../pages/daily-description/daily-description';
import {BacklogPage} from '../pages/backlog/backlog';
import {AvatarComponent} from '../components/avatar/avatar';
import {ReportsPage} from "../pages/reports/reports";
import {UsersPage} from "../pages/users/users";
import {IssuePage} from "../pages/issue/issue";
import {UserDescriptionPage} from "../pages/user-description/user-description";
import {ConfigPage} from "../pages/config/config";
import {VersionsPage} from "../pages/versions/versions";
import {VersionsProvider} from '../providers/versions/versions';
import {VersionDescriptionPage} from "../pages/version-description/version-description";
import {UtilsProvider} from '../providers/utils/utils';
import {LabelPage} from "../pages/label/label";
import {LabelProvider} from '../providers/label/label';
import {LabelDescriptionPage} from "../pages/label-description/label-description";
import {PhasePage} from "../pages/phase/phase";
import {PhaseDescriptionPage} from "../pages/phase-description/phase-description";
import {PhaseProvider} from "../providers/phase/phase";
import {PriorityPage} from "../pages/priority/priority";
import {PriorityDescriptionPage} from "../pages/priority-description/priority-description";
import {PrioritiesProvider} from "../providers/priority/priority";
import {RolProvider} from "../providers/rol/rol";
import {RolPage} from "../pages/rol/rol";
import {RolDescriptionPage} from "../pages/rol-description/rol-description";
import {StateProvider} from "../providers/state/state";
import {StatePage} from "../pages/state/state";
import {StateDescriptionPage} from "../pages/state-description/state-description";
import {IssueProvider} from '../providers/issue/issue';
import {DailyItemPage} from "../pages/daily-item/daily-item";
import {FormatDatePipe} from "../pipes/format-date/format-date";
import { DailyProvider } from '../providers/daily/daily';
import { UserProvider } from '../providers/user/user';
import {FilterPersonPage} from "../pages/filter-person/filter-person";

@NgModule({
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
        UsersPage,
        UserDescriptionPage,
        ConfigPage,
        VersionsPage,
        VersionDescriptionPage,
        LabelPage,
        LabelDescriptionPage,
        PhasePage,
        PhaseDescriptionPage,
        PriorityPage,
        PriorityDescriptionPage,
        RolPage,
        RolDescriptionPage,
        StatePage,
        StateDescriptionPage,
        DailyItemPage,
        FormatDatePipe,
        FilterPersonPage
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
        UsersPage,
        UserDescriptionPage,
        ConfigPage,
        VersionsPage,
        VersionDescriptionPage,
        LabelPage,
        LabelDescriptionPage,
        PhasePage,
        PhaseDescriptionPage,
        PriorityPage,
        PriorityDescriptionPage,
        RolPage,
        RolDescriptionPage,
        StatePage,
        StateDescriptionPage,
        DailyItemPage,
        FilterPersonPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        VersionsProvider,
        UtilsProvider,
        LabelProvider,
        PhaseProvider,
        PrioritiesProvider,
        RolProvider,
        StateProvider,
        IssueProvider,
        DailyProvider,
        DailyProvider,
        UserProvider
    ]
})
export class AppModule {}
