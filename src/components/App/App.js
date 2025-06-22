import React, { useState } from "react";
import styles from './App.module.css';
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import {Spotify} from '../Spotify/Spotify';

function App () {
  const [searchResults, setSearchResults] = useState([
    {
      name: 'name 1',
      artist: 'artist 1',
      album: 'album 1',
      id: 1
    },
    {
      name: 'name 2',
      artist: 'artist 2',
      album: 'album 2',
      id: 2
    },
    {
      name: 'name 3',
      artist: 'artist 3',
      album: 'album 3',
      id: 3
    },
  ]);
  const [playlistName, setPlaylistName] = useState('ex playlist');
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      name: 'playlist name',
      artist: 'playlist artist',
      album: 'playlist album',
      id: 11
    },
    {
      name: 'playlist name',
      artist: 'playlist artist',
      album: 'playlist album',
      id: 22
    },
    {
      name: 'playlist name',
      artist: 'playlist artist',
      album: 'playlist album',
      id: 33
    },
  ]);
  function addTrack(track){
    const exist = playlistTracks.find((t) => t.id === track.id);
    const newTrack = playlistTracks.concat(track);
    if(exist){
      console.log('Track already exist!')
    } else{
      setPlaylistTracks(newTrack)
    }
  };
  function removeTrack(track){
    const filtered = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(filtered);
  };
  function updatePlaylistName(name){
    setPlaylistName(name);
  };
  function savePlaylist(){
    const trackURIs = playlistTracks.map((t) => t.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      updatePlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  };
  function search(term){
    Spotify.search(term).then((result) => setSearchResults(result));
    //console.log(term);
  }
    return (
        <div>
        <h1>
          Ja<span className={styles.highlight}>mmm</span>ing
        </h1>
        <div className={styles.App}>
          {/* <!-- Add a SearchBar component --> */}
          <SearchBar
            onSearch={search}
            />
          <div className={styles["App-playlist"]}>
            {/* <!-- Add a SearchResults component --> */}
            <SearchResults 
              userSearchResults={searchResults} 
              onAdd={addTrack}
              />
            {/* <!-- Add a Playlist component --> */}
            <Playlist 
              playlistName={playlistName} 
              playlistTracks={playlistTracks}
              onRemove={removeTrack}
              onNameChange={updatePlaylistName}
              onSave={savePlaylist}
              />
          </div>
        </div>
      </div>
        );
}

export default App;