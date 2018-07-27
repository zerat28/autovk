import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import {AppComponent} from './app.component';
import {NotfoundComponent} from "./core/views/notfound/notfound.component";

import {routing} from "./app.routing";
import {LocationStrategy} from "@angular/common";
import {HashLocationStrategy} from "@angular/common";

import {HttpClientModule} from '@angular/common/http';

import {BaseDataService} from "./core/services/basedataservice";
import {UserService} from "./services/user.service";
import {VkauthService} from "./services/vkauth.service";
import {GroupsService} from "./services/groups.service";
import {TokenService} from "./services/token.service";
import {PostService} from "./services/post.service";
import {DictService} from "./services/dict.service";
import {JqueryService} from "./services/jquery.service";


@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    routing,
    NgbModule.forRoot()
  ],
  providers: [
    BaseDataService,
    UserService,
    VkauthService,
    GroupsService,
    TokenService,
    PostService,
    DictService,
    JqueryService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
