import { Component, OnInit } from '@angular/core';
import * as svgzpd from 'snap.svg.zpd';
declare var Snap: any;
@Component({
  selector: 'app-svgzpd',
  templateUrl: './svgzpd.component.html',
  styleUrls: ['./svgzpd.component.css']
})
export class SvgzpdComponent implements OnInit {
  svg: any;
  constructor() { }

  ngOnInit() {
    this.svg = Snap('#svg');
    const localsvgzpd = svgzpd;
    this.svg.circle(50, 50, 100).attr({storke: 'red'}).transform(new Snap.Matrix().scale(0.5, 0.5, 800 / 2, 700 / 2).translate(350, 300));
    console.log(this.svg);
    this.svg.zpd();
  }
}
