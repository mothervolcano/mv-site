declare const paper:any;



export class Point {
    constructor(...args: any[]) {
        if (args.length === 0) {
            return new paper.Point(); // Instantiate with no arguments
        } else if (args.length === 1 && typeof args[0] === 'object') {
            return new paper.Point(args[0]); // Instantiate with a single object parameter
        } else {
            return new paper.Point(...args); // Instantiate with other arguments
        }
    }
}

export class Segment {
    constructor(...args: any[]) {
        if (args.length === 0) {
            return new paper.Segment(); // Instantiate with no arguments
        } else if (args.length === 1 && typeof args[0] === 'object') {
            return new paper.Segment(args[0]); // Instantiate with a single object parameter
        } else {
            return new paper.Segment(...args); // Instantiate with other arguments
        }
    }
}

export class Path {
    constructor(...args: any[]) {
        if (args.length === 0) {
            return new paper.Path(); // Instantiate with no arguments
        } else if (args.length === 1 && typeof args[0] === 'object') {
            return new paper.Path(args[0]); // Instantiate with a single object parameter
        } else {
            return new paper.Path(...args); // Instantiate with other arguments
        }
    }
}



export class Circle {
    constructor(...args: any[]) {
        if (args.length === 0) {
            return new paper.Path.Circle(); // Instantiate with no arguments
        } else if (args.length === 1 && typeof args[0] === 'object') {
            return new paper.Path.Circle(args[0]); // Instantiate with a single object parameter
        } else {
            return new paper.Path.Circle(...args); // Instantiate with other arguments
        }
    }
}

export class Ellipse {
    constructor(...args: any[]) {
        if (args.length === 0) {
            return new paper.Path.Ellipse(); // Instantiate with no arguments
        } else if (args.length === 1 && typeof args[0] === 'object') {
            return new paper.Path.Ellipse(args[0]); // Instantiate with a single object parameter
        } else {
            return new paper.Path.Ellipse(...args); // Instantiate with other arguments
        }
    }
}

export class Group {
    constructor(...args: any[]) {
        if (args.length === 0) {
            return new paper.Group(); // Instantiate with no arguments
        } else if (args.length === 1 && typeof args[0] === 'object') {
            return new paper.Group(args[0]); // Instantiate with a single object parameter
        } else {
            return new paper.Group(...args); // Instantiate with other arguments
        }
    }
}