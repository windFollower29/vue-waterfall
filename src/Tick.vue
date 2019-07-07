<template>
  <div>
    <button
      class="button"
      ref="button"
      @click="onClick"
    >修改为100</button>
    

    <div class="text">数值：{{num}}</div>
  </div>
</template>

<script>

let count = 1

export default {
  data () {
    return {
      num: 0
    }
  },

  mounted () {
    // console.log('begin')
    // this.$refs.button.click()
    // console.log('end')

    // var btn = this.$refs.button
    // var btn = document.querySelector('button')

    // btn.onclick = function(){

    //     console.log('click', count++);

    //     setTimeout(function(){
    //         //页面失去响应2s。
    //         var time = new Date().getTime();
    //         while(new Date().getTime()-time < 2000){};
    //         btn.style.display = 'none'
    //         console.log('timeout');
    //     }, 0)
    //     console.log('end')
    // }

    // var btn = document.querySelector('button'); 
    // btn.onclick = function(){

    //   console.log('click');
    //   //页面失去响应2s。
    //   var time = new Date().getTime();
    //   while(new Date().getTime()-time < 2000){};
    //   console.log('after_2s')
    //   setTimeout(function(){
    //       console.log('timeout');
    //   }, 0)
    // }


    var btn = document.querySelector('button'); 
    var promise = new Promise(function(resolve){
        resolve();
    })  
    btn.onclick = function(){

      console.log('click');

      //页面失去响应2s。
      var time = new Date().getTime();
      while(new Date().getTime()-time < 2000){};

      promise.then(function(){
          console.log('then');
      }).then(() => {
        console.log('then_again')
      })

    }   
    // btn.click()
    // btn.click()
    // btn.click()
  },

  methods: {
    begin () {

      this.num++
      console.log('now: ', document.querySelector('.text').textContent)

      this.$nextTick(() => {
        const text = document.querySelector('.text').textContent
        console.log('nextTick: ', text)

        // this.num == 2 && this.onClick()
        this.num == 2 && this.$refs.button.click()
        console.log('after_click', this.num)
        this.num < 4 && this.begin()
      })
    },

    onClick () {
      // this.num = 100
      // console.log('click_now: ', document.querySelector('.text').textContent)

      // this.$nextTick(() => {
      //   const text = document.querySelector('.text').textContent
      //   console.log('click_nextTick: ', text)
      // })
    }
  }
}
</script>