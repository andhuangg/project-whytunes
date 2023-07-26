import { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

function Search() {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [albums, setAlbums] = useState([]);
    const [searchedArtist, setSearchedArtist] = useState('');

    const handleSearch = async () => {
        setLoading(true);
        const results = await searchAlbumsAPI(search);
        setAlbums(results);
        setSearchedArtist(search);
        setSearch('');
        setLoading(false);
    };

    return (
        <div>
            <Header />
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Digite o nome do artista"
                    />
                    <button onClick={handleSearch} disabled={search.length < 2}>
                        Pesquisar
                    </button>
                    {searchedArtist && (
                        <h2>Resultado de álbuns de: {searchedArtist}</h2>
                    )}
                    {albums.length > 0 ? (
                        albums.map((album) => (
                            <div key={album.collectionId}>
                                <Link to={`/album/${album.collectionId}`}>
                                    <img src={album.artworkUrl100} alt={album.collectionName} />
                                    <p>{album.collectionName}</p>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum álbum foi encontrado</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Search;
