import type {PartProps} from "../types.ts";
import {assertNever} from "../utils.ts";

const Part = (props: PartProps) => {
    switch (props.part.kind) {
        case "basic":
            return (
                <div>
                    <div style={{ fontWeight: 'bold' }}>{props.part.name} {props.part.exerciseCount}</div>
                    <div>{props.part.description}</div>
                    <br/>
                </div>
            );
        case "group":
            return (
                <div>
                    <div style={{ fontWeight: 'bold' }}>{props.part.name} {props.part.exerciseCount}</div>
                    <div>Project exercises {props.part.groupProjectCount}</div>
                    <br/>
                </div>
            );
        case "background":
            return (
                <div>
                    <div style={{ fontWeight: 'bold' }}>{props.part.name} {props.part.exerciseCount}</div>
                    <div>{props.part.description}</div>
                    <div>{props.part.backgroundMaterial}</div>
                    <br/>
                </div>
            );
        case "special":
            return (
                <div>
                    <div style={{ fontWeight: 'bold' }}>{props.part.name} {props.part.exerciseCount}</div>
                    <div>{props.part.description}</div>
                    <div>required skills: {props.part.requirements.join(', ')}</div>
                    <br/>
                </div>
            );
        default:
            return assertNever(props.part);
    }
};

export default Part;