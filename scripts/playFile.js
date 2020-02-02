const player = require('play-sound')(opts = {})

// player.play('./audioFiles/file.wav', function(err){
//     if (err) throw err
// });

// player.play('./audioFiles/blue.mp3', function(err){
//     if (err) throw err
// });

player.play('../db/phonemesFiles/ability.mp3', function(err){
    if (err) throw err
});

// player.play('../db/phonemesFiles/phonem.mp3', function(err){
//     if (err) throw err
// });
