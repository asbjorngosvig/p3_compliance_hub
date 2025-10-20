//import react from 'react';
import '../styles/Button.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'black' | 'blue';
};

export function Button ({
    variant = 'black',
    className = '',
    children,
    ...props }: ButtonProps) 
    
    {
        // Builds css class name based on variant
        const classes = `btn btn-${variant} ${className}`.trim();

        return (
            <button className={classes} {...props}>
                {children}
            </button>
  );
}

export default Button;