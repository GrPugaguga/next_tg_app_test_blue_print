"use client"

import React, { createContext, useState, useEffect, useContext, useCallback, useRef } from 'react';
import debounce from 'lodash.debounce';
import { useJWT } from "../../hooks/useJWT";
import { getAvatarPath } from "../../hooks/getAvatarPath";
import useLocalStorage from "../../hooks/useLocalStorage";
import { User } from '@/types';
import getAvailableUpgrades from '../../hooks/getAvailableUpgrades';
const UserContext = createContext<any>(undefined);

export function UserContextProvider({ children }: { children: React.ReactNode }) {
    const [userData, setUserData] = useState<User | null>(null);
    const [upgrades, setUpgrades] = useState<any>([]);
    const [token, setToken] = useState<string | null>(null);
    const [energyStorage, setEnergyStorage] = useLocalStorage('energy', '');
    const [clicksStorage, setClicksStorage] = useLocalStorage('clicks', '');
    const [timestamp, setTimestamp] = useLocalStorage('last_update_timestamp', Date.now());
    const isFirstRender = useRef(true);
    

    const updateClicksOnServer = useCallback(debounce(async (clicks: number, energy: number, timestamp: number) => {
        if (!token) return;
            try {
                const response = await fetch('/api/click', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        clicks: clicks,
                        energy: energy,
                        timestamp: timestamp
                    }),
                })
                if (response.ok) {
                    setClicksStorage('0')
                }
            } catch (error) {
                console.error('Ошибка при отправке данных на сервер:', error);
            }
        }, 1000), [token])

    const authUser = useCallback(async (id: string, username: string, ref: string|undefined) => {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id, username: username, ref: ref }),
        });
        if (response.ok) {
            const data = await response.json();
            return data.user
        }
    }, [])    


    useEffect(() => {
        if(isFirstRender.current) {
            isFirstRender.current = false;
            // auth user and get user data from telegram
            const WebApp = (window as any).Telegram?.WebApp;
            if (WebApp?.initDataUnsafe?.user) {
                // get user data from database
                authUser(WebApp.initDataUnsafe.user.id.toString(), WebApp.initDataUnsafe.user.username,WebApp.initDataUnsafe.start_param).then(user => {
                    // update local user info and                     
                    setUserData(
                        {...user, 
                            points: user.points + Math.floor((Date.now() - Number(user.last_sync_timestamp))/1000)*user.points_per_second + Number(clicksStorage)*user.points_per_click,
                            energy: Math.min(user.energy + Math.floor((Date.now() - user.last_sync_timestamp)/1000)*user.energy_per_second, user.max_energy)
                        })
                    setEnergyStorage( (Math.min(user.energy + Math.floor((Date.now() - user.last_sync_timestamp)/1000)*user.energy_per_second, user.max_energy).toString()))
                    // sync with database
                    fetch('/api/sync', {
                        method: 'POST',
                    body: JSON.stringify({
                        ...user,
                        last_sync_timestamp: Date.now(),
                        energy: Math.min(user.energy + Math.floor((Date.now() - user.last_sync_timestamp)/1000)*user.energy_per_second, user.max_energy),
                        points: user.points + Math.floor((Date.now() - Number(user.last_sync_timestamp))/1000)*user.points_per_second + Number(clicksStorage)*user.points_per_click
                    }),
                    }).then(response => response.json()).then(data => {
                        setUpgrades(getAvailableUpgrades(user, data.upgrades))
                    })

                    setClicksStorage('0')
                    // set token for fetching 
                    useJWT(WebApp.initDataUnsafe.user.id.toString()).then(setToken);   
                    // if avatar changed, update it
                    getAvatarPath(WebApp.initDataUnsafe.user.id.toString()).then(photoPath => {
                        if( user.avatar !== photoPath && photoPath !== null) {
                            setUserData({...user, avatar: photoPath})
                            fetch('/api/avatar', {
                                method: 'POST',
                                body: JSON.stringify({ id:WebApp.initDataUnsafe.user.id.toString(),photoPath: photoPath }),
                            })
                        }
                    });
                    // set interval for update energy and points per second
                    const interval = setInterval(() => {
                        setUserData(prev => prev ? 
                            {...prev, points: prev.points + (prev.points_per_second || 0),
                             energy: Math.min(prev.energy + (prev.energy_per_second || 0), prev.max_energy)} 
                             : null)
                    }, 1000)  

        
                    return () => {
                        clearInterval(interval)
                    }
                });
            }
        }
    }, []);

    // handle click function for register clicks 
    const handleClick = () => {
        if(userData && userData.energy > 0) {
            if(userData.booster_expirated_time && userData.booster_expirated_time > Date.now()){
                setUserData({...userData, points: userData.points + userData.points_per_click*2, energy: Math.max(userData.energy - 1, 0)})
                setClicksStorage(String(Number(clicksStorage) + 2) )
            } else {
                setUserData({...userData, points: userData.points + userData.points_per_click, energy: Math.max(userData.energy - 1, 0)})
                setClicksStorage(String(Number(clicksStorage) + 1) )
            }
            setTimestamp(Date.now())
            setEnergyStorage(userData.energy.toString())
            // update clicks on server
            updateClicksOnServer(Number(clicksStorage), Number(energyStorage), Number(timestamp))
        }
    }



    return (
        <UserContext.Provider value={{ userData, setUserData, token, setToken,handleClick, upgrades,setUpgrades, energyStorage}}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}