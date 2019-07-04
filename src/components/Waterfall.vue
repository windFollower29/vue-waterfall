<template>
  <div class="waterfall"
    ref="waterfall"
  >
    <div class="waterfall-slot card"
      v-for="(item, idx) in data"
      :key="idx"
      :class="[
        'card-' + idx,
        item.error && 'error'
      ]"
      :style="{
        top: item.top + 'px',
        left: item.left + 'px',
        width: cardWidth + 'px'
      }"
    >
      <slot :card="item" :index="idx"></slot>
    </div>
  </div>
</template>

<script>

const RESIZE_DELAY = 500

export default {

  props: {
    list: {},
    colmnNum: {
      default: 2
    },
    gapWidth: {
      default: 50
    },
    gapHeight: {
      default: 20
    },
    bottomOffset: {
      default: 0
    },
    syncLoadImage: {
      default: false
    }
  },

  watch: {
    list (next, prev) {
      console.log(next, prev)
  
      // const arr = [ ...nextList ]
      // arr.forEach((item, idx) => {
      //   // 标上序号
      //   item.index = this.data.length + idx
      // })

      // 清空当前瀑布流
      if (next.length === 0) {
        console.log(JSON.stringify(next))
        this.data = []
        this.renderIndex = 0
        this.resetHeights()
        return
      }

      // 加长瀑布流(前一次数据已render完成)
      if (
        (
          !prev
          || next.length > prev.length
        )
        && this.finishFlag
      ) {

        this.finishFlag = 0

        this.syncLoadImage
          ? this.loadImage()
          : this.renderList()

        return
      }

      // 修改瀑布流（前一次数据未render完成）
      if (
        !this.finishFlag
      ) {
        
      }

    }
  },

  data () {

    return {
      data: [],
      cardWidth: undefined,

    }
  },

  created () {

    this.renderIndex = 0
    this.finishFlag = 1
    
    this.isNomore = false
    this.isResizing = false

    this.resizeTimer = null

    this.frame = document.createElement('frame')
    document.body.appendChild(this.frame)

    this.resetHeights()
    this.initScroll()
    // this.initResize()

  },

  mounted () {
    this.calculateCardWidth()
  },

  methods: {
    initResize () {
      window.addEventListener('resize', this.onResize.bind(this))
    },

    onResize (e) {

      if (this.resizeTimer) clearTimeout(this.resizeTimer)

      window.timer = this.resizeTimer = setTimeout(() => {
        
        this.isResizing = true
        this.calculateCardWidth()
  
        this.resize()
          .then(() => {
  
            this.isResizing = false
          })

      }, RESIZE_DELAY);
    },

    calculateCardWidth () {
      this.cardWidth = (this.$refs.waterfall.getBoundingClientRect().width - (this.colmnNum - 1) * this.gapWidth) / this.colmnNum
    },

    async resize () {
      console.log('loading resize...')
      this.resetHeights()

      for (let i = 0; i < this.data.length; i++) {

        const { oWidth, oHeight } = this.data[i]
        const imgHeight = this.cardWidth / oWidth * oHeight

        const { top, left, index } = this.getPosition()
        this.$set(
          this.data,
          i,
          Object.assign(this.data[i], {
            imgHeight,
            top,
            left
          })
        )

        await new Promise((resolve, reject) => {
          this.$nextTick(() => {
            this.updateHeights(this.data[i], index)
            resolve()
          })
        })
      }
    },

    getPosition () {
      const min = Math.min.apply(null, this.heights)
      const index = this.heights.findIndex((h, idx) => h === min)

      return {
        top: this.heights[index] + this.gapHeight,
        left: (this.cardWidth + this.gapWidth) * index,
        index
      }
    },

    updateHeights (item, index) {
      const dom = document.querySelector(`.card-${item.index}`)
      this.heights[index] = dom.offsetTop + dom.clientHeight
    },

    resetHeights () {
      this.heights= Array.apply(null, { length: this.colmnNum }).fill(0)
    },

    initScroll () {
      window.addEventListener('scroll', e => {

        if (
          this.isNomore &&
          !this.isResizing &&
          document.documentElement.scrollTop
            + window.innerHeight
            + this.bottomOffset
            > Math.max.apply(null, this.heights)
        ) {
          this.isNomore = false
          this.$emit('loadmore')
        }
      }, false)
    },

    loadImage () {
      const list = arr.map(item => {

        // const img = document.createElement('img')
        // img.className += 'img-hidden'
        const img = new Image()

        return new Promise((resolve, reject) => {

          img.onload = e => {
            // const { width, height } = img.getBoundingClientRect()
            const { width, height } = img
            const _height = this.cardWidth / width * height
            // console.log(img, img.width, width)
            Object.assign(item, {
              imgHeight: _height,
              oWidth: width,
              oHeight: height
            })
            resolve()
            // document.body.removeChild(img)
          }
          img.onerror = e => {
            item.error = true
            resolve()
            // document.body.removeChild(img)
          }
          img.src = item.src
          console.log('---')
          // document.body.appendChild(img)
          // this.frame.appendChild(img)
        })
      })

      Promise.all(list)
        .then(() => {
          this.renderList(arr)
        })
    },

    renderList () {

      const item = this.list[this.renderIndex]

      const min = Math.min.apply(null, this.heights)

      const index = this.heights.findIndex((h, idx) => h === min)

      Object.assign(item, {
        top: this.heights[index] + this.gapHeight,
        left: (this.cardWidth + this.gapWidth) * index,
        width: this.cardWidth,
        height: Math.random() * 20 + 100,
        index: this.renderIndex
      })

      this.data.push(item)
      this.renderIndex++

      this.$nextTick(() => {
        // 计算下一个元素的top值
        const dom = document.querySelector(`.card-${item.index}`)
        this.heights[index] = dom.offsetTop + dom.clientHeight

        console.log(item.index, dom.offsetTop, dom.clientHeight, dom.offsetTop + dom.clientHeight + this.gapHeight)

        if (this.renderIndex < this.list.length) {
          this.renderList()
        } else {
          console.log('end')
          this.isNomore = true
          this.finishFlag = 1
          this.$emit('finish-render')
        }
      })

    },

    getHeight () {

      return Math.max.apply(null, this.heights)
    }
  }
}
</script>

