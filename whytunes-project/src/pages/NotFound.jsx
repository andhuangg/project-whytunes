function NotFound() {
    return (
        <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <div className="text-center">
                <h1 className="display-1">404</h1>
                <p className="lead">Page Not Found</p>
                <a className="btn btn-primary" href="/search">Voltar para a página inicial</a>
            </div>
        </div>
    );
}

export default NotFound;
