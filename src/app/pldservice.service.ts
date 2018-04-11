import { Injectable } from '@angular/core';

@Injectable()
export class PldserviceService {

constructor() { }
aaa(list, list2, Snap, div, selectBoxTopX, selectBoxBottomX, selectBoxTopY, selectBoxBottomY, pointX, pointY) {
    // const that = this;
    console.log(list);
    event.preventDefault();
    div.parentNode.removeChild(div);
    document.onmousemove = null;
    document.onmouseup = null;
    const circleGroup = Snap.selectAll('#circle>circle');
    console.log(circleGroup);
    for (let i = 0, l = circleGroup.length; i < l; i++) {
      const data = circleGroup[i].getBBox();
      if (
        selectBoxTopX <= data.x &&
        data.x2 <= selectBoxBottomX &&
        data.y >= selectBoxTopY &&
        data.y2 <= selectBoxBottomY
      ) {
        list.push(circleGroup[i]);
      } else if (data.x <= pointX && pointX <= data.x2 && data.y <= pointY && pointY <= data.y2){
        list.push(circleGroup[i]);
      } else {
        list2.push(circleGroup[i]);
      }
    }
    for (let i = 0, l = list.length; i < l; i++) {
      list[i].attr({fill: 'red'});
    }
    for (let i = 0, l = list2.length; i < l; i++) {
      list2[i].attr({fill: 'transparent'});
    }
}
}