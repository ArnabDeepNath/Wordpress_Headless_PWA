import { client } from "../lib/apollo";
import { gql } from "@apollo/client";
import CreatePostButton from "./components/CreatePostButton"; // We'll create this next

interface Post {
  id: string;
  title: string;
  date: string;
  excerpt: string;
}

interface PostsData {
  posts: {
    nodes: Post[];
  };
}

const GET_POSTS = gql`
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
`;

export default async function Home() {
  const { data } = await client.query<PostsData>({
    query: GET_POSTS,
    context: {
      fetchOptions: {
        next: { revalidate: 0 }, // Set to 0 for the demo so you see changes instantly
      },
    },
  });

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
        {data.posts.nodes.length > 0 ? (
          data.posts.nodes.map((post) => (
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
