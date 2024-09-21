'use client'

import { useCallback } from 'react';
import { useUser } from "../app/context/userContext";

const useFetch = () => {
    const { token } = useUser();

    const fetchData = useCallback(async (url: string, method: string, body?: any) => {
        if (!token) {
            console.error('Токен отсутствует');
            throw new Error('Токен отсутствует');
        }

        const res = await fetch(`api/${url}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: method === 'POST' ? JSON.stringify(body) : undefined,
        });

        if (!res.ok) {
            throw new Error('Ошибка сети');
        }

        return await res.json();
    }, [token]);

    return fetchData;
}

export { useFetch };