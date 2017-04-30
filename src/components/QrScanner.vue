<template>
  <div>
    <video id="video" @canplay.native="setVideo">Video stream not available.</video>
    <canvas id="canvas"></canvas>
    <img id="photo" alt="The screen capture will appear in this box.">
  </div>
</template>

<script>
  var width = 320;
  var height = 0;
  var streaming = false;

  export default {
    name: 'qr-scanner',
    mounted() {
      navigator.getMedia = (navigator.getUserMedia ||
                  navigator.webkitGetUserMedia ||
                  navigator.mozGetUserMedia ||
                  navigator.msGetUserMedia);

      navigator.getMedia({
              video: true,
              audio: false
          },
          function (stream) {
              if (navigator.mozGetUserMedia) {
                  this.video.mozSrcObject = stream;
              } else {
                  var vendorURL = window.URL || window.webkitURL;
                  this.video.src = vendorURL.createObjectURL(stream);
              }
              this.video.play();
          },
          function (err) {
              console.log("An error occured! " + err);
          }
      );
    },
    computed: {
      video() {
        return document.getElementById('video')
      },
      canvas() {
        return document.getElementById('canvas')
      },
      photo() {
        return document.getElementById('photo')
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
        var canvas = this.canvas;
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            var data = canvas.toDataURL('image/png');

            var image = new Image()
            image.src = data;
            image.onload = function(){
                try {
                    console.log(qrcode.decode(image));
                } catch(e){
                    console.log(e);
                }

            }
            this.photo.setAttribute('src', data);
        } else {
            this.clearphoto();
        }
      },
      clearPhoto() {
        var canvas = this.canvas;
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/png');
        this.photo.setAttribute('src', data);
      }
    }
  }
</script>
