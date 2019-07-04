<template>
<div>

  <div class="fixed">
    <div>
      <button @click="clear">清空</button>
    </div>
    <div>
      <button @click="refresh">刷新</button>
    </div>
    <div>
      <button @click="add">加载下一页</button>
    </div>
  </div>

  <div class="waterfall-wrap">
    <waterfall
      :colmn-num="3"
      :gap-width="10"
      :bottom-offset="200"
      :list="list"
      @finish-render="finishRender"
      @loadmore="loadmore"
    >
      <!-- <waterfall-slot slot-scope="{ card, index }"> -->
      <div slot-scope="{ card, index }">

        <div class="img">
          <img
            v-if="!card.error"
            :src="card.src"
            :style="{
              // height: card.error ? '0px' : card.imgHeight + 'px' 
              width: card.width + 'px',
              height: card.height + 'px'
            }"
          />
        </div>
        <div>{{card.info}}</div>
        <div>第{{index}}张图片</div>
        <div v-if="!!(index % 2)">随机出现的我</div>

      </div>

      <!-- </waterfall-slot> -->

    </waterfall>
  </div>
</div>
</template>

<script>

import Waterfall from './components/Waterfall'
import WaterfallSlot from './components/WaterfallSlot'

import axios from 'axios'

export default {

  components: {
    Waterfall,
    WaterfallSlot
  },

  data () {
    return {
      list: []
    }
  },

  created () {

    this.group = 0

    this.getList()

  },

  methods: {

    finishRender () {
      console.log('finishRender')
    },

    getList (clearFlag) {

      setTimeout(() => {
        
        axios.get('../static/mock/data.json?group=' + this.group++)
        .then(res => {

          if (clearFlag) {
            this.list = []
            this.list = res.data
          } else {

            this.list = this.list.concat(res.data)
          }
        })

      }, 1000 * Math.random() + 100);

    },

    loadmore () {
      this.getList()
    },

    clear () {
      this.list = []
    },

    refresh () {
      this.getList(true)
    },

    add () {
      this.getList()
    }

  }
}
</script>

<style lang="stylus" >

*
  padding 0
  margin 0

html,
body
  width 100%
  height 100%

body
  background-color: #ebebeb

.fixed
  position fixed


.waterfall-wrap
  width 80%
  margin 100px auto



</style>
