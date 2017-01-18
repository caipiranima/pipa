<style scoped>
  img {
    margin-top: -25px;
    width: 450px;
  }
</style>

<template>
<div>

  <div id="my_camera" style="width:320px; height:240px;"></div>
  <div id="my_result"></div>

  <button v-on:click="take_snapshot">Take Snapshot</button>
</div>
</template>

<script>
import Vue from 'vue'
import Webcam from 'webcamjs'

export default {
    methods: {
        take_snapshot: function() {
            Webcam.snap( function(data_uri) {
                document.getElementById('my_result').innerHTML = '<img src="'+data_uri+'"/>';
            } );
        }
    }
}

Vue.nextTick(function () {
    Webcam.attach( '#my_camera' );
});

</script>
