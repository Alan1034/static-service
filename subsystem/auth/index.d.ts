declare const express: any;
declare const app: any;
declare const hash: any;
declare const path: any;
declare const session: any;
declare var users: {
    tj: {
        name: string;
    };
};
declare function authenticate(name: any, pass: any, fn: any): any;
declare function restrict(req: any, res: any, next: any): void;
