import React from "react";
import styles from './TrackList.module.css';
import Track from '../Track/Track';

function TrackList(props) {
    return (
        <div className={styles.Tracklist}>
        {/* <!-- You will add a map method that renders a set of Track components  --> */}
        {props.userSearchResults?.map((track) => (
          <Track 
            track={track} 
            key={track.id}
            onAdd={props.onAdd}
            onRemove={props.onRemove}
            isRemoval={props.isRemoval} 
          />
        ))}

      </div>
      
    );
}

export default TrackList;