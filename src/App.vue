<template>
  <div>
    <waterfall
      :list="list"
      @nomore="nomore"
    >
      <waterfall-slot slot-scope="{ card, index}">
        <div class="img">
          <img
            v-if="!card.error"
            :src="card.src"
            :style="{ height: card.error ? '0px' : card.imgHeight + 'px' }"
          />
        </div>
        <div>{{card.info}}</div>
        <div>第{{index}}张图片</div>

      </waterfall-slot>

    </waterfall>
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

    this.getList()

    window.addEventListener('scroll', e => {

      this.onScroll()
    }, false)


  },

  methods: {

    onScroll () {

    },

    getList () {

      axios.get('../static/mock/data.json?group=' + this.group++)
      .then(res => {
        console.log(res)
        this.list = res.data
      })
    },

    nomore () {
      this.getList()
    }

  }
}
</script>

<style>

</style>
