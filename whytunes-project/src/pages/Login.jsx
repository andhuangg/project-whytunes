import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

function Login() {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (name.length >= 3) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [name]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        await createUser({ name });
        setLoading(false);
        navigate('/search');
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder='Digite o seu Nome'
                    />
                </label>
                <button
                    type="submit"
                    disabled={isButtonDisabled}
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}

export default Login;
