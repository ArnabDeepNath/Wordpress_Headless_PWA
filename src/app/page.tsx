import CreatePostButton from "./components/CreatePostButton";

interface Post {
  id: string;
  title: string;
  date: string;
  excerpt: string;
}

const WORDPRESS_API_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  "https://noteskartprints.in/graphql";

async function getPosts(): Promise<Post[]> {
  const res = await fetch(WORDPRESS_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query GetPosts {
          posts(first: 10, where: { status: PUBLISH }) {
            nodes {
              id
              title
              date
              excerpt
            }
          }
        }
      `,
    }),
    next: { revalidate: 0 },
  });

  const json = await res.json();
  return json?.data?.posts?.nodes ?? [];
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="p-10 max-w-4xl mx-auto bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8 border-b pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Basak Project
          </h1>
          <p className="text-slate-500">Headless Next.js + WordPress</p>
        </div>

        {/* The Client-Side Button Component */}
        <CreatePostButton />
      </div>

      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <h2 className="text-xl font-bold text-blue-600 mb-2">
                {post.title}
              </h2>
              <div
                className="text-slate-600 text-sm line-clamp-2 mb-4"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                {new Date(post.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 text-lg">
              No posts yet. Use the button above to create one!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
