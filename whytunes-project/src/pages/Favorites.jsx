// FavoriteSongs.jsx
import { useState, useEffect } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/musicCard';
import Header from '../components/Header';

const FavoriteSongs = () => {
    const [favoriteSongs, setFavoriteSongs] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadFavoriteSongs = async () => {
        const favorites = await getFavoriteSongs();
        setFavoriteSongs(favorites);
        setLoading(false);
    }

    useEffect(() => {
        loadFavoriteSongs();
    }, []);

    if (loading) return <Loading />;
    if (!favoriteSongs.length) return <p>Não há músicas favoritas</p>;

    return (
        <div>
            <Header />

            {favoriteSongs.map((track) => (
                <MusicCard
                    key={track.trackId}
                    track={track}
                    favoriteSongs={favoriteSongs}
                />
            ))}
        </div>
    );
};

export default FavoriteSongs;
