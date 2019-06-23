<template>
  <div>
    <waterfall
      :list="list"
      @nomore="nomore"
    />
  </div>
</template>

<script>

import Waterfall from './components/Waterfall'

import axios from 'axios'

export default {

  components: {
    Waterfall
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