<style lang="less">

.waterfall{
  position: relative;

  .card{
    position: absolute;
    background-color: #fff;
    box-shadow: 0 0 28px 5px rgba(0,0,0,.1);
    border-radius: 6px;
    overflow: hidden;

    .img{
      overflow: hidden;
    }

    img{
      display: block;
      width: 100%;

    }

    &.error{

      .img{
        width: 100%;
        height: 200px;
        background-image: url(data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk1M0JCM0QwNkVFNDExRThCNTJCQUQ2RDFGQzg0NzIxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk1M0JCM0NGNkVFNDExRThCNTJCQUQ2RDFGQzg0NzIxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTYwRUMyMDE2RUUzMTFFOEJCRTU5RTFDODg1ODgwMjYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTYwRUMyMDI2RUUzMTFFOEJCRTU5RTFDODg1ODgwMjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAQCwsLDAsQDAwQFw8NDxcbFBAQFBsfFxcXFxcfHhcaGhoaFx4eIyUnJSMeLy8zMy8vQEBAQEBAQEBAQEBAQEBAAREPDxETERUSEhUUERQRFBoUFhYUGiYaGhwaGiYwIx4eHh4jMCsuJycnLis1NTAwNTVAQD9AQEBAQEBAQEBAQED/wAARCACRAJEDASIAAhEBAxEB/8QAZQAAAwEBAQAAAAAAAAAAAAAAAAIDAQQHAQEAAAAAAAAAAAAAAAAAAAAAEAACAQMDBAEFAAMBAAAAAAAAAQIRMQMhQRJRYYEycZHBIkITsdFSYhEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9AAAAAMFnNQWt9kAwkssVbV9CTnKb10XQVtLSyAd5ZuzURW27yfhmX9RlDI+wD4Vf/ZVi41SKCdeNI3YEnOXJtOiBZZr/wBGcMi2Ft7AXjli76PoOcqael0Mpyg9NV0A6QEhNTWl90MBoAAAAAAGGiTlxjXfZAZkycdEqyI3q26sOrd92CTm6bbsA1boh1i3lqPGKiqIZAYklYHY0x6tIDY2B3NdjEBgNJ3NACTxbx0E1TozoYsoqSowI2o06MtjyctGqSItODptsw6NX2YHSaJCXKNd90OAAAAYznnLnJvZWK5pUjRXloiNdwCjk0l9S0YqKohcSpGrvLUcDUBLK23x23FWNtVSAuHch/KXQP5PoBdqq77GJ1XfczFVKjVBcuPk6rXqBQCH8n0D+UugFwZD+bV1oNif5OOzQDyipKjI0cW0/qXYmVVjVXjqAkZcHXZ3OhHNXcthlWNHeOjAoAABDLKs6bISlWl1Busm+42Jfm30At2BmI1gRy+3gpD1XwTy+3gpH1QDASyt8uKdFuJRw1iwOjdBKy+TIutGbK3kAAxtJNuwiywdmA7s/glj9/BV04unQli9l8AWDsBjAhSja6D4pUnTZmZV+afUVOkk+4HUBgAc0bD4v2+fsJGw+L9vn7AVQMEDAjl9vBSHqvgnl9vBSHqvgDJwbfJC8JPSlEO5wTo3qMnUDEqNGz0jXoD08BRSXyBB/m6u2xvFPQ1qjoDAVNxqv1ZuJUnT5BGw9/AFQYAwJZf1+fsJKw+X9fn7CSsB0AAAc7VG13GxP82uoZFSbezFWkkwOgGCBgRy15adDZTaioq7QZPfwZQDFFfPc2MnB0vE1AwCc+WituPjaS4kzU6agPkS9hEVeqJJU0AAh7+ACHv4AqAAwI5X+aXQVKrS7g3WTY2ONZp7IC9AAAJ5lWNf+dSV1XqdL1VGc8lxk47bAUxyqqO60GIpuL5LyuxZNNVVtmAmVfkpbbi1RYAI1QVRYAI1QJ1aRYzdAbJ8Y1I1RZggI1SNxL8uW1NCoAYxckqKiu9Bm0lV23ZFtyfJ+F2Ayyr0K4VSNf8ArUnFcpKO250LRUQABoAYLkhzXdWHMA5u26uNGXF9tx8uOusfYlbTcC6aaqrdTTnTlHVfQrHJF6PRsBwAAC5i9vg0xbgaAIAAxtJVduosskVotWiTcpav6ANKXJ9the27sF9NyuLHTWXsA2OHBd3cYDQAAAAAAAwSeNS1syhgHNRxdJfUK10ujoaTuJLCrp0Amm1Ztdhv6z3Sfkxwmu4leqoBT+1P1f8AkZy4469daEaopllRqPRAH9ZOyp5Fbbu2+xmuyGUJvsAtaaWQUcnSP1Kxwq7dR0krALDGo63Y4GgAAAAAAAAAAAAAAAAAshJ7AAGK6B3YABsNx4gADAAAAAAAAAAAAAf/2Q==);
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }

    }
  }
}
</style>
