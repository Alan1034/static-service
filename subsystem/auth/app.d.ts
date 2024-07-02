/**
 * Module dependencies.
 */
declare const express: any;
declare const hash: any;
declare const path: any;
declare const ejs: any;
declare const session: any;
declare const authIndex: any;
declare const app: any;
declare var users: {
    tj: {
        name: string;
    };
};
declare function authenticate(name: any, pass: any, fn: any): any;
declare function restrict(req: any, res: any, next: any): void;
