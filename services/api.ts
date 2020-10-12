import Router from 'next/router';
import {AccountSchema, SessionSchema} from "../types/account";
import {User} from "../types/user";

export class Api {
    public static host = `http://${process.env.NEXT_PUBLIC_API_URL}`;
    public authorization: string;
    private ctx: any;

    constructor(auth?: string) {
        if (auth) {
            this.authorization = auth;
        } else {
            this.authorization = "";
        }
    }

    /* API functions*/
    private redirectLogin = async () => {
        if (!process.browser) {
            const {res} = this.ctx;
            res.writeHead(301, {Location: "/login"});
            res.end();
            return;
        }
        document.cookie = "authorization=";
        await Router.push("/login");
    };

    public hostName = (): string => {
        return Api.host;
    }

    private get = async (path: string): Promise<Response> => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': this.authorization
            },
        };

        const res = await fetch(`${Api.host}/${path}`, requestOptions);

        if (res.status === 403) {
            await this.redirectLogin();
        }

        return res;
    };

    private post = async (path: string, body: string): Promise<Response> => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.authorization,
            },
            body
        };

        const res = await fetch(`${Api.host}/${path}`, requestOptions);

        if (res.status === 403) {
            await this.redirectLogin();
        }

        return res;
    };

    private delete = async (path: string, body: string): Promise<Response> => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.authorization,
            },
            body
        };

        const res = await fetch(`${Api.host}/${path}`, requestOptions);

        if (res.status === 403) {
            await this.redirectLogin();
        }

        return res;
    };

    public removeCtx = () => {
        delete this.ctx;
    }

    private static getCookie = (cookies: string, key: string): string => {
        const splitted: string[] = cookies.split("; ");
        const value: string[] = splitted.map(s => s.split("="))
            .find(([k, _]) => k === key);
        if (value === undefined || value[1].length < 12) throw new Error("Cookie not found");
        return value[1];
    };

    private checkSession = async (): Promise<boolean> => {
        const resp = await this.get("sessions/check");
        return resp.status === 200;
    }

    public getInitialToken = async (ctx) => {
        this.ctx = ctx;
        if (ctx.req) {
            try {
                const {cookie} = ctx.req.headers;
                if (!cookie) throw new Error("No cookies");
                this.setAuth(Api.getCookie(cookie, "authorization"));
                const isValid = await this.checkSession();
                if (!isValid) throw new Error("Invalid token");
            } catch (e) {
                const {res} = ctx;
                res.writeHead(301, {Location: "/login"});
                res.end();
            }
        } else {
            const {cookie} = document;
            try {
                const auth = Api.getCookie(cookie, "authorization");
                this.setAuth(auth);
                const isValid = await this.checkSession();
                if (!isValid) throw new Error("Invalid token");
            } catch (e) {
                await Router.push("/login");
            }
        }
    };

    public setAuth = (value: string) => {
        this.authorization = value;
    };

    public login = async (account: AccountSchema) => {
        const res = await this.post("account/login", JSON.stringify(account));
        try {
            const key: SessionSchema = await res.json();
            document.cookie = `authorization=${key._id};expires=${new Date(new Date().getTime() + 60 * 60 * 1000 * 48).toUTCString()}`;
            this.setAuth(key._id);
            await Router.push("/");
        } catch (error) {

        }
    };

    public me = async (): Promise<User> => {
        const res = await this.get("me");
        return await res.json();
    }
}