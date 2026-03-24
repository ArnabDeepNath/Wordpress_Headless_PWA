"use client";

import { client } from "../../lib/apollo";
import { gql } from "@apollo/client";
import { useState } from "react";

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!) {
    createPost(input: { title: $title, content: $content, status: PUBLISH }) {
      post {
        title
      }
    }
  }
`;

export default function CreatePostButton() {
  const [loading, setLoading] = useState(false);

  async function handleCreatePost() {
    setLoading(true);
    try {
      const title = `Project Sync: ${new Date().toLocaleTimeString()}`;
      const content = "Automatically generated from the Next.js frontend.";

      await client.mutate({
        mutation: CREATE_POST,
        variables: { title, content },
      });

      // Refresh the page to show the new post
      window.location.reload();
    } catch (error) {
      console.error("Mutation error:", error);
      alert("Make sure 'Enable Public Mutations' is ON in WPGraphQL settings!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleCreatePost}
      disabled={loading}
      className={`px-6 py-3 rounded-full font-bold text-white shadow-lg transition-transform active:scale-95 ${
        loading ? "bg-slate-400" : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {loading ? "Creating..." : "+ Quick Post"}
    </button>
  );
}
