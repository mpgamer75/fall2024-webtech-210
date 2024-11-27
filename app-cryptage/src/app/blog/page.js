'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function BlogPage() {
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const user = supabase.auth.user();
    if (!user) return alert('Connectez-vous pour publier.');

    const { data, error } = await supabase.from('posts').insert([
      { user_id: user.id, content },
    ]);

    if (error) return alert(error.message);
    setPosts([data[0], ...posts]);
    setContent('');
  };

  const handleLike = async (post_id) => {
    const user = supabase.auth.user();
    if (!user) return alert('Connectez-vous pour liker.');
  
    const { error } = await supabase.from('likes').insert([{ post_id, user_id: user.id }]);
    if (!error) fetchPosts(); // Met à jour les posts avec les nouveaux likes
  };
  

  return (
    <div className="p-4">
      <form onSubmit={handleCreatePost} className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Écrivez votre message..."
          required
          className="w-full p-2 border mb-2"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2">
          Publier
        </button>
      </form>


      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 bg-white shadow">
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
