"use client";

import Loader from "@/components/Design/Loader";
import { setShowPopup } from "@/redux/features/applicationSlice";
import { setUser } from "@/redux/features/userSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

async function getSession() {
    const response = await fetch('/api/session', { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch session data");
    return response.json();
}

export function withAuth(Component) {
    return function ProtectedComponent(props) {
        const [isAuthenticated, setIsAuthenticated] = useState (null);
        const router = useRouter();
        const dispatch = useDispatch();

        useEffect(() => {
            async function checkAuth() {
                try {
                    const {session} = await getSession();
                    if (session.user_id) {
                        setIsAuthenticated(true);
                        dispatch(setUser({ id: session.user_id, email: session.emails[0].email, name: session.name.first_name }));
                    } else {
                        router.push('/');
                        dispatch(setUser(null))
                        dispatch(setShowPopup({type: "loginPopup", size: "sm"}))
                    }
                } catch {
                    router.push('/');
                    dispatch(setUser(null))
                    dispatch(setShowPopup({type: "loginPopup", size: "sm"}))
                }
            }

            checkAuth();
        }, [router]);

        // if (isAuthenticated === null) {
        //     return <div><Loader /></div>;
        // }

        return <Component {...props} />
    };
}
