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
        return <Loading centered />;
    }

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <form
                className="p-5 rounded shadow text-white"
                style={{
                    backgroundColor: '#000',
                    background: "linear-gradient(to right, #000 10%, #008000 90%)",
                    width: '60%',   // Aumentar a largura do formulário
                    fontSize: '1.5rem'   // Aumentar o tamanho da fonte
                }}
                onSubmit={handleSubmit}
            >
                <h2 className="mb-3">WhyTunes Music</h2>
                <div className="mb-3">
                    <input
                        id="name"
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder='Digite o seu Nome'
                        style={{ fontSize: '1.2rem' }} // Aumentar o tamanho da fonte do input
                    />
                </div>
                <div className="d-flex justify-content-center">
                    <button
                        type="submit"
                        className="btn btn-light"
                        disabled={isButtonDisabled}
                        style={{ fontSize: '1.2rem' }} // Aumentar o tamanho da fonte do botão
                    >
                        Entrar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
