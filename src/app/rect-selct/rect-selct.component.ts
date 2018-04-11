import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';
declare var Snap: any;

@Component({
  selector: 'app-rect-selct',
  templateUrl: './rect-selct.component.html',
  styleUrls: ['./rect-selct.component.css']
})
export class RectSelctComponent implements OnInit {
  svg: any;
  g: any;
  list = [];
  mouseRect: any;
  selectBoxTopX: any;
  selectBoxTopY: any;
  selectBoxBottomX: any;
  selectBoxBottomY: any;
  flag: any;

  @ViewChild('svg1') svg1: ElementRef;
  constructor() {}

  ngOnInit() {
    this.svg = Snap('#svg');
    this.g = this.svg.g().attr({ id: 'circle' });
    const that = this;
    this.g.add(this.svg.text(150, 50, ['S', 'n', 'a', 'p']));
    for (let i = 1; i < 10; i++) {
      const redCircle = this.svg.circle(50 * i, 400, 20).attr({ stroke: 'red', fill: 'transparent'});
      this.g.add(redCircle);
    }
    // console.log();
  }
  // 加div的方式画矩形
  down() {
    console.log(this.flag)
    event.preventDefault();
    event.stopPropagation();
    const offsetDis = this.svg1.nativeElement.getBoundingClientRect();
    const that = this;
    const x = event['clientX'];
    const y = event['clientY'];
    const pointX = x - offsetDis.left;
    const pointY = y - offsetDis.top;
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.border = '1px solid #ccc';
    document.getElementById('svgBox').appendChild(div);
    document.onmousemove = function(ev) {
      console.log('move')
      ev.stopPropagation();
      ev.preventDefault();
      that.selectBoxTopX = Math.min(ev.clientX, x) - offsetDis.left;
      div.style.left = that.selectBoxTopX + 'px';
      that.selectBoxTopY = Math.min(ev.clientY, y) - offsetDis.top;
      div.style.top = that.selectBoxTopY + 'px';
      div.style.width = Math.abs(x - ev.clientX) + 'px';
      div.style.height = Math.abs(y - ev.clientY) + 'px';
      that.selectBoxBottomX = that.selectBoxTopX + Math.abs(x - ev.clientX);
      that.selectBoxBottomY = that.selectBoxTopY + Math.abs(y - ev.clientY);
    };
    document.onmouseup = function() {
      event.preventDefault();
      div.parentNode.removeChild(div);
      document.onmousemove = null;
      document.onmouseup = null;
      // that.list.push(document.querySelectorAll('#circle'));
      const circleGroup = Snap.selectAll('#circle>circle');
      console.log(circleGroup);
      for (let i = 0, l = circleGroup.length; i < l; i++) {
        const data = circleGroup[i].getBBox();
        if (
          that.selectBoxTopX <= data.x &&
          data.x2 <= that.selectBoxBottomX &&
          data.y >= that.selectBoxTopY &&
          data.y2 <= that.selectBoxBottomY
        ) {
          circleGroup[i].attr({ fill: 'yellow' });
        } else if (data.x <= pointX && pointX <= data.x2 && data.y <= pointY && pointY <= data.y2){
          circleGroup[i].attr({ fill: 'yellow' });
        } else {
          circleGroup[i].attr({ fill: 'blue' });
        }
      }
    };
  }
  @HostListener('window:keydown', ['$event'])
  keyDown() {
    // console.log(event);
    // console.log(event['ctrlKey']);
    if (event['ctrlKey']) {
      this.flag = true;
      // alert(event['ctrlKey']);
      // const list = Snap.selectAll('#circle>circle');
      // for (let i = 0, l = list.length; i < l; i++) {
      //   list[i].click(function(){
      //     this.attr({fill: 'green'});
      //   });
      // }
    }
  }
  @HostListener('window:keyup', ['$event'])
  keyUp() {
    this.flag = false;
    // console.log(event);
    // console.log(event['ctrlKey']);
    // const list = Snap.selectAll('#circle>circle');
    // for (let i = 0, l = list.length; i < l; i++) {
    //   list[i].click(function(){
    //     this.attr({fill: 'red'});
    //   });
    // }
  }
  // @HostListener('click', ['$event']) aa(){
  //   console.log(event);
  // }
  // 用svg画出矩形，无法实现对上一次的清零
  // down() {
  //   this.a.remove();
  //   const svg = this.svg;
  //   let mouseRect;
  //   const x = event['offsetX'];
  //   const y = event['offsetY'];
  //   document.onmousemove = function(i){
  //     // mouseRect.clear();
  //     const w = Math.abs(i.offsetX - x);
  //     const h = Math.abs(i.offsetY - y);
  //     // if (mouseRect === 'undefind') {
  //       mouseRect = svg.rect(Math.min(x, i.offsetX), Math.min(i.offsetY, y), w, h).attr({stroke: 'blue', fill: 'rgba(221,221,221,0.5)'});
  //       // mouseRect.remove();
  //     // }
  //     // if (mouseRect) {
  //     //   mouseRect.remove();
  //     //   mouseRect = svg.rect(Math.min(x, i.offsetX), Math.min(i.offsetY, y), w, h).attr({stroke: 'blue', fill: 'rgba(221,221,221,0.5)'});
  //     // }
  //   };
  //   document.onmouseup = function(){
  //     console.log(mouseRect);
  //     mouseRect.remove();
  //     document.onmousemove = null;
  //     document.onmouseup = null;
  //   };
  // }
}
