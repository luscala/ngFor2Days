import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloPipe } from "./hello.pipe";
import { TrimDirective } from "./trim.directive";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { Route1Component } from "./route1.component";
import { Route2Component } from "./route2.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: "route1",
        component: Route1Component
      },
      {
        path: "route2",
        component: Route2Component
      },
      {
        path: "**",
        redirectTo: "route1"
      }
    ])
  ],
  declarations: [AppComponent, HelloPipe, TrimDirective, Route1Component],
  bootstrap: [AppComponent]
})
export class AppModule {}
