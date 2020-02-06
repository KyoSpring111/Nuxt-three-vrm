<template>
  <div>
    <Artwork />
  </div>
</template>

<script>
import Artwork from "~/components/Artwork";
export default {
  components: {
    Artwork
  },
  watch: {
     // routeが変わるときにシーンを変えるなどなにか処理する
    '$route.name': function(_new, _old){
     }
  }
}
</script>