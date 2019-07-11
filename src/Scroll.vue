<template>
<div class="demo">
  <div class="xscroll"
    ref="xscroll"
  >
    <div class="scroll-wrapper">
      <div class="scroll"
        ref="scroll"
      >
        <div class="content"
          ref="content"
        >
          <div v-for="(item, idx) in list">{{idx}}</div>
        </div>
      </div>
    </div>
    <div class="item"
      v-for="item in cycle"
    >
      {{item}}
    </div>
  </div>
</div>
</template>

<script>

import BScroll from 'better-scroll'

function getTranslateX (dom) {
  var style = window.getComputedStyle(dom);
  var matrix = new WebKitCSSMatrix(style.webkitTransform);
  // console.log('translateX: ', matrix.m41);
  return matrix.m41
}

export default {
  data () {
    return {
      cycle: [1, 2, 3, 4, 5],
      list: Array.apply(null, { length: 100 }).fill(0)
    }
  },

  mounted () {
    this.$nextTick()
      .then(() => {
        // this.initScroll()
      })

    this.initEvent()
  },

  methods: {

    initEvent () {
      const dom = this.$refs.xscroll

      dom.addEventListener('touchstart', e => {
        this.downX = e.targetTouches[0].pageX
        this.downY = e.targetTouches[0].pageY
        // console.log('down', e, this.downX, this.downY)
        // console.log(getTranslateX(dom))

        this.originX = getTranslateX(dom)

      }, false)

      dom.addEventListener('touchmove', e => {
        this.moveX = e.targetTouches[0].pageX
        this.moveY = e.targetTouches[0].pageY
// console.log(getTranslateX(dom))
        const diffX = this.moveX - this.downX
        const diffY = this.moveY - this.downY
        // console.log('move', diffX)
        // dom.style.transform = `translateX(${diffX}px)`
        dom.style.transform = `translateX(${this.originX + diffX}px)`

      }, false)

      dom.addEventListener('touchend', e => {
        this.upX = e.changedTouches[0].pageX
        this.upY = e.changedTouches[0].pageY
        // console.log('touchend', e, this.upX, this.upY)
      }, false)
    },

    initScroll () {

      const opts = {
        // scrollX: true,
        // scrollY: false,
        scrollbar: true
      }

      this.scroll = new BScroll(this.$refs.scroll, opts)

      this.scroll.on('scroll', e => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="less">
  .demo{
    width: 500px;
    overflow: hidden;
  }
  .scroll-wrapper{
    display: inline-block;
    text-align: center;
  }
  .xscroll{
    white-space: nowrap;
    width: 400vw;
  }

  .item{
    display: inline-block;
    width: 100px;
  }

  .scroll{
    width: 350px;
    height: 500px;
    overflow: hidden;
    background-color: #dedede;
  }

  .content{
    width: 1000px;
  }

</style>


https://www.cnblogs.com/Mrrabbit/p/7065441.html
var startx, starty;
    //获得角度
    function getAngle(angx, angy) {
        return Math.atan2(angy, angx) * 180 / Math.PI;
    };
 
    //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
    function getDirection(startx, starty, endx, endy) {
        var angx = endx - startx;
        var angy = endy - starty;
        var result = 0;
 
        //如果滑动距离太短
        if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
            return result;
        }
 
        var angle = getAngle(angx, angy);
        if (angle >= -135 && angle <= -45) {
            result = 1;
        } else if (angle > 45 && angle < 135) {
            result = 2;
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            result = 3;
        } else if (angle >= -45 && angle <= 45) {
            result = 4;
        }
 
        return result;
    }
    //手指接触屏幕
    document.addEventListener("touchstart", function(e) {
        startx = e.touches[0].pageX;
        starty = e.touches[0].pageY;
    }, false);
    //手指离开屏幕
    document.addEventListener("touchend", function(e) {
        var endx, endy;
        endx = e.changedTouches[0].pageX;
        endy = e.changedTouches[0].pageY;
        var direction = getDirection(startx, starty, endx, endy);
        switch (direction) {
            case 0:
                alert("未滑动！");
                break;
            case 1:
                alert("向上！")
                break;
            case 2:
                alert("向下！")
                break;
            case 3:
                alert("向左！")
                break;
            case 4:
                alert("向右！")
                break;
            default:
        }
    }, false);