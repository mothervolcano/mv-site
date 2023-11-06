declare const paper:any;



export class Point {
    constructor(...args: any[]) {
        if (args.length === 0) {
            return new paper.Point();
        } else if (args.length === 1 && typeof args[0] === 'object') {
            return new paper.Point(args[0]);
        } else {
            return new paper.Point(...args);
        }
    }
}

export class Segment {
    constructor(...args: any[]) {
        if (args.length === 0) {
            return new paper.Segment();
        } else if (args.length === 1 && typeof args[0] === 'object') {
            return new paper.Segment(args[0]);
        } else {
            return new paper.Segment(...args);
        }
    }
}

export class Path {
    constructor(...args: any[]) {
        if (args.length === 0) {
            return new paper.Path();
        } else if (args.length === 1 && typeof args[0] === 'object') {
            return new paper.Path(args[0]);
        } else {
            return new paper.Path(...args);
        }
    }
}


export class Circle {
    constructor(...args: any[]) {
        if (args.length === 0) {
            return new paper.Path.Circle();
        } else if (args.length === 1 && typeof args[0] === 'object') {
            return new paper.Path.Circle(args[0]);
        } else {
            return new paper.Path.Circle(...args);
        }
    }
}

export class Ellipse {
    constructor(...args: any[]) {
        if (args.length === 0) {
            return new paper.Path.Ellipse();
        } else if (args.length === 1 && typeof args[0] === 'object') {
            return new paper.Path.Ellipse(args[0]);
        } else {
            return new paper.Path.Ellipse(...args);
        }
    }
}

export class Group {
    constructor(...args: any[]) {
        if (args.length === 0) {
            return new paper.Group();
        } else if (args.length === 1 && typeof args[0] === 'object') {
            return new paper.Group(args[0]);
        } else {
            return new paper.Group(...args);
        }
    }
}