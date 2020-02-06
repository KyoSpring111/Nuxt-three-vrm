<template>
  <section class="artwork">
    <canvas class="artwork__canvas" ref="canvas"></canvas>
  </section>
</template>

<script>
import ArtworkGL from "./js/ArtworkGL";

export default {
  name: 'artwork',
  components: {},
  props: [],
  data () {
    // 基本的にはここにthree.jsのオブジェクトを追加しない。
    return {
    }
  },
  computed: {
  },
  mounted () {
     // canvas要素を渡す。
     this.artworkGL = new ArtworkGL({
       $canvas: this.$refs.canvas
     });
  },
  destroyed() {
    // canvasを作ったり壊したりする前提の場合はここに処理停止する処理を書く（今回省略）。
  },
  methods: {
    // この中にthree.jsの処理をばりばり書かない。
  }
}
</script>

<style>
  /* スタイルなどお好みで　*/
  .artwork{
    position: fixed;
  }
</style>