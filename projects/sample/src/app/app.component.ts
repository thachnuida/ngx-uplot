import { Component, OnInit } from '@angular/core';

function round6(val: number) {
  return Math.round(val * 1e6) / 1e6;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  options = {
    // width: 1920,
    // height: 600,
    title: "Area Fill",
    scales: {
      x: {
        time: false,
      },
    },
    series: [
      {},
      {
        stroke: "red",
        fill: "rgba(255,0,0,0.1)",
      },
      {
        stroke: "green",
        fill: "rgba(0,255,0,0.1)",
      },
      {
        stroke: "blue",
        fill: "rgba(0,0,255,0.1)",
      },
    ],
  };

  data: any = [];

  ngOnInit() {
    let xs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    let vals = [-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10];

    this.data = [
      new Float32Array(xs),
      new Float32Array(xs.map((t, i) => vals[Math.floor(Math.random() * vals.length)])),
      new Float32Array(xs.map((t, i) => vals[Math.floor(Math.random() * vals.length)])),
      new Float32Array(xs.map((t, i) => vals[Math.floor(Math.random() * vals.length)])),
    ];

    setInterval(() => {
      this.data = [
        new Float32Array(xs),
        new Float32Array(xs.map((t, i) => vals[Math.floor(Math.random() * vals.length)])),
        new Float32Array(xs.map((t, i) => vals[Math.floor(Math.random() * vals.length)])),
        new Float32Array(xs.map((t, i) => vals[Math.floor(Math.random() * vals.length)])),
      ];
    }, 1500)
  }
}
