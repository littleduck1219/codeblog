// zustand store user
export interface UserState {
    user: User | null;
    setUser: (user: User | null) => void;
}

export interface User {
    displayName: string | null;
    email: string | null;
    emailVerified: boolean;
    isAnonymous: boolean;
    metadata: {
        createdAt: string | undefined;
        lastSignInTime: string | undefined;
    };
    phoneNumber: string | null;
    photoURL: string | null;
    providerId: string;
    uid: string;
    refreshToken: string;
}

// post
export interface Post {
    content?: string;
    createdAt?: string;
    email?: string;
    hashtag?: string;
    title?: string;
    uid?: string;
}
