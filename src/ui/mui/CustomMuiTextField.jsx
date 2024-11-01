import { TextField } from "@mui/material";

const CustomMuiTextField = ({ field, form, style, disabled, ...props }) => {
    const { name, value } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];
    

    const textFieldStyle = {
        "& .MuiOutlinedInput-root": {
            background: "white",
            
            cursor: disabled ? "not-allowed" : "auto",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#004F6E",
                // background: "white",
            },
        },
        "& .MuiInputLabel-outlined": {
            color: "#ABABAB",
            fontSize: "14px",
            transform: value ? "translate(12px, -10px)" : "translate(10px, 18px)", // Adjust 
            pointerEvents: "none", 
            "&.Mui-focused": {
                color: "#004F6E",
                transform: "translate(12px, -10px)", // Adjust 
            },
        },
        "& .MuiFormHelperText-root": {
            marginLeft: 0,
        },
        marginBottom: showError ? "5px" : "20px", // Apply 10px margin bottom when no error
        ...style,
    };

    // const inputProps = {
    //   style: {
    //     height: '30px', // Set the desired height here
    //     padding: '5px', // Adjust the padding as needed
    //   },
    // };

    return (
        <TextField
            {...field}
            {...props}
            fullWidth
            type="text"
            variant="outlined"
            error={showError}
            helperText={showError && errors[name]}
            sx={textFieldStyle}
            disabled={disabled}
            // inputProps={inputProps}
        />
    );
};

export default CustomMuiTextField;
