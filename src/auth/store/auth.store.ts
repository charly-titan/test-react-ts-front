import type { User } from '@/interfases/user.interface'
import { create } from 'zustand'
import { loginAction } from '../actions/auth.action'
import { checkAuthAction } from '../actions/check-auth.action';

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking'

type AuthState = {
    user: User | null,
    token: string | null,
    login: (email: string, password: string) => Promise<Boolean>
    logout: () => void,
    authStatus: AuthStatus,
    checkAuthStatus: () => Promise<boolean>
    isAdmin: () => boolean
}



export const useAuthStore = create<AuthState>()((set, get) => ({
    user: null,
    token: null,
    authStatus: 'checking',
    isAdmin: () => {
        const roles = get().user?.roles || [];
        return roles.includes('admin');
    },
    login: async (email: string, password: string) => {

        try {
            const data = await loginAction(email, password)
            localStorage.setItem('token', data.token)
            console.log(data)
            set({ user: data.user, token: data.token, authStatus: 'authenticated' })
            return true;
        } catch (error) {
            localStorage.removeItem('token');
            set({ user: null, token: null, authStatus: 'not-authenticated' })
            return false;
        }
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, authStatus: 'not-authenticated' })
    },
    checkAuthStatus: async () => {
        try {

            const { token, user } = await checkAuthAction();
            set({ user: user, token: token, authStatus: 'authenticated' })
            return true;

        } catch (error) {
            set({ user: null, token: null, authStatus: 'not-authenticated' })
            return false;
        }
    }
}))

