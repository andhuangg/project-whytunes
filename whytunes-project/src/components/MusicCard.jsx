import { useState, useEffect } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import PropTypes from 'prop-types';

const MusicCard = ({ track, favoriteSongs }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setIsChecked(favoriteSongs.some(song => song.trackId === track.trackId));
    }, [favoriteSongs, track.trackId]);

    const handleCheckboxChange = async () => {
        setIsLoading(true);
        if (isChecked) {
            await removeSong(track);
        } else {
            await addSong(track);
        }
        setIsChecked(!isChecked);
        setIsLoading(false);
    };

    return (
        <div>
            <h3>{track.trackName}</h3>
            <audio src={track.previewUrl} controls>
                O seu navegador não suporta o elemento <code>audio</code>.
            </audio>
            <label htmlFor={`checkbox-music-${track.trackId}`}>
                Favorita
                <input
                    type="checkbox"
                    id={`checkbox-music-${track.trackId}`}
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
            </label>
            {isLoading && <Loading />}
        </div>
    );
};

MusicCard.propTypes = {
    track: PropTypes.shape({
        trackId: PropTypes.number,
        trackName: PropTypes.string,
        previewUrl: PropTypes.string,
    }).isRequired,
    favoriteSongs: PropTypes.arrayOf(PropTypes.shape({
        trackId: PropTypes.number,
        trackName: PropTypes.string,
        previewUrl: PropTypes.string,
    })).isRequired,
};

export default MusicCard;
