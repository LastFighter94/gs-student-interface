<template>

<Header/>
<router-view/>
<Bottom/>

</template>

<script>

import Header from '@/components/staticUI/Header'
import Bottom from '@/components/staticUI/Bottom'

export default {
  components: {
    Header,
    Bottom
  },
  name: 'App'
}

</script>

<style>
@import "assets/style.css"
</style>
