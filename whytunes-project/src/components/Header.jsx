import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

function Header() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUser();
            setUser(data);
        };

        fetchUser();
    }, []);

    if (!user) {
        return <Loading />;
    }

    return (
        <header>
            <h1>Bem-vindo, {user.name}!</h1>
            <nav>
                <Link to="/search">Pesquisa</Link>
                <Link to="/favorites">Favoritos</Link>
                <Link to="/profile">Perfil</Link>
            </nav>
        </header>
    );
}

export default Header;
