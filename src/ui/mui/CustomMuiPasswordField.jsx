import { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const CustomMuiPasswordField = ({ field, form, style, disabled, ...props }) => {
    const { name, value } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const textFieldStyle = {
        "& .MuiOutlinedInput-root": {
            background: "white",
            cursor: disabled ? "not-allowed" : "auto",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#004F6E",
            },
        },
        "& .MuiInputLabel-outlined": {
            color: "#ABABAB",
            fontSize: "14px",
            transform: value ? "translate(12px, -10px)" : "translate(10px, 18px)",
            "&.Mui-focused": {
                color: "#004F6E",
                transform: "translate(12px, -10px)",
            },
        },
        "& .MuiFormHelperText-root": {
            marginLeft: 0,
        },
        marginBottom: showError ? "5px" : "20px",
        ...style,
    };

    return (
        <TextField
            {...field}
            {...props}
            fullWidth
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            error={showError}
            helperText={showError && errors[name]}
            sx={textFieldStyle}
            disabled={disabled}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default CustomMuiPasswordField;
