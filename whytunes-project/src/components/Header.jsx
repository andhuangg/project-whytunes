import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingSmall from '../components/LoadingSmall';

function Header() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUser();
            setUser(data);
        };

        fetchUser();
    }, []);

    return (
        <header className="p-3 mb-2 text-white" style={{ background: "linear-gradient(to right, #000 10%, #008000 90%)" }}>
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-sm-6">
                        <h1><Link to="/search" className="text-white text-decoration-none">WhyTunes Music</Link></h1>
                    </div>
                    <div className="col-sm-6 d-flex justify-content-end">
                        <nav>
                            <Link to="/search" className="btn btn-outline-light me-2">Buscar</Link>
                            <Link to="/favorites" className="btn btn-outline-light me-2">Favoritos</Link>
                            <Link to="/profile" className="btn btn-outline-light me-2">
                                <div className="d-flex align-items-center">
                                    {user?.image && <img src={user.image} alt="Profile" className="rounded-circle me-2" style={{ width: '30px', height: '30px' }} />}
                                    {user ? user.name : <LoadingSmall />}
                                </div>
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
