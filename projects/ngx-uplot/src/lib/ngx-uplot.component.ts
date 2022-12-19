import { Component, Input, OnInit, OnChanges, SimpleChanges, ElementRef, OnDestroy } from '@angular/core';
import uPlot from 'uplot';
import { NgxUplotService } from './ngx-uplot.service';

@Component({
  selector: 'ngx-uplot',
  template: ``,
  styles: [
    `
    :host {display: block;}
    `
  ]
})
export class NgxUplotComponent implements OnChanges, OnDestroy {

  @Input() options!: any;
  @Input() data!: uPlot.AlignedData;
  /**
   * Flag controlling whether to reset the scales on data change. Defaults to true.
   */
  @Input() resetScales = true;

  chartElm!: uPlot;

  constructor(
    private _element: ElementRef,
    private service: NgxUplotService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    console.log('change');
    if (changes['options']) {
      this.addChartSize();
      const optionState = this.service.optionsUpdateState(changes['options'].previousValue, this.options);
      if (this.chartElm || optionState === 'create') {
        this.create();
      } else if (optionState === 'update') {
        (this.chartElm as uPlot).setSize({ width: this.options.width, height: this.options.height });
      }

    }

    if (changes['data']) {
      if (!this.chartElm) {
        this.create();
      } else if (!this.service.dataMatch(changes['data'].previousValue, this.data)) {
        if (this.resetScales) {
          this.chartElm.setData(this.data, true);
        } else {
          this.chartElm.setData(this.data, false);
          this.chartElm.redraw();
        }
      }
    }
  }

  addChartSize() {
    if (!this.options.width) {
      this.options.width = this._element.nativeElement.clientWidth;
    }
    if (!this.options.height) {
      this.options.height = this._element.nativeElement.clientHeight || 600;
    }
  }

  ngOnDestroy() {
    this.destroy();
  }

  destroy() {
    if (this.chartElm) {
      this.chartElm.destroy();
    }
  }

  create() {
    console.log('create');
    this.destroy();
    if (this.options && this.data) {
      this.chartElm = new uPlot(this.options, this.data, this._element.nativeElement);
    }
  }

}
