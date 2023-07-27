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

    if (loading) return <Loading centered />;

    return (
        <div>
            <Header />

            <form onSubmit={handleSubmit} className="w-50 mx-auto my-5">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Nome completo
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={values.name}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Descrição sobre você
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={values.description}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        Imagem de perfil
                    </label>
                    <input
                        id="image"
                        name="image"
                        type="url"
                        value={values.image}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Salvar
                </button>
            </form>
        </div>
    );
};

export default ProfileEdit;
