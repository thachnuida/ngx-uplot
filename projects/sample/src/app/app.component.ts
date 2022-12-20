import { Component, OnInit } from '@angular/core';
import placement from 'placement.js';

function round6(val: number) {
  return Math.round(val * 1e6) / 1e6;
}

function tooltipPlugin() {
  let over: any, bound: boolean, bLeft: number, bTop: number;

  function syncBounds() {
    let bbox = over.getBoundingClientRect();
    bLeft = bbox.left;
    bTop = bbox.top;
  }

  const overlay = document.createElement('div');
  overlay.id = "overlay";
  overlay.style.display = "none";
  overlay.style.position = "absolute";
  document.body.appendChild(overlay);

  const anchor = document.createElement('div');
  anchor.style.position = "absolute";
  document.body.appendChild(anchor);

  return {
    hooks: {
      init: (u: any) => {
        over = u.over;

        bound = over;

        over.onmouseenter = () => {
          overlay.style.display = "block";
        };

        over.onmouseleave = () => {
          overlay.style.display = "none";
        };
      },
      setSize: () => {
        syncBounds();
      },
      setCursor: (u: any) => {
        const { left, top, idx } = u.cursor;
        const x = u.data[0][idx];
        const y = u.data[1][idx];
        overlay.textContent = `${x},${y} at ${Math.round(left)},${Math.round(top)}`;
        anchor.style.left = left + 'px';
        anchor.style.top = top + 'px';
        placement(anchor, overlay, {placement: 'right-start'})
      }
    }
  };
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
    title: "Area Fill With Tooltip by placement.js",
    plugins: [
      tooltipPlugin()
    ],
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
