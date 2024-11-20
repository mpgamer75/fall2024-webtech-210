'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Plus, Heart, MessageCircle, Trash2, Edit } from 'lucide-react';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const fetchUserAndPosts = async () => {
      try {
        // 1. Récupérer la session utilisateur
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        
        if (mounted) {
          setUser(session?.user || null);
        }

        // 2. Récupérer les posts
        const { data: postsData, error: postsError } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (postsError) throw postsError;

        if (!mounted) return;

        // 3. Enrichir chaque post avec les likes et commentaires
        const enrichedPosts = await Promise.all(postsData.map(async (post) => {
          // Compter les likes
          const { count: likesCount } = await supabase
            .from('likes')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', post.id);

          // Compter les commentaires
          const { count: commentsCount } = await supabase
            .from('comments')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', post.id);

          // Vérifier si l'utilisateur a liké
          let userHasLiked = false;
          if (session?.user) {
            const { data: userLike } = await supabase
              .from('likes')
              .select('id')
              .eq('post_id', post.id)
              .eq('user_id', session.user.id)
              .maybeSingle();
            
            userHasLiked = !!userLike;
          }

          return {
            ...post,
            likes_count: likesCount || 0,
            comments_count: commentsCount || 0,
            has_liked: userHasLiked,
          };
        }));

        if (mounted) {
          setPosts(enrichedPosts);
          setError(null);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        if (mounted) {
          setError(err.message);
          setPosts([]);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchUserAndPosts();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (mounted) {
        setUser(session?.user || null);
      }
    });

    return () => {
      mounted = false;
      if (authListener?.unsubscribe) {
        authListener.unsubscribe();
      }
    };
  }, []);

  const handleLike = async (postId) => {
    if (!user) {
      router.push('/authentification');
      return;
    }

    try {
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      // Mise à jour optimiste de l'UI
      setPosts(currentPosts => 
        currentPosts.map(p => 
          p.id === postId
            ? { 
                ...p, 
                likes_count: p.has_liked ? p.likes_count - 1 : p.likes_count + 1,
                has_liked: !p.has_liked 
              }
            : p
        )
      );

      if (post.has_liked) {
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('likes')
          .insert([{ post_id: postId, user_id: user.id }]);

        if (error) throw error;
      }
    } catch (error) {
      console.error('Like error:', error);
      // Restaurer l'état précédent en cas d'erreur
      const { data } = await supabase
        .from('likes')
        .select('*')
        .eq('post_id', postId);
      
      setPosts(currentPosts =>
        currentPosts.map(p =>
          p.id === postId
            ? { ...p, likes_count: data.length, has_liked: data.some(like => like.user_id === user.id) }
            : p
        )
      );
    }
  };

  const handleDelete = async (postId) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId)
        .eq('user_id', user.id);

      if (error) throw error;

      setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const formData = new FormData(e.target);
      const title = formData.get('title');
      const content = formData.get('content');

      if (!title.trim() || !content.trim()) return;

      setIsLoading(true);

      const { data, error } = await supabase
        .from('posts')
        .insert([
          {
            title: title.trim(),
            content: content.trim(),
            user_id: user.id
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Ajouter le nouveau post avec les compteurs initialisés
      setPosts(currentPosts => [{
        ...data,
        likes_count: 0,
        comments_count: 0,
        has_liked: false
      }, ...currentPosts]);

      setIsNewPostModalOpen(false);
    } catch (error) {
      console.error('Create post error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Composant pour afficher un message d'erreur
  const ErrorMessage = () => (
    <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-md p-4 my-4">
      <p>Une erreur est survenue lors du chargement des posts. Veuillez réessayer plus tard.</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Blog</h1>
        {user && (
          <button
            onClick={() => setIsNewPostModalOpen(true)}
            className="flex items-center px-4 py-2 bg-red-800 text-white rounded-md 
              hover:bg-red-900 transition-colors duration-300 shadow-lg"
          >
            <Plus size={20} className="mr-2" />
            Nouveau Post
          </button>
        )}
      </div>

      {error && <ErrorMessage />}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      ) : posts.length === 0 && !error ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            {user ? "Soyez le premier à publier un article !" : "Aucun article n'a encore été publié."}
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <article
              key={post.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden
                transform transition-all duration-300 hover:scale-[1.02] hover:bg-gray-800
                border border-gray-700"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-3 text-white">
                  {post.title}
                </h2>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {post.content}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-1 transition-colors duration-200 ${
                        post.has_liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <Heart size={20} />
                      <span>{post.likes_count}</span>
                    </button>
                    <button
                      onClick={() => router.push(`/blog/${post.id}`)}
                      className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      <MessageCircle size={20} />
                      <span>{post.comments_count}</span>
                    </button>
                  </div>
                  {user && post.user_id === user.id && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => router.push(`/blog/edit/${post.id}`)}
                        className="p-1 text-gray-400 hover:text-blue-400 transition-colors duration-200"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  )}
                </div>
                <div className="mt-4 text-sm text-gray-400">
                  {new Date(post.created_at).toLocaleDateString()}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {isNewPostModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">
              Nouveau Post
            </h2>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Titre
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 
                    text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 
                    focus:ring-red-500 focus:ring-opacity-50"
                  placeholder="Titre de votre article"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Contenu
                </label>
                <textarea
                  name="content"
                  required
                  rows={4}
                  className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 
                    text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 
                    focus:ring-red-500 focus:ring-opacity-50 resize-none"
                  placeholder="Contenu de votre article"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsNewPostModalOpen(false)}
                  className="px-4 py-2 border border-gray-600 rounded-md text-gray-300 
                    hover:bg-gray-700 transition-colors duration-200"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-900 
                    transition-colors duration-200"
                >
                  Publier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
