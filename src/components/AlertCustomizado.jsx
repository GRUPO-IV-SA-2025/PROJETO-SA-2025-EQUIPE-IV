import { Snackbar, Alert } from '@mui/material';
import {
    CheckCircle,
    Error,
    Warning,
    Info
} from '@mui/icons-material';
import PropTypes from 'prop-types';
import { Slide } from '@mui/material';

const AlertCustomizado = ({
    open,
    onClose,
    message,
    severity = 'success',
    autoHideDuration = 6000,
    position = { vertical: 'top', horizontal: 'center' }
}) => {
    // Ícones personalizados para cada tipo
    const icons = {
        success: <CheckCircle fontSize="inherit" />,
        error: <Error fontSize="inherit" />,
        warning: <Warning fontSize="inherit" />,
        info: <Info fontSize="inherit" />
    };

    // Cores de fundo para cada tipo
    const backgroundColors = {
        success: '#4CAF50', // Verde
        error: '#F44336',   // Vermelho
        warning: '#FF9800', // Laranja
        info: '#2196F3'     // Azul
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            anchorOrigin={position}
            slots={{
                transition: Slide
            }}
            slotProps={{
                transition: {
                    direction: 'up',
                    timeout: { enter: 225, exit: 195 }
                }
            }}
        >
            <Alert
                severity={severity}
                onClose={onClose}
                icon={icons[severity]}
                sx={{
                    width: '100%',
                    backgroundColor: backgroundColors[severity],
                    color: 'white',
                    '& .MuiAlert-icon': { color: 'white' },
                    '& .MuiAlert-message': {
                        fontWeight: 'bold',
                        fontSize: '1rem'
                    },
                    boxShadow: 3,
                    borderRadius: '8px',
                    minWidth: '300px',
                    '& .MuiAlert-action': {
                        color: 'white'
                    }
                }}
            >
                {message}
            </Alert>
        </Snackbar >
    );
};

AlertCustomizado.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    severity: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
    autoHideDuration: PropTypes.number,
    position: PropTypes.shape({
        vertical: PropTypes.oneOf(['top', 'bottom']),
        horizontal: PropTypes.oneOf(['left', 'center', 'right'])
    })
};

export { AlertCustomizado };