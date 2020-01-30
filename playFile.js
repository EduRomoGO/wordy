const player = require('play-sound')(opts = {})

player.play('./audioFiles/file.wav', function(err){
    if (err) throw err
});

player.play('./audioFiles/cathedral.mp3', function(err){
    if (err) throw err
});

