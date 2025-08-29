'use client'
import { fetchCurrentUser } from "@/store/slice/authSlice";
import { AppDispatch } from "@/store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AuthProvider({ children }: { children: React.ReactNode }){
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

    return (<>{children}</>)
}