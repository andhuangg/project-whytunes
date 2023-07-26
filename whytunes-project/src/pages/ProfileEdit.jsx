import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';
import Header from '../components/Header';

const ProfileEdit = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchUser = async () => {
        setLoading(true);
        const userData = await getUser();
        setUser(userData);
        setLoading(false);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const [values, setValues] = useState({
        name: '',
        email: '',
        image: '',
        description: '',
    });

    useEffect(() => {
        if (user) {
            setValues({
                name: user.name,
                email: user.email,
                image: user.image,
                description: user.description,
            });
        }
    }, [user]);

    const handleInputChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        await updateUser(values);
        setLoading(false);
        navigate('/profile');
    };

    if (loading) return <Loading />;

    return (
        <div>
            <Header />

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Nome completo
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={values.name}
                        onChange={handleInputChange}
                    />
                </label>
                <label htmlFor="email">
                    Email
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleInputChange}
                    />
                </label>
                <label htmlFor="description">
                    Descrição sobre você
                    <textarea
                        id="description"
                        name="description"
                        value={values.description}
                        onChange={handleInputChange}
                    />
                </label>
                <label htmlFor="image">
                    Imagem de perfil
                    <input
                        id="image"
                        name="image"
                        type="url"
                        value={values.image}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">
                    Salvar
                </button>
            </form>
        </div>
    );
};

export default ProfileEdit;
