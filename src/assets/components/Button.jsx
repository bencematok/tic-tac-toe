// Button component. Classnames are passed to the the variant prop in order
// to avoid using className as a prop for simplicity's sake.
// Children and variant are deconstructed from props, the remaining properties are spread.
export default function Button(props) {
    const { children, variant, ...rest } = props;

    return (
        <>
            <button className={variant}{...rest}>{children}</button>
        </>
    );
};