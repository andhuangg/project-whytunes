import { useState, useEffect } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const MusicCard = ({ track, favoriteSongs }) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setIsChecked(favoriteSongs.some(song => song.trackId === track.trackId));
    }, [favoriteSongs, track.trackId]);

    const handleFavoriteClick = async () => {
        if (isChecked) {
            await removeSong(track);
        } else {
            await addSong(track);
        }
        setIsChecked(!isChecked);
    };

    return (
        <div className="card mb-4 shadow" style={{ width: '80%', margin: 'auto' }}>
            <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                    <img src={track.artworkUrl100} alt="Album cover" />
                    <div style={{ paddingLeft: '20px' }}>
                        <h3 className="card-title">{track.trackName}</h3>
                        <h4 className="card-subtitle mb-2 text-muted">{track.artistName}</h4>
                    </div>
                </div>
                <div style={{ position: 'relative' }}>
                    <audio src={track.previewUrl} controls className="w-75 my-3">
                        O seu navegador não suporta o elemento <code>audio</code>.
                    </audio>
                    <button onClick={handleFavoriteClick} style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)' }} className="btn btn-link text-decoration-none">
                        <FontAwesomeIcon icon={isChecked ? solidHeart : regularHeart} size="lg" />
                    </button>
                </div>
            </div>
        </div>

    );
};


MusicCard.propTypes = {
    track: PropTypes.shape({
        trackId: PropTypes.number.isRequired,
        trackName: PropTypes.string.isRequired,
        previewUrl: PropTypes.string.isRequired,
        artworkUrl100: PropTypes.string.isRequired,
        artistName: PropTypes.string.isRequired,
    }).isRequired,
    favoriteSongs: PropTypes.arrayOf(PropTypes.shape({
        trackId: PropTypes.number.isRequired,
        trackName: PropTypes.string.isRequired,
        previewUrl: PropTypes.string.isRequired,
    })).isRequired,
};

export default MusicCard;
