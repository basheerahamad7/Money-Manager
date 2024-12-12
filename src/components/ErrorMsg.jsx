import PropTypes from 'prop-types';

const ErrorMsg = (props) => {
    const { erroring } = props;
    if (erroring === 'error') {
        return <p>*Fill the form</p>;
    }
    return erroring !== '' ? <p>*Enter amount correctly</p> : null;
};

ErrorMsg.propTypes = {
    erroring: PropTypes.string.isRequired, // Validate `erroring` as a required string
};

ErrorMsg.defaultProps = {
    erroring: '',
};


export default ErrorMsg;
