import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind + conditional classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Shorten long strings with ellipsis in the middle
 * Example: middleEllipsis("0x123456789abcdef", 4)
 * Output: 0x12...cdef
 */
export function middleEllipsis(str: string, len: number): string {
  if (!str) return "";

  return `${str.substring(0, len)}...${str.substring(str.length - len)}`;
}
