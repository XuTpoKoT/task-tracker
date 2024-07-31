import {useEffect, useState} from "react";

export default class SecurityContext {
    private isAuth = false;
    public static INSTANCE = new SecurityContext();
    private subscribers: Set<() => void> = new Set();
    private SecurityContext(){}

    isAuthenticated() :boolean {
        return this.isAuth;
    }

    setAuthenticated(isAuth : boolean) {
        this.isAuth = isAuth;
        this.notifySubscribers();
    }

    subscribe(callback: () => void) {
        this.subscribers.add(callback);
    }

    unsubscribe(callback: () => void) {
        this.subscribers.delete(callback);
    }

    private notifySubscribers() {
        this.subscribers.forEach(callback => callback());
    }
}

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] =
        useState(SecurityContext.INSTANCE.isAuthenticated());

    useEffect(() => {
        const handleAuthChange = () => {
            setIsAuthenticated(SecurityContext.INSTANCE.isAuthenticated());
        };
        SecurityContext.INSTANCE.subscribe(handleAuthChange);

        return () => {
            SecurityContext.INSTANCE.unsubscribe(handleAuthChange);
        };
    }, []);

    return isAuthenticated;
}