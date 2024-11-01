import styles from './CommonFormButton.module.css'

const CommonFormButton = ({onClick, text, loading, className}) => {
    const buttonClass = `${styles.button} ${className}`;    
    const buttonStyle = loading ? { backgroundColor: 'grey' , opacity: 0.6} : {} ;

    return(
        <button type="submit" style={buttonStyle} className={buttonClass} onClick
        ={onClick}><span>{text}</span></button>
    )
}

export default CommonFormButton;

