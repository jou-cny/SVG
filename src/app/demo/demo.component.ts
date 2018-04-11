import { Component, OnInit } from '@angular/core';
declare var Snap: any;
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  width = 800;
  height = 700;
  pointX: any;
  pointY: any;
  scale = 1;
  svg: any;
  g: any;
  constructor() { }

  ngOnInit() {
    const dom = document.getElementById('svgBox');
    this.svg = Snap('#svg');
    this.svg.attr({viewBox: `0 0 800 700`});
    this.g = this.svg.g();
    this.g.add(this.svg.circle(100, 100, 100).attr({stroke: 'red', fill: 'transparent'}));
    this.g.add(this.svg.circle(100, 100, 5).attr({fill: 'red'}));
    
  }
  move() {
      this.pointX = event['offsetX'];
      this.pointY = event['offsetY'];
  }
  wheel() {
    const x = event['offsetX'];
    const y = event['offsetY'];
    const dis = event['wheelDelta'] === 120 ? 0.8 : 1.125;
    if (dis > 1) {
      this.scale = dis * this.scale;
      const disX = (x - x / this.scale) * this.scale;
      const disY = (y - y / this.scale) * this.scale;
      this.svg.attr({'viewBox': `${-disX} ${-disY} ${this.width * this.scale} ${this.height * this.scale}`});
    }else {
      this.scale = dis * this.scale;
      const disX = (x / this.scale - x) * this.scale;
      const disY = (y / this.scale - y) * this.scale;
      this.svg.attr({'viewBox': `${disX} ${disY} ${this.width * this.scale} ${this.height * this.scale}`});
    }
  }
}
