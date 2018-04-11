import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { RectSelctComponent } from './rect-selct/rect-selct.component';
import { SvgzpdComponent } from './svgzpd/svgzpd.component';
import { RemoveeventComponent } from './removeevent/removeevent.component';
import { PlddemoComponent } from './plddemo/plddemo.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    RectSelctComponent,
    SvgzpdComponent,
    RemoveeventComponent,
    PlddemoComponent
],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
