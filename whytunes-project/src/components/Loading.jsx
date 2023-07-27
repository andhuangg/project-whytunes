import PropTypes from 'prop-types';

function Loading({ centered }) {
    const styles = centered ? { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '999' } : {};
    return (
        <div className="d-flex justify-content-center align-items-center" style={styles}>
            <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                <span className="sr-only"> </span>
            </div>
        </div>
    );
}

Loading.propTypes = {
    centered: PropTypes.bool
}

export default Loading;
