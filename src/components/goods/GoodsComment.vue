<template>
  <div class="container">
      <comment :id="$route.params.id"></comment>
  </div>
</template>

<script>
import comment from "../common/Comment.vue"

export default {
    components: {
        comment
    }
}
</script>

<style>

</style>
