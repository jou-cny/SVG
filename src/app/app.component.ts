import { Component, OnInit } from "@angular/core";
import * as d3 from '../assets/d3.v3.min.js';
// import * as Snap from 'snapsvg';
declare var Snap: any;
// declare var D3: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {}
  cir: any;
  circle: any;
  c: any;
  group = [];
  svg1: any;
  orignalscale=0.1;
  width = 800;
  height = 700;
  g: any;
  set: any;
  scale = 1;
  x1: number;
  y2: number;
  pointY:number;
  pointX:number;
  zom:any;
  
  wheel() {
   console.log( this.g.getBBox());
   this.g.drag();
let x = event['offsetX'];
let y = event['offsetY'];
    // if (event['wheelDelta'] === 120) {
    //   this.scale = 1.1 * this.scale;

    //   (this.g.transform(new Snap.Matrix().scale(0.1, 0.1, 400, 350).translate(400, 350).scale(this.scale, this.scale, 400, 350)));
    //   console.log(this.scale)
    // }
    // if (event['wheelDelta'] === -120) {
      // this.scale = 0.9 * this.scale;
    //  this.g.transform(new Snap.Matrix().scale(this.scale, this.scale, 400, 350));
      // this.g = this.g.transform(new Snap.Matrix().scale(this.scale, this.scale, event['offsetX'], event['offsetY']));
      // console.log(this.scale)
          this.scale = ((event['wheelDelta'] === 120 ? 0.1 : -0.1) + 1) * this.scale;
          const signal = event['wheelDelta'] === 120 ? 1 : -1;
           this.g.transform(new Snap.Matrix().scale(this.scale, this.scale, x, y));
         
          //  this.g.scale(, 400, 350);
        //   console.log(this.scale)
        // }
     }
  zoomin() {
    console.log(event);
    
    // d3.behavior.zoom().scaleExtent([1, 10]).on("zom", this.zoomed(d3.event.translate));
    console.log(this.zom);
    // this.g.call(this.zom);

  }
  zoomed(){
    // this.g.attr("transform", "translate(" + d3.event.translate + ")scale(" + 0.5 + ")");
    // this.node.call(this.zom,null);
    console.log(d3.event)
    // console.log(this.node)
  }
  node = [];
  
  
  ngOnInit() {
    
    // console.log(a);
    // this.svg1 = Snap('#svg1');

    // for (let i = 0; i < (800 / 20); i++) {
    // this.svg1.line(i * 20, 0, i * 20, 700).attr({stroke: '#000'});
    // this.svg1.line(0, i * 20, 700, i * 20).attr({stroke: '#000'});
    // }
  //   // console.log(this.svg1.attr("width"));
  //   this.svg1.attr({ width: this.width, height: this.height });
    
  //   // this.svg1.attr({});
  //   // this.group = svg1.paper.g();
  //   // let width=200, center_y=300,height=100,semispace=300;
  //   // let pathString = 'M' + (width) + ' ' + (center_y - height / 2) + 'L' + (semispace * 2) + ' ' + (center_y - height / 2);

  //   // svg1.transform(new Snap.Matrix().scale(1, -1, 0, 0)); 画布的Y轴翻转
  //   // let a = svg1.paper.rect(10, 20, 120, 90, 10).attr({fill: 'red'});
  //   // const svg2 = Snap('#svg2');
  //   // svg2.attr({width: 1600});
  //   // svg2.attr({height : 700});
  //   // let b = svg1.paper.rect(10, 20, 120, 90, 10).attr({display:'none'});
  //   this.c = this.svg1
  //     .circle({
  //       cx: 0,
  //       cy: 0,
  //       r: 200
  //       // cx: 20,
  //       // cy: 20,
  //       // r: 20
  //     })
  //     .attr({ stroke: 'red', fill: 'transparent',strokeWidth: '5px' })
  //     // .transform(new Snap.Matrix().scale(0.1, 0.1, this.width / 2, this.height / 2).translate(400, 350))
  //     ;
  //   let b = this.svg1.circle({
  //     cx: 0,
  //     cy: 0,
  //     r: 5
  //     // cx: 20,
  //     // cy: 20,
  //     // r: 20
  //   })
  //   .attr({ stroke: 'blue', fill: '#000' });
  //   let x = this.svg1.circle({
  //     cx: 200,
  //     cy: 200,
  //     r: 5
  //     // cx: 20,
  //     // cy: 20,
  //     // r: 20
  //   })
  //   .attr({ stroke: 'blue', fill: '#000' });
  //   this.zom = d3.behavior.zoom().scaleExtent([1, 10]).on('zoom', this.zoomed());
  //   this.g = this.svg1.g().attr({'fill': 'red','id':'gg'});
  //   this.g.add(this.c);
  //   this.g.add(b).transform(new Snap.Matrix().translate(400, 350)).attr({'cx':'400','cy':'350'});
  //   // console.log(document.getElementById('gg'));
  //  this.node.push(document.getElementById('gg')) ;
  //   console.log(this.node);
  //   console.log(typeof(this.node));
    // this.node[0].call(this);
    // var rect = this.svg1.rect(100, 20, 60, 40);
    // this.svg1.animate({width:300},1000);
    // // rect.onclick = function() {
    //   Snap.animate(0, 150, function(val) {
    //     var m = new Snap.Matrix();
    //     m.translate(val, 0); // translate位移API
    //     rect.transform(m); // 在rect节点应用matrix
    //     }, 1000);
    // };
    // c.click(function(){
    //   c.transform(new Snap.Matrix().scale(1.5, 1.5, 50, 50)); 放大1.5倍
    // });
    // let c = svg1.paper.path('M10 10L90 90').attr({
    //   stroke: '#000',
    //   strokeWidth: 5});
    //   let c1 = svg1.paper.path(`M${-width} ${center_y - height / 2} L${semispace * 2} ${center_y - height / 2}`).attr({
    //     stroke: '#000',
    //     strokeWidth: 5});
    // 局部变换解决
    // for (let o = 0; o < 10; o++) {
    //    this.group.push(svg.circle({
    //     cx: Math.random() * 500,
    //     cy: Math.random() * 500,
    //     r: 50,
    //     stroke : '#f00'
    //   }));
    // let g = f.id.toString;
    // console.log(g,1)
    // let set = svg.selectAll('circle');

    // this.circle.click(function(){
    // console.log(2)
    // })
    // console.log(o)
    // }
    // this.set = svg.selectAll("circle");
    // this.set.click({
    //   function () {
    //     this.set.attr({fill:'#fff'})
    //   }
    // })
    // let a = svg.group(f);
    // console.log(this.group,1)
    // this.group.attr({fill:"#fff"})

    // for(let i=0;i<this.group.length;i++){
    //   this.group[i].attr({fill:'#fff'});
    // }
    // console.log(typeof this.set, this.set)
    // let a = svg.rect(0, 0, 200, 300).attr({stroke: 'red', fill: '#fff'});
    // let b = svg.rect(250, 0, 200, 300).attr({stroke: 'blue', fill: '#fff'});
    // let c = svg.group(a, b);
    // // let c = svg.group(b, a);
    // c.transform(new Snap.Matrix().translate(0, 150));
    // let d = svg.rect(600, 0, 200, 300).attr({stroke: 'yellow', fill: '#fff'});
    // let e = svg.rect(850, 0, 200, 300).attr({stroke: 'green', fill: '#fff'});
    // let f = svg.group(d, e);
    // // // console.log(this.circle,1);
    // let g = svg.group(c, f);
    // g.transform(new Snap.Matrix().translate(0, 150));
    // this.cir = svg.group().add(this.circle);
    // this.cir.click(function(){
    //   this.cir.transform(new Snap.Matrix().translate(0, 150));
    //   console.log(1)
    // });
    // }
    // this.cir.drag();
    // const array: number[];
  }
}
