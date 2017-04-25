<template>
  <div class="login-container">
    <p>this is login</p>
    <video id="video">Video stream not available.</video>
  </div>
</template>

<script>

var getUserMedia =
  (navigator.mediaDevices.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia);

export default {
  name: 'login',
  mounted(){
    var width = 320;    // We will scale the photo width to this
    var height = 0;     // This will be computed based on the input stream

    var streaming = false;

    var canvas = null;
    var photo = null;
    var startbutton = null;
    var video = document.getElementById("video")
    console.log(video)
    navigator.mediaDevices.getUserMedia({ video: true, audio: true})
      .then(function(stream) {
        console.log(stream)
        video.srcObject = stream;
        video.play();
      })
      .catch(function(err) {
        console.log("An error occured! " + err);
      });
    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        streaming = true;
      }
    }, false);
  }
}
</script>

<style scoped>
  .login-container {
    margin: ;
  }
</style>
