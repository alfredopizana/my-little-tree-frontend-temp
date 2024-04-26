"use server"
import { auth } from "@clerk/nextjs";

export const getSession = ()=>{
    const session = auth();
    return session;
}