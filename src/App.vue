<template>
  <div>
    <waterfall
      :list="list"
      @nomore="nomore"
    >
      <waterfall-slot
        v-for="(item, idx) in list"
        :data="item"
        :key="idx"
        :index="idx"
      >
        <div class="img">
          <img
            v-if="!item.error"
            :src="item.src"
            :style="{ height: item.error ? '0px' : item.imgHeight + 'px' }"
          />
        </div>
        <div>{{item.info}}</div>
        <div>第{{idx}}张图片</div>
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
