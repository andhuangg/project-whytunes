import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import Header from '../components/Header';

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUser();
            setUser(userData);
            setLoading(false);
        };

        fetchUser();
    }, []);

    if (loading) return <Loading />;

    return (
        <div>
            <Header />

            <h2>{user.name}</h2>
            <img src={user.image} alt={user.name} />
            <h3>{user.email}</h3>
            <p>{user.description}</p>
            <Link to="/profile/edit">Editar perfil</Link>
        </div>
    );
};

export default Profile;
