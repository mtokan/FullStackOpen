import type {HeaderProps} from "../types.ts";

const Header = (props: HeaderProps) => {
    return (
        <h1>{props.courseName}</h1>
    );
};

export default Header;