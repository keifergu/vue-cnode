<template>
  <div class="video-container">
    <video id="video" @canplay.native="setVideo" class="tvideo">
      Video stream not available.
    </video>
    <canvas id="canvas" class="tcanvas"></canvas>
  </div>
</template>

<script>
  import jsqrcode from './qrcode/src/qrcode.js'

  let qrcode = jsqrcode();

  var width = 320;
  var height = 0;
  var streaming = false;

  export default {
    name: 'qr-scanner',
    mounted() {
      this.initVideoStream()
      this.interval()
    },
    beforeDestroy() {
      console.log(this.intervalId)
      window.clearInterval(this.intervalId);
    },
    data() {
      return {
        canvas: document.createElement("canvas"),
        image: new Image(),
        intervalId: ''
      }
    },
    computed: {
      video() {
        return document.getElementById('video')
      }
    },
    methods: {
      setVideo() {
        var video = this.video;
        var canvas = this.canvas;

        if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);

            // Firefox currently has a bug where the height can't be read from
            // the video, so we will make assumptions if this happens.

            if (isNaN(height)) {
                height = width / (4 / 3);
            }

            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            streaming = true;
        }
      },
      takePicture() {
        var that = this;
        var canvas = that.canvas;
        var video = that.video;
        var image = that.image;
        var context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(that.video, 0, 0, canvas.width, canvas.height);
        var data = canvas.toDataURL('image/png');
        image.src = data;
        image.onload = function(){
          try {
            var scanString = qrcode.decode(image);
            that.$emit("success", scanString);
          } catch (e) {
            console.log(e.message)
          }
        }
      },
      initVideoStream() {
        var video = this.video;

        navigator.getMedia = (navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia);

        navigator.getMedia({
          video: { facingMode: { exact: "environment" } }, // 优先使用后置摄像头
          audio: false
          },
          function (stream) {
              if (navigator.mozGetUserMedia) {
                  video.mozSrcObject = stream;
              } else {
                  var vendorURL = window.URL || window.webkitURL;
                  video.src = vendorURL.createObjectURL(stream);
              }
              video.play();
          },
          function (err) {
              console.log("An error occured! " + err);
          }
        );
      },
      interval() {
        var _takePic = this.takePicture.bind(this);
        this.intervalId = setInterval(_takePic, 3000);
      }
    }
  }
</script>

<style>
 .video-container {
  position: relative;
 }

 .tvideo {
  margin: 0 5px;
  max-width: 100%;
 }

 .tcanvas {
  position: absolute;
  visibility: false;
 }
</style>
