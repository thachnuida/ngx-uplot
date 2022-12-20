# Introduction

**@thachnuida/ngx-uplot** is an Angular wrapper for **uPlot**.

# Demo

[uPlot chart with tooltip](http://thachnuida.github.io/ngx-uplot)

# Installation

```
$ npm install @thachnuida/ngx-uplot uplot --save
```

# Usage

Import uplot css to `angular.json`:

```
"styles": [
  "your/app/styles.css",
  "node_modules/uplot/dist/uPlot.min.css"
],
```

Import the `NgxUplotModule` into your desired module:

```
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { NgxUplotModule } from '@thachnuida/ngx-uplot';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxUplotModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Add `ngx-uplot` to your component:

```
<ngx-uplot [options]="options" [data]="data"></ngx-uplot>
```

# uPlot Document

Please check doucument in [uPlot document](https://github.com/leeoniya/uPlot/tree/master/docs).


# License

`ngx-uplot` is shared under the MIT license.
