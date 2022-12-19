// This file is based on https://github.com/skalinichev/uplot-wrappers/blob/master/common/index.ts

import { Injectable } from '@angular/core';

import * as uPlot from 'uplot';

type OptionsUpdateState = 'keep' | 'update' | 'create';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
if (!Object.is) {
  // eslint-disable-next-line
  Object.defineProperty(Object, "is", {value: (x: any, y: any) =>
      (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y)
  });
}

@Injectable({
  providedIn: 'root'
})
export class NgxUplotService {

  constructor() { }

  optionsUpdateState(_lhs: uPlot.Options, _rhs: uPlot.Options): OptionsUpdateState {
    if (!_lhs) return 'create';

    const {width: lhsWidth, height: lhsHeight, ...lhs} = _lhs;
    const {width: rhsWidth, height: rhsHeight, ...rhs} = _rhs;

    let state: OptionsUpdateState = 'keep';
    if (lhsHeight !== rhsHeight || lhsWidth !== rhsWidth) {
        state = 'update';
    }
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
        return 'create';
    }
    for (const k of Object.keys(lhs)) {
        if (!Object.is((lhs as any)[k], (rhs as any)[k])) {
            state = 'create';
            break;
        }
    }
    return state;
  }

  dataMatch(lhs: uPlot.AlignedData, rhs: uPlot.AlignedData): boolean {
    if (!lhs) return false;

    if (lhs.length !== rhs.length) {
        return false;
    }
    return lhs.every((lhsOneSeries, seriesIdx) => {
        const rhsOneSeries = rhs[seriesIdx];
        if (lhsOneSeries.length !== rhsOneSeries.length) {
            return false;
        }
        return (lhsOneSeries as any).every((value: any, valueIdx: number) => value === rhsOneSeries[valueIdx]);
    });
  }
}
