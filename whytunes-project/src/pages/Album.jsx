import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/musicCard';
import Header from '../components/Header';

const Album = () => {
    const [album, setAlbum] = useState(null);
    const [musics, setMusics] = useState([]);
    const [favoriteSongs, setFavoriteSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    const loadMusics = async () => {
        setLoading(true);
        const response = await getMusics(id);
        setAlbum(response[0]);
        setMusics(response.slice(1));
        setLoading(false);
    };

    const loadFavoriteSongs = async () => {
        setLoading(true);
        const favorites = await getFavoriteSongs();
        setFavoriteSongs(favorites);
        setLoading(false);
    }

    useEffect(() => {
        loadMusics();
        loadFavoriteSongs();
    }, []);

    if (loading) return <Loading centered />;
    if (!musics) return <p>Não há músicas disponíveis</p>;

    return (
        <div>
            <Header />

            {album && (
                <div className="text-center">
                    <h2>{album.collectionName} ({album.artistName})</h2>
                </div>
            )}
            {musics.length > 0 && musics.map((music) => (
                <MusicCard
                    key={music.trackId}
                    track={music}
                    favoriteSongs={favoriteSongs}
                />
            ))}
        </div>
    );
};

export default Album;
