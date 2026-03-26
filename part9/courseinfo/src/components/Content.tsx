import type {ContentProps} from "../types.ts";
import Part from "./Part.tsx";

const Content = (props: ContentProps) => {
    return (
        <div>
            {
                props.courseParts.map((part) => (
                    <Part key={part.name} part={part} />
                ))
            }
        </div>
    );
};

export default Content;