import { useState, useEffect } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/musicCard';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

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

    if (loading) return <Loading centered />;

    return (
        <div>
            <Header />

            {favoriteSongs.length > 0 ? (
                favoriteSongs.map((track) => (
                    <MusicCard
                        key={track.trackId}
                        track={track}
                        favoriteSongs={favoriteSongs}
                    />
                ))
            ) : (
                <div className="d-flex align-items-center justify-content-center" style={{ height: '80vh' }}>
                    <div className="text-center">
                        <p className="lead">Você não tem músicas favoritadas ainda</p>
                        <Link to="/search" className="btn btn-primary">Voltar</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FavoriteSongs;
