<template>
  <div class="hello">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      <code>components/HelloWorld.vue</code>
    </p>
    <button type="button" @click="count--">minus count</button>
  </div>
</template>

<script>
import XXService from '@/component/XXService'
import YYService from '@/component/YYService'
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    title: {
      type: String,
      required: true,
    }
  },
  data() { 
    return {
      count: 0,
    }
  }
}
</script>
