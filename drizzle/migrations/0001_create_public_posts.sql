CREATE TABLE public.posts (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 title text NOT NULL,
 slug text NOT NULL UNIQUE,
 description text NOT NULL DEFAULT '',
 category text NOT NULL DEFAULT '',
 content text NOT NULL DEFAULT '',
 published boolean NOT NULL DEFAULT false,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.posts TO anon, authenticated;
GRANT ALL ON public.posts TO service_role;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published posts are public" ON public.posts FOR SELECT TO anon, authenticated USING (published = true);