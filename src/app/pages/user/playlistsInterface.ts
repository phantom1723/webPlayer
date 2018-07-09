export interface PlaylistItem {
    playlistName: string,
    tracks: playlistTrackItem[]
}

interface playlistTrackItem {
    albumName: string,
    artistName: string,
    duration_ms: string,
    image: string,
    preview_url: string,
    trackName: string
}