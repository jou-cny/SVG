import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';
import { PldserviceService } from '../pldservice.service';
declare var Snap: any;
@Component({
  selector: 'app-plddemo',
  templateUrl: './plddemo.component.html',
  styleUrls: ['./plddemo.component.css']
})
export class PlddemoComponent implements OnInit {
  svg: any;
  g: any;
  list = [];
  list2 = [];
  selectRectBool: boolean;
  addRectBool: boolean;
  removeRectBool: boolean;
  service: PldserviceService;
  
  flag: any;
  @ViewChild('svg') svgDom: ElementRef;
  constructor() { }

  ngOnInit() {
    this.svg = Snap('#svg').transform(new Snap.Matrix().scale(1, -1, 0, 0));
    this.g = this.svg.g().attr({ id: 'circle' });
    const that = this;
    this.g.add(this.svg.text(150, 50, ['S', 'n', 'a', 'p']));
    for (let i = 1; i < 10; i++) {
      const redCircle = this.svg.circle(50 * i, 400, 20).attr({ stroke: 'red', fill: 'transparent'});
      this.g.add(redCircle);
      const text = this.svg.text(50 * i, 400, 20).attr({ stroke: 'red', fill: 'transparent',id: 'textchar'}).transform(new Snap.Matrix().scale(1, -1, 25*i,200));
      this.g.add(Snap.select('#textchar'))
    }
    this.selectRect();
     const textGroup = this.g.g().attr({id: 'textGroup'}).add(this.svg.text(50, 50, 'are you ok?'));
  }
  selectAll(){
    this.list = Snap.selectAll('#circle>circle');
    for (let i = 0, l = this.list.length; i < l; i++) {
      this.list[i].attr({fill: 'red'});
    }
    this.list[4].node.nextSibling.setAttribute('fill', 'rgb(0, 100, 0)');
  }
  removeAll(){
    this.list2 = Snap.selectAll('#circle>circle');
    for (let i = 0, l = this.list2.length; i < l; i++) {
      this.list2[i].attr({fill: 'transparent'});
    }
  }
  selectRect(){
    this.selectRectBool = true;
    this.addRectBool = false;
    this.removeRectBool = false;
    this.down();
  }
  down() {
    // console.log(event);
    const offsetDis = this.svgDom.nativeElement.getBoundingClientRect();
    const that = this;
    this.svg.mousedown(function(event){
      event.preventDefault();
      event.stopPropagation();
      console.log(event)
      if(event['which'] !== 1){
        return false;
      }
        that.list = [];
        that.list2 = [];
        let selectBoxTopX = null;
        let selectBoxTopY = null;
        let selectBoxBottomX = null;
        let selectBoxBottomY = null;
        let isMove = false;
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
          selectBoxTopX = Math.min(ev.clientX, x) - offsetDis.left;
          div.style.left = selectBoxTopX + 'px';
          selectBoxTopY = Math.min(ev.clientY, y) - offsetDis.top;
          div.style.top = selectBoxTopY + 'px';
          div.style.width = Math.abs(x - ev.clientX) + 'px';
          div.style.height = Math.abs(y - ev.clientY) + 'px';
          selectBoxBottomX = selectBoxTopX + Math.abs(x - ev.clientX);
          selectBoxBottomY = selectBoxTopY + Math.abs(y - ev.clientY);
          if(Math.abs(x - ev.clientX) > 1){
            isMove = true;
          }
        };
        document.onmouseup = function() {
          console.log(that.list)
          event.preventDefault();
          div.parentNode.removeChild(div);
          document.onmousemove = null;
          document.onmouseup = null;
          const circleGroup = Snap.selectAll('#circle>circle');
          const textGroup = Snap.selectAll('#textchar');
          console.log(circleGroup);
          // 判断选中的按钮
          if(that.selectRectBool && !that.flag){
            console.log(that.selectRectBool)
            // 循环pad元素
            for (let i = 0, l = circleGroup.length; i < l; i++) {
              // 获取元素的值
              const data = circleGroup[i].getBBox();
              // 判断鼠标是否移动
              if(isMove){
                // 判断移动时的矩形范围（div），元素外接矩形如果在div范围内则为选定
                if (
                  selectBoxTopX <= data.x &&
                  data.x2 <= selectBoxBottomX &&
                  data.y >= selectBoxTopY &&
                  data.y2 <= selectBoxBottomY
                ) {
                  // 判断该元素是否被重复选择
                  if(circleGroup[i].node['attributes']['4'].value !== '#ff0000'){
                    that.list.push(circleGroup[i]);
                  }
                } else {
                  // 没有选中的元素
                  console.log(circleGroup[i])
                  that.list2.push(circleGroup[i]);
                }
              }else{
                // 鼠标按下后没有移动的情况
                if (data.x <= pointX && pointX <= data.x2 && data.y <= pointY && pointY <= data.y2){
                  if(circleGroup[i].node['attributes']['4'].value !== '#ff0000'){
                    that.list.push(circleGroup[i]);
                  }
                } else {
                  // 判断是否重复
                  if(circleGroup[i].node['attributes']['4'].value !== 'rgba(0,0,0,0)'){
                    that.list2.push(circleGroup[i]);
                  }
                }
              }
            }
            // for (let i = 0, l = textGroup.length; i < l; i++) {
            //   // 获取元素的值
            //   const data = textGroup[i].getBBox()
            //   console.log(textGroup[i].node['attributes']['4'].value)
            //   // 判断鼠标是否移动
            //   if(isMove){
            //     // 判断移动时的矩形范围（div），元素外接矩形如果在div范围内则为选定
            //     if (
            //       selectBoxTopX <= data.x &&
            //       data.x2 <= selectBoxBottomX &&
            //       data.y >= selectBoxTopY &&
            //       data.y2 <= selectBoxBottomY
            //     ) {
            //       // 判断该元素是否被重复选择
            //       if(circleGroup[i].node['attributes']['4'].value !== '#ff0000'){
            //         that.list.push(circleGroup[i]);
            //       }
            //     } else {
            //       // 没有选中的元素
            //       console.log(textGroup[i])
            //       that.list2.push(textGroup[i]);
            //     }
            //   }else{
            //     // 鼠标按下后没有移动的情况
            //     if (data.x <= pointX && pointX <= data.x2 && data.y <= pointY && pointY <= data.y2){
            //       if(circleGroup[i].node['attributes']['4'].value !== '#ff0000'){
            //         that.list.push(circleGroup[i]);
            //       }
            //     } else {
            //       // 判断是否重复
            //       if(textGroup[i].node['attributes']['4'].value !== 'rgba(0,0,0,0)'){
            //         that.list2.push(circleGroup[i]);
            //       }
            //     }
            //   }
            // }

            for (let i = 0, l = that.list.length; i < l; i++) {
              // 改变选中状态
              that.list[i].attr({fill: 'red'});
            }
            for (let i = 0, l = that.list2.length; i < l; i++) {
              that.list2[i].attr({fill: 'transparent'});
            } 
          }
          if(that.addRectBool || that.flag){
            for (let i = 0, l = circleGroup.length; i < l; i++) {
              const data = circleGroup[i].getBBox();
              if (
                selectBoxTopX <= data.x &&
                data.x2 <= selectBoxBottomX &&
                data.y >= selectBoxTopY &&
                data.y2 <= selectBoxBottomY
              ) {
                if(circleGroup[i].node['attributes']['4'].value !== '#ff0000'){
                  that.list.push(circleGroup[i]);
                }
              } else if (data.x <= pointX && pointX <= data.x2 && data.y <= pointY && pointY <= data.y2){
                if(circleGroup[i].node['attributes']['4'].value !== '#ff0000'){
                  that.list.push(circleGroup[i]);
                }
              } else {
                that.list2.push(circleGroup[i]);
              }
            }
            for (let i = 0, l = that.list.length; i < l; i++) {
              that.list[i].attr({fill: 'red'});
            }
          }
          if(that.removeRectBool){
            for (let i = 0, l = circleGroup.length; i < l; i++) {
              const data = circleGroup[i].getBBox();
              if (
                selectBoxTopX <= data.x &&
                data.x2 <= selectBoxBottomX &&
                data.y >= selectBoxTopY &&
                data.y2 <= selectBoxBottomY
              ) {
                that.list2.push(circleGroup[i]);
              } else {
                that.list.push(circleGroup[i]);
              }
            }
            for (let i = 0, l = that.list2.length; i < l; i++) {
              that.list2[i].attr({fill: 'transparent'});
            }
          }
        };
      
     
    });
  }
  addRect(){
    this.selectRectBool = false;
    this.addRectBool = true;
    this.removeRectBool = false;
    this.down();
  }
  add() {
    const offsetDis = this.svgDom.nativeElement.getBoundingClientRect();
    const that = this;
    this.svg.mousedown(function(){
      let selectBoxTopX = null;
      let selectBoxTopY = null;
      let selectBoxBottomX = null;
      let selectBoxBottomY = null;
      console.log(this.flag);
      event.preventDefault();
      event.stopPropagation();
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
        selectBoxTopX = Math.min(ev.clientX, x) - offsetDis.left;
        div.style.left = selectBoxTopX + 'px';
        selectBoxTopY = Math.min(ev.clientY, y) - offsetDis.top;
        div.style.top = selectBoxTopY + 'px';
        div.style.width = Math.abs(x - ev.clientX) + 'px';
        div.style.height = Math.abs(y - ev.clientY) + 'px';
        selectBoxBottomX = selectBoxTopX + Math.abs(x - ev.clientX);
        selectBoxBottomY = selectBoxTopY + Math.abs(y - ev.clientY);
      };
      document.onmouseup = function() {
        console.log(that.list)
        event.preventDefault();
        div.parentNode.removeChild(div);
        document.onmousemove = null;
        document.onmouseup = null;
        const circleGroup = Snap.selectAll('#circle>circle');
        console.log(circleGroup);

      };
    });
  }
  removeRect(){
    this.selectRectBool = false;
    this.addRectBool = false;
    this.removeRectBool = true;
    this.down();
  }
  remove() {
    const offsetDis = this.svgDom.nativeElement.getBoundingClientRect();
    const that = this;
    this.svg.mousedown(function(){
      let selectBoxTopX = null;
      let selectBoxTopY = null;
      let selectBoxBottomX = null;
      let selectBoxBottomY = null;
      event.preventDefault();
      event.stopPropagation();
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
        selectBoxTopX = Math.min(ev.clientX, x) - offsetDis.left;
        div.style.left = selectBoxTopX + 'px';
        selectBoxTopY = Math.min(ev.clientY, y) - offsetDis.top;
        div.style.top = selectBoxTopY + 'px';
        div.style.width = Math.abs(x - ev.clientX) + 'px';
        div.style.height = Math.abs(y - ev.clientY) + 'px';
        selectBoxBottomX = selectBoxTopX + Math.abs(x - ev.clientX);
        selectBoxBottomY = selectBoxTopY + Math.abs(y - ev.clientY);
      };
      document.onmouseup = function() {
        console.log(that.list)
        event.preventDefault();
        div.parentNode.removeChild(div);
        document.onmousemove = null;
        document.onmouseup = null;
        const circleGroup = Snap.selectAll('#circle>circle');
        console.log(circleGroup);

      };
    });
  }
  @HostListener('window:keydown', ['$event']) keyDown(){
    this.flag = true;
  }
  @HostListener('window:keyup', ['$event']) keyUp(){
    this.flag = false;
  }
}











































  // selectRect(){
  //   this.selectRectBool = true;
  //   this.addRectBool = false;
  //   this.removeRectBool = false;
  //   const that = this;
  //   const offsetDis = that.svgDom.nativeElement.getBoundingClientRect();
  //   // let div = null;
  //   let x = null;
  //   let y = null;
  //   let pointX = null;
  //   let pointY = null;

  //   // let svg = this.svg;
  // //  document.onmousedown = this.mouseDown.bind(this, x, y, pointX, pointY, offsetDis);
  // //  document.onmousemove = this.mouseMove.bind(this, x, y, offsetDis, div);
  // //  document.onmouseup = this.mouseUp.bind(this, div, svg, selectBoxTopX, selectBoxBottomX, selectBoxTopY, selectBoxBottomY, pointX, pointY);

  // //  console.log(this.svg);
  // this.svg.mousedown(this.mouseDown.bind(this, x, y, pointX, pointY, offsetDis));
  // //  this.svg.mouseup(this.mouseUp.bind(this, div, this.svg, selectBoxTopX, selectBoxBottomX, selectBoxTopY, selectBoxBottomY, pointX, pointY));]


  //   //{ move 方法不需要按下鼠标（相当于hover事件）
  //     // let b = false;
  //   // this.svg.mousedown(function(){console.log('down'); b = true; });
  //   // if (b) {this.svg.mousemove(function(){console.log('move'); });}
  //   // this.svg.mouseup(function(){console.log('up'); b = false;});}
  // }

