// Simple Container component with a set max-width, adhering to
// modern web design standards.
export default function Container({ children }) {

    return (
        <div className='container'>
            {children}
        </div>
    );
};