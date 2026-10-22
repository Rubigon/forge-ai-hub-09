import { createServerFn } from "@tanstack/react-start";
import { readPublicPosts } from "@/lib/public-posts";

export const getPublicPosts = createServerFn({ method: "GET" }).handler(async () => readPublicPosts());