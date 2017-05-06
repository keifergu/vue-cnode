<template>
  <div class="video-container">
    <video id="video" class="tvideo">
      Video stream not available.
    </video>
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
      var _setVideo = this.setVideo.bind(this)
      this.video.addEventListener("canplay", _setVideo)
    },
    beforeDestroy() {
      window.clearInterval(this.intervalId);
    },
    data() {
      return {
        canvas: document.createElement("canvas"),
        image: new Image(),
        intervalId: '',
        options: true
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
        var image = new Image();
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
      getDevices() {
        var options = true;
        if(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices)
        {
          try{
            navigator.mediaDevices.enumerateDevices()
            .then(function(devices) {
              devices.forEach(function(device) {
              if (device.kind === 'videoinput') {
                if(device.label.toLowerCase().search("back") >-1)
                options={'deviceId': {'exact':device.deviceId}, 'facingMode':'environment'} ;
              }
              console.log(device.kind + ": " + device.label +" id = " + device.deviceId);
              });
            });
          }
          catch(e)
          {
            console.log(e);
          }
        }
        else{
          console.log("no navigator.mediaDevices.enumerateDevices" );
        }

        this.options = options;
      },
      initVideoStream() {

        this.getDevices();

        var video = this.video;
        var options = this.options;

        navigator.getMedia = (navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia);

        navigator.getMedia({
          video: options,
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
</style>
