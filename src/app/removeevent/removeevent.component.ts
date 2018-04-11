import { Component, OnInit, HostBinding, HostListener  } from '@angular/core';
declare var Snap: any;
@Component({
  selector: 'app-removeevent',
  templateUrl: './removeevent.component.html',
  styleUrls: ['./removeevent.component.css']
})
export class RemoveeventComponent implements OnInit {
  svg: any;
  g: any;
  constructor() { }
  number = 0;
  flag = true;
  keyDown: boolean;
  ngOnInit() {
    this.svg = Snap('#svg');
      this.svg.circle(50 , 400, 20).attr({ stroke: 'red', fill: 'transparent', id: 'circle' });
      this.svg.circle(150 , 400, 20).attr({ stroke: 'red', fill: 'transparent', id: 'circle' });
  }
  change(i,n) {
    const number = Math.ceil(Math.random() * 3);
    // console.log(i);
    console.log(i);
    // event.target.attributes.fill = 'red';
    // Snap(event.target).attr({fill: 'red'});
    n.attr({fill: 'red'});
    // console.log(this.keyDown);

  }
  remove(){
    Snap.select('#circle').unclick(this.change);
    this.flag = true;
  }
  bing(flag){
    // const n = [1];
    const n = '1';
    if(flag){
      // Snap.select('#circle').click(this.change.call(this.change,n));//用这个会立即执行change方法，然后报错
      const dom = Snap.selectAll('#circle');
      for(let i = 0, l = dom.length; i < l; i++){
        dom[i].click(this.change.bind(this,n,dom[i]));//n dom[i]为想要传递的参数
      }
    }
    this.flag = false;
  }
}
