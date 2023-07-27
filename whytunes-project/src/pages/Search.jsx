import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import '../App.css';

function Search() {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [albums, setAlbums] = useState([]);
    const [searchedArtist, setSearchedArtist] = useState('');
    const [searched, setSearched] = useState(false);
    const [initialSearch, setInitialSearch] = useState(true);

    const handleSearch = async (searchTerm, isInitial = false) => {
        setLoading(true);
        const results = await searchAlbumsAPI(searchTerm);
        setAlbums(results);
        setSearchedArtist(searchTerm);
        setSearch('');
        setSearched(true);
        setInitialSearch(isInitial);
        setLoading(false);
    };

    useEffect(() => {
        handleSearch('pop', true);
    }, []);

    const handleSearchInputChange = (e) => {
        setSearch(e.target.value);
    }

    return (
        <div>
            <Header />
            {loading ? (
                <Loading />
            ) : (
                <div className="container mt-4">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control border-dark shadow"
                            placeholder="Digite o nome do artista"
                            value={search}
                            onChange={handleSearchInputChange}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-light border-dark shadow ms-2"
                                type="button"
                                onClick={() => handleSearch(search, false)}
                                disabled={search.length < 2}
                            >
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    {searched && searchedArtist && !initialSearch && (
                        <h2>Resultado de álbuns de: {searchedArtist}</h2>
                    )}
                    <div className="row">
                        {albums.length > 0 ? (
                            (initialSearch ? albums.slice(0, 8) : albums).map((album) => (
                                <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={album.collectionId}>
                                    <Link to={`/album/${album.collectionId}`}>
                                        <div className="card h-100 album-card border-dark shadow">
                                            <img src={album.artworkUrl100} className="card-img-top" alt={album.collectionName} />
                                            <div className="card-body">
                                                <p className="card-text">{album.collectionName}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            searched && <p>Nenhum álbum foi encontrado</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;
