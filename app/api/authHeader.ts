"use client";

export default function authHeader() {
    let JWT: string | null = null;
    if (typeof window !== "undefined") {
        JWT = localStorage.getItem("JWT");
    }
    if (JWT) {
        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT}`,
        };
    } else {
        return { "Content-Type": "application/json" };
    }
}