//   mouseDown(x, y, pointX, pointY, offsetDis){
//     console.log('down')
//     event.preventDefault();
//     event.stopPropagation();
//     let svg = this.svg;
//      x = event['clientX'];
//      y = event['clientY'];
//     pointX = x - offsetDis.left;
//     pointY = y - offsetDis.top;
//     const div = document.createElement('div');
//     div.style.position = 'absolute';
//     div.style.border = '1px solid #ccc';
//     document.getElementById('svgBox').appendChild(div);
//     // return {x, y, offsetDis, div, selectBoxTopX, selectBoxTopY, selectBoxBottomX, selectBoxBottomY}
//     // this.svg.mousemove(this.mouseMove.bind(this, x, y, offsetDis, div, selectBoxTopX, selectBoxTopY, selectBoxBottomX, selectBoxBottomY));
//     // this.svg.mouseup(this.mouseUp.bind(div, svg, selectBoxTopX, selectBoxBottomX, selectBoxTopY, selectBoxBottomY, pointX, pointY));
//     // this.mouseMove( x, y, offsetDis, div);
//     // this.mouseMove.bind(this, x, y, offsetDis, div, selectBoxTopX, selectBoxTopY, selectBoxBottomX, selectBoxBottomY);
//     document.onmousemove = this.mouseMove.bind(this, x, y, offsetDis, div, pointX, pointY);
//     // this.mouseMove(x, y, offsetDis, div, selectBoxTopX, selectBoxTopY, selectBoxBottomX, selectBoxBottomY);
//     // this.mouseUp(div, svg, selectBoxTopX, selectBoxBottomX, selectBoxTopY, selectBoxBottomY, pointX, pointY);


//   }
//   mouseMove(x, y, offsetDis, div, pointX, pointY) {
//     // document.onmousemove = function(){
//       event.stopPropagation();
//       event.preventDefault();
//       console.log(event['clientX']);
//       const selectBoxTopX = Math.min(event['clientX'], x) - offsetDis.left;
//       div.style.left = selectBoxTopX + 'px';
//       const selectBoxTopY = Math.min(event['clientY'], y) - offsetDis.top;
//       div.style.top = selectBoxTopY + 'px';
//       div.style.width = Math.abs(x - event['clientX']) + 'px';
//       div.style.height = Math.abs(y - event['clientY']) + 'px';
//       const selectBoxBottomX = selectBoxTopX + Math.abs(x - event['clientX']);
//       const selectBoxBottomY = selectBoxTopY + Math.abs(y - event['clientY']);
//     // };
//     document.onmouseup =  this.mouseUp.bind(this, div, selectBoxTopX, selectBoxBottomX, selectBoxTopY, selectBoxBottomY, pointX, pointY);
//   }
//   mouseUp(div, selectBoxTopX, selectBoxBottomX, selectBoxTopY, selectBoxBottomY, pointX, pointY) {
//     // document.onmouseup = function(){
//       event.preventDefault();
//       div.parentNode.removeChild(div);
//       console.log('up');
//       console.log(selectBoxTopX);
//       console.log(selectBoxBottomX);
//       console.log(selectBoxTopY);
//       console.log(selectBoxBottomY);
//       console.log(div);
//       console.log(pointX);
//       console.log(pointY);
//       document.onmousemove = null;
//       document.onmouseup = null;
//       // svg.unmousemove(this.mouseMove)
//       // svg.unmouseup(this.mouseUp)
//       const circleGroup = Snap.selectAll('#circle>circle');
//        console.log(circleGroup);
//        for (let i = 0, l = circleGroup.length; i < l; i++) {
//         const data = circleGroup[i].getBBox();
//          if (
//           selectBoxTopX <= data.x &&
//           data.x2 <= selectBoxBottomX &&
//           data.y >= selectBoxTopY &&
//           data.y2 <= selectBoxBottomY
//         ) {
//           circleGroup[i].attr({ fill: 'yellow' });
//          } else if (data.x <= pointX && pointX <= data.x2 && data.y <= pointY && pointY <= data.y2){
//           circleGroup[i].attr({ fill: 'yellow' });
//         } else {
//           circleGroup[i].attr({ fill: 'blue' });
//         }
//       }
//     // };
//   }
// }
