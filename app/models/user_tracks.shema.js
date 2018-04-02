let mongoose = require('mongoose');

let user_tracksSchema = new mongoose.Schema({
  id_creator: {
    type: String,
    required: true,
    unique: true
  },
  playlist:[{
    playlistName: {
      type:String
    },
    tracks:[{
      trackName: {default: "Noname", type: String},
      artistName: String,
      albumName: String,
      duration_ms: String,
      preview_url: String
    }]
  }]
});

let user_tracks = mongoose.model('user_tracks', user_tracksSchema);
module.exports = user_tracks;
