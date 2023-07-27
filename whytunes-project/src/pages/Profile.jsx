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

    if (loading) return <Loading centered />;

    return (
        <div>
            <Header />

            <div className="card mb-4 shadow" style={{ width: '60%', margin: 'auto', marginTop: '50px' }}>
                <div className="card-body text-center">
                    <img src={user.image} alt={user.name} className="rounded-circle mb-4" style={{ width: '200px' }} />
                    <h2 className="card-title">{user.name}</h2>
                    <h3 className="card-subtitle mb-2 text-muted">{user.email}</h3>
                    <p className="card-text">{user.description}</p>
                    <Link to="/profile/edit" className="btn btn-primary">Editar perfil</Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;
