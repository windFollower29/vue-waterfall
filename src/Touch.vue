<template>
  <div class="touch">
    <div class="wrapper"
      ref="wrapper"
    >
      <div class="inner" v-for="(item, idx) in data">
        <div class="" v-for="(item, idx) in data">
          {{idx}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

var Tween = {
    Linear: function(t,b,c,d){ return c*t/d + b; },
    Quad: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t + b;
        },
        easeOut: function(t,b,c,d){
            return -c *(t/=d)*(t-2) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        }
    },
    Quart: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        }
    },
    Quint: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        }
    },
    Sine: {
        easeIn: function(t,b,c,d){
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOut: function(t,b,c,d){
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOut: function(t,b,c,d){
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function(t,b,c,d){
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOut: function(t,b,c,d){
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function(t,b,c,d){
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },
        easeOut: function(t,b,c,d){
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        easeOut: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
        },
        easeInOut: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        }
    },
    Back: {
        easeIn: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        easeOut: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeInOut: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158; 
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn: function(t,b,c,d){
            return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
        },
        easeOut: function(t,b,c,d){
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        easeInOut: function(t,b,c,d){
            if (t < d/2) return Tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
            else return Tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
        }
    }
}	

function scroll(b, c, d){

    var speed = Math.ceil( Tween.Quad.easeOut( scrollTime, b, c, d) );

    $('.carUl').css( 'left', speed );
    examin( $('.carUl').position().left );
    
    if( scrollTime < d ){

        scrollTime += 10;
        timer = setTimeout( function(){
            scroll( b, c, d);
        }, 20);
    }
}

function getTranslateX (dom) {
  var style = window.getComputedStyle(dom);
  var matrix = new WebKitCSSMatrix(style.webkitTransform);
  // console.log('translateX: ', matrix.m41);
  return matrix.m41
}

function getAngle(angx, angy) {
    return Math.atan2(angy, angx) * 180 / Math.PI;
}

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

    console.log(({
      1: '上',
      2: '下',
      3: '左',
      4: '右',
    })[result])

    return result;
}

export default {
  data () {
    return {
      data: Array.apply(null, { length: 100 }).fill(0)
    }
  },

  mounted () {
    // document.addEventListener("wheel",function(e){
    //     e.preventDefault()
    // }, false)
    // document.addEventListener('scroll', (e) => {
    //   e.stopPropagation()
    //   e.preventDefault()
    //   console.log(e)
    // }, false)

    this.initEvent()
  },

  methods: {

    initEvent () {
      const dom = this.$refs.wrapper

      window.addEventListener('touchstart', e => {
        this.downX = e.targetTouches[0].pageX
        this.downY = e.targetTouches[0].pageY
        // console.log('down', e, this.downX, this.downY)
        // console.log(getTranslateX(dom))

        this.originX = getTranslateX(dom)

      }, false)

      window.addEventListener('touchmove', e => {
        this.moveX = e.targetTouches[0].pageX
        this.moveY = e.targetTouches[0].pageY
// console.log(getTranslateX(dom))
        const diffX = this.moveX - this.downX
        const diffY = this.moveY - this.downY
        // console.log('move', diffX)
        // dom.style.transform = `translateX(${diffX}px)`
        const dir = getDirection(this.downX, this.downY, this.moveX, this.moveY)

        if (dir == 3 || dir == 4) {

          dom.style.transform = `translateX(${this.originX + diffX}px)`
        }

      }, false)
      // }, { passive: false })

      // window.ontouchmove = (e) => {
      //   e.preventDefault()
      //   console.log('ontouchmove', e)
      // }

      window.addEventListener('touchend', e => {
        this.upX = e.changedTouches[0].pageX
        this.upY = e.changedTouches[0].pageY
        // console.log('touchend', e, this.upX, this.upY)
        // console.log(getDirection(this.downX, this.downY, this.upX, this.upY))
      }, false)
    },
  }
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
html, body{
  width: 100vw;
  height: 100vh;
}

.touch{
  // width: 200px;
  // height: 200px;
  // border: 1px solid #ccc;
  // margin-top: 100px;
  // margin: 50px;
  overflow-x: hidden;

  .wrapper{
    width: 1000px;
    // height: 400px;
    height: 100vh;
    white-space: nowrap;

    .inner{
      display: inline-block;
      width: 100px;
      // height: 100%;
      height: 200vh;
      background-color: #f00;

    }

    >div{

      &:nth-child(odd){
        background-color: #0f0;
      }
    }
  }
}
</style>
