import { RefObject } from "react";

function isRef<T>(obj: unknown): obj is RefObject<T> {
    return typeof obj === 'object' && obj !== null && 'current' in obj
}
