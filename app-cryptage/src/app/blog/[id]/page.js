'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Heart, MessageCircle, ArrowLeft, Trash2 } from 'lucide-react';

export default function BlogPost({ params }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      // Vérifie l'utilisateur
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);

      // Récupération du post le post
      const { data: postData } = await supabase
        .from('posts')
        .select(`
          *,
          likes: likes(count),
          user_liked: likes(user_id)
        `)
        .eq('id', params.id)
        .single();

      if (postData) {
        setPost(postData);

        // Ici on récupère les commentaires
        const { data: commentsData } = await supabase
          .from('comments')
          .select(`
            *,
            user_id,
            profiles:auth.users!comments_user_id_fkey(email)
          `)
          .eq('post_id', params.id)
          .order('created_at', { ascending: false });

        setComments(commentsData || []);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [params.id]);

  const handleLike = async () => {
    if (!user) {
      router.push('/authentification');
      return;
    }

    const existingLike = await supabase
      .from('likes')
      .select('*')
      .eq('post_id', post.id)
      .eq('user_id', user.id)
      .single();

    if (existingLike.data) {
      await supabase
        .from('likes')
        .delete()
        .eq('post_id', post.id)
        .eq('user_id', user.id);
    } else {
      await supabase
        .from('likes')
        .insert([{ post_id: post.id, user_id: user.id }]);
    }

    // Rafraichissemnt du post
    const { data } = await supabase
      .from('posts')
      .select(`
        *,
        likes: likes(count),
        user_liked: likes(user_id)
      `)
      .eq('id', params.id)
      .single();

    setPost(data);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          content: newComment.trim(),
          post_id: post.id,
          user_id: user.id
        }
      ])
      .select(`
        *,
        user_id,
        profiles:auth.users!comments_user_id_fkey(email)
      `)
      .single();

    if (!error && data) {
      setComments([data, ...comments]);
      setNewComment('');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!user) return;

    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId)
      .eq('user_id', user.id);

    if (!error) {
      setComments(comments.filter(comment => comment.id !== commentId));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Article non trouvé
          </h1>
          <button
            onClick={() => router.push('/blog')}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <ArrowLeft size={20} className="mr-2" />
            Retour au blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => router.push('/blog')}
        className="inline-flex items-center mb-8 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
      >
        <ArrowLeft size={20} className="mr-2" />
        Retour au blog
      </button>

      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          {post.title}
        </h1>
        <div className="prose dark:prose-invert max-w-none mb-6">
          {post.content}
        </div>
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 transition-colors duration-200 ${
                post.user_liked?.length > 0
                  ? 'text-red-500 dark:text-red-400'
                  : 'hover:text-red-500 dark:hover:text-red-400'
              }`}
            >
              <Heart size={20} />
              <span>{post.likes?.count || 0}</span>
            </button>
            <div className="flex items-center space-x-1">
              <MessageCircle size={20} />
              <span>{comments.length}</span>
            </div>
          </div>
          <time className="text-sm">
            {new Date(post.created_at).toLocaleDateString()}
          </time>
        </div>
      </article>

      {/* Section commentaires */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Commentaires
        </h2>

        {user ? (
          <form onSubmit={handleComment} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700
                dark:text-white resize-none"
              rows={3}
              required
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Commenter
              </button>
            </div>
          </form>
        ) : (
          <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Connectez-vous pour commenter
            </p>
            <button
              onClick={() => router.push('/authentification')}
              className="text-red-600 dark:text-red-400 hover:underline"
            >
              Se connecter
            </button>
          </div>
        )}

        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {comment.profiles.email}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </p>
                </div>
                {user && user.id === comment.user_id && (
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}