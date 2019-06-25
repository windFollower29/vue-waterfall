<template>
  <div class="waterfall-slot card"
    :key="data.key"
    :index="data.index"
    :class="[
      'card-' + data.index,
      data.error && 'error'
    ]"
    :style="{
      top: data.top + 'px',
      left: data.left + 'px'
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {

  props: {
    data: {}
  },

  data () {
    return {

    }
  }
}
</script>