interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
    description: string;
}

interface CoursePartBasic extends CoursePartDescription {
    kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: "background"
}

interface CoursePartSpecial extends CoursePartDescription {
    requirements: string[];
    kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface HeaderProps {
    courseName: string;
}

interface ContentProps {
    courseParts: CoursePart[];
}

interface TotalProps {
    totalExercises: number;
}

interface PartProps {
    part: CoursePart;
}

export type {CoursePart, HeaderProps, ContentProps, TotalProps, PartProps};