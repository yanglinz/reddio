<!doctype html>
<html class="no-js" lang="">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Reddio</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="/_assets/styles/main.css">
</head>
<body>
  <!-- Mount node for song browser -->
  <div id="app"></div>

  <!-- Audio wrapper -->
  <div id="audio">
    <div id="audio_iframes">
      <!-- Youtube iframe wrapper  -->
      <div id="youtube">
        <div id="youtube_player"></div>
      </div>

      <!-- Soundcloud iframe wrapper  -->
      <div id="soundcloud">
        <iframe
          id="soundcloud_player"
          width="100%" height="50"
          scrolling="no"
          frameborder="no"
          src="https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F1848538&show_artwork=true">
        </iframe>
      </div>
    </div>

    <!-- Mount audio player controller  -->
    <div id="audio_player"></div>
  </div>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <script src="/_assets/scripts/main.js"></script>
</body>
</html>
