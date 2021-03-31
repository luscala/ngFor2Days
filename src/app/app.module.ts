import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloPipe } from "./hello.pipe";
import { TrimDirective } from "./trim.directive";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, HelloPipe, TrimDirective],
  bootstrap: [AppComponent]
})
export class AppModule {}
