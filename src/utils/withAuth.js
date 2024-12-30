"use client";

import Loader from "@/components/Design/Loader";
import { setShowPopup } from "@/redux/features/applicationSlice";
import { setUser } from "@/redux/features/userSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

async function getSession() {
    const response = await fetch('/api/session', { cache: "no-store" }); // cache: "no-store" is used to disable caching to avoid stale data
    if (!response.ok) throw new Error("Failed to fetch session data"); // throw an error if the response is not ok
    return response.json(); //  return the json data from the response
}

// this component is used to protect routes that require authentication, it is a HOC which wraps the component that requires authentication

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
                        dispatch(setUser({ id: session.user_id, email: session.emails[0].email, name: session.name.first_name })); // set user data in redux store
                    } else {
                        router.push('/');
                        dispatch(setUser(null))
                        dispatch(setShowPopup({type: "loginPopup", size: "sm"})) // show login popup if user is not found
                    }
                } catch {
                    router.push('/');
                    dispatch(setUser(null))
                    dispatch(setShowPopup({type: "loginPopup", size: "sm"})) // show login popup if error occurs
                }
            }

            checkAuth();
        }, [router]);

        // if (isAuthenticated === null) {
        //     return <div><Loader /></div>;
        // }

        // show component which it wrap
        return <Component {...props} />
    };
}
