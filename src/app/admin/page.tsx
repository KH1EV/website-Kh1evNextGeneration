"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import { FaDiscord, FaSignOutAlt, FaUsers, FaPlus, FaTrash, FaEdit, FaArrowLeft, FaHome, FaBriefcase, FaArrowUp, FaArrowDown } from "react-icons/fa";
import Link from "next/link";

import { User } from "@supabase/supabase-js";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  system_role?: string;
  image_url: string;
  bio: string;
  github_url: string;
  instagram_url: string;
  linkedin_url: string;
  tiktok_url: string;
  tags?: string;
  organization?: string;
  sort_order?: number;
}

const TEAM_TAGS = [
  'Executive', 'HRD', 'Developer', 'Creative', 
  'Moderator', 'Host', 'Event Organizer',  
  'Partner Manager', 'Brand Ambassador',
  'Project Manager', 'Full Stack Developer', 'Frontend Developer',
  'Backend Developer', 'IOT Engineer', 'Mobile Developer',
  'Game Developer', 'DevOps Engineer', 'Cloud Engineer',
  'System Administrator', 'Network Engineer', 'Cybersecurity',
  'Data Analyst', 'Data Scientist', 'Data Engineer',
  'UI/UX Designer', 'Graphic Designer'
];

const ROLE_HIERARCHY: Record<string, number> = {
  'Founder': 1,
  'Chief': 2,
  'Manager': 3,
  'Head Division': 4,
  'Staff Division': 5,
  'Trainee': 6
};

interface Blog {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  created_at: string;
  sort_order?: number;
}

interface AdminUser {
  id: string;
  discord_id: string;
  username: string;
  created_at: string;
  role?: string;
  sort_order?: number;
}

interface DiscordUser {
  id?: string;
  discord_id: string;
  username: string;
  avatar_url: string;
  last_login: string;
}

interface ApiKey {
  id: string;
  name: string;
  key_value: string;
  created_at: string;
  sort_order?: number;
}

interface StudioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string | null;
  tags: string[];
  link: string;
  is_active: boolean;
  sort_order?: number;
}

const withTimeout = (promise: any, ms: number = 10000): Promise<any> => {
  let timeoutId: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("Request timeout: Please check your connection.")), ms);
  });
  const executePromise = async () => await promise;
  return Promise.race([executePromise(), timeoutPromise]).finally(() => clearTimeout(timeoutId));
};

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [projects, setProjects] = useState<StudioProject[]>([]);
  const [discordUsers, setDiscordUsers] = useState<DiscordUser[]>([]);
  const [activeTab, setActiveTab] = useState<'team' | 'blogs' | 'projects' | 'settings' | 'whitelist' | 'keys' | 'blog-editor' | 'project-editor' | 'team-editor' | 'whitelist-editor' | 'discord-users'>('team');
  const [currentUserRole, setCurrentUserRole] = useState<string>('Admin');
  const [editingAdminUser, setEditingAdminUser] = useState<Partial<AdminUser>>({});
  const [editingBlog, setEditingBlog] = useState<Partial<Blog> & { excerpt?: string; content?: string; image_url?: string }>({});
  const [editingProject, setEditingProject] = useState<Partial<StudioProject>>({});
  const [editingTeamMember, setEditingTeamMember] = useState<Partial<TeamMember>>({});
  const [notify, setNotify] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: string; type: 'blog' | 'project' | 'team' | 'admin' | 'apikey'; label: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const showNotify = (message: string, type: 'success' | 'error') => {
    setNotify({ message, type });
    setTimeout(() => setNotify(null), 3000);
  };

  const fetchTeamMembers = async () => {
    try {
      const { data } = await withTimeout(supabase.from('team_members').select('*'), 10000);
      if (data) {
        const sortedData = [...data].sort((a, b) => {
          if (a.sort_order !== b.sort_order) return (a.sort_order || 0) - (b.sort_order || 0);
          const rankA = ROLE_HIERARCHY[a.system_role] || 99;
          const rankB = ROLE_HIERARCHY[b.system_role] || 99;
          return rankA - rankB;
        });
        setTeamMembers(sortedData);
      }
    } catch (err) {
      console.error("fetchTeamMembers timeout/error", err);
    }
  };

  const fetchBlogs = async () => {
    try {
      const { data } = await withTimeout(supabase.from('blogs').select('id, title, slug, published, created_at, sort_order').order('sort_order', { ascending: true }), 10000);
      if (data) setBlogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAdminUsers = async () => {
    try {
      const { data } = await withTimeout(supabase.from('admin_users').select('*').order('sort_order', { ascending: true }), 10000);
      if (data) setAdminUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchApiKeys = async () => {
    try {
      const { data } = await withTimeout(supabase.from('api_keys').select('*').order('sort_order', { ascending: true }), 10000);
      if (data) setApiKeys(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data } = await withTimeout(supabase.from('studio_projects').select('*').order('sort_order', { ascending: true }), 10000);
      if (data) setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDiscordUsers = async () => {
    try {
      const { data } = await withTimeout(supabase.from('discord_users').select('*').order('last_login', { ascending: false }), 10000);
      if (data) setDiscordUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const sessionResult = await withTimeout(supabase.auth.getSession(), 10000);

        const session = sessionResult?.data?.session;

        if (session?.user) {
          setUser(session.user as User);
          const discordId = session.user.user_metadata?.provider_id || session.user.identities?.[0]?.id;

          if (discordId) {
            try {
              const username = session.user.user_metadata?.full_name || session.user.user_metadata?.custom_claims?.global_name || session.user.user_metadata?.name || 'Unknown';
              const avatarUrl = session.user.user_metadata?.avatar_url || '';
              await supabase.from('discord_users').upsert({
                discord_id: discordId,
                username,
                avatar_url: avatarUrl,
                last_login: new Date().toISOString()
              }, { onConflict: 'discord_id' });
            } catch (e) {
              console.error('Failed to record discord user login:', e);
            }

            let retryCount = 0;
            let success = false;
            
            while (retryCount < 3 && !success) {
              try {
                const { data, error } = await withTimeout(
                  supabase.from('admin_users').select('*').eq('discord_id', discordId).single(),
                  10000
                );

                if (data && !error) {
                  success = true;
                  setIsAuthorized(true);
                  setCurrentUserRole(data.role || 'Admin');
                  Promise.all([fetchTeamMembers(), fetchBlogs(), fetchAdminUsers(), fetchApiKeys(), fetchProjects(), fetchDiscordUsers()]);
                  return;
                } else if (error && error.code === 'PGRST116') {
                  // Definitely unauthorized (0 rows returned)
                  success = true; // Break loop
                  window.location.replace('/user');
                  return;
                } else {
                  // Any other error from supabase (e.g. timeout inside supabase itself)
                  throw new Error(error?.message || 'Database error');
                }
              } catch (err: any) {
                retryCount++;
                if (retryCount >= 3) {
                  console.error("Supabase checkUser error after 3 retries:", err);
                  setAuthError(`Connection Error: ${err?.message || 'Timeout'}`);
                  // Note: we leave isAuthorized as null so it doesn't show "Access Denied"
                } else {
                  // Wait 1 second before retrying
                  await new Promise(res => setTimeout(res, 1000));
                }
              }
            }
          } else {
             console.log("No discordId found in session.user");
          }
        }
      } catch (err: any) {
        console.error("Auth check failed or timed out:", err);
        setAuthError(`Auth Check Failed: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Only react to SIGNED_IN (OAuth callback) to avoid fighting with checkUser
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user as User);
        const discordId = session.user.user_metadata?.provider_id || session.user.identities?.[0]?.id;
        if (discordId) {
          try {
            const username = session.user.user_metadata?.full_name || session.user.user_metadata?.custom_claims?.global_name || session.user.user_metadata?.name || 'Unknown';
            const avatarUrl = session.user.user_metadata?.avatar_url || '';
            await supabase.from('discord_users').upsert({
              discord_id: discordId,
              username,
              avatar_url: avatarUrl,
              last_login: new Date().toISOString()
            }, { onConflict: 'discord_id' });
          } catch (e) {
            console.error('Failed to record discord user login:', e);
          }

          const { data, error } = await supabase
            .from('admin_users')
            .select('*')
            .eq('discord_id', discordId)
            .single();
            
          if (data && !error) {
            setIsAuthorized(true);
            setCurrentUserRole(data.role || 'Admin');
            Promise.all([fetchTeamMembers(), fetchBlogs(), fetchAdminUsers(), fetchApiKeys(), fetchProjects(), fetchDiscordUsers()]);
          } else if (error && error.code === 'PGRST116') {
            // Not in whitelist — send to user dashboard
            window.location.replace('/user');
            return;
          } else if (error) {
            console.error("AuthListener DB error:", error);
            setAuthError(`AuthListener Error: ${error.message}`);
            setIsAuthorized(false);
          }
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsAuthorized(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${window.location.origin}/login`
      }
    });
  };

  const handleSignOutConfirm = async () => {
    setIsSigningOut(true);
    try {
      await supabase.auth.signOut({ scope: 'local' });
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
      }
      window.location.replace('/');
    } catch {
      setIsSigningOut(false);
      setShowSignOutModal(false);
    }
  };

  const handleEditAdminUser = async (id: string) => {
    const { data, error } = await supabase.from('admin_users').select('*').eq('id', id).single();
    if (error) {
      showNotify(`Failed to fetch admin details: ${error.message}`, 'error');
    } else if (data) {
      setEditingAdminUser(data);
      setActiveTab('whitelist-editor');
    }
  };

  const handleSaveAdminUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const adminData = {
      username: editingAdminUser.username,
      discord_id: editingAdminUser.discord_id,
      role: editingAdminUser.role || 'Admin'
    };

    try {
      if (editingAdminUser.id) {
        const { error } = await withTimeout(supabase.from('admin_users').update(adminData).eq('id', editingAdminUser.id).select());
        if (error) throw error;
        showNotify("Admin user updated successfully!", 'success');
      } else {
        const { error } = await withTimeout(supabase.from('admin_users').insert([adminData]).select());
        if (error) throw error;
        showNotify("New admin user added successfully!", 'success');
      }
      
      await fetchAdminUsers();
      setActiveTab('whitelist');
      setEditingAdminUser({});
    } catch (error: any) {
      console.error("handleSaveAdminUser error:", error);
      showNotify(`Failed to save: ${error.message}`, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteTeamMember = (id: string, name: string) => {
    setDeleteModal({ open: true, id, type: 'team', label: name });
  };

  const handleEditTeamMember = async (id: string) => {
    const { data, error } = await supabase.from('team_members').select('*').eq('id', id).single();
    if (error) {
      showNotify(`Failed to fetch member details: ${error.message}`, 'error');
    } else if (data) {
      setEditingTeamMember(data);
      setActiveTab('team-editor');
    }
  };

  const handleSaveTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const teamData = {
      name: editingTeamMember.name,
      organization: editingTeamMember.organization || 'Kh1ev Community',
      role: editingTeamMember.role,
      system_role: editingTeamMember.system_role || 'Staff Division',
      image_url: editingTeamMember.image_url,
      bio: editingTeamMember.bio,
      github_url: editingTeamMember.github_url,
      instagram_url: editingTeamMember.instagram_url,
      linkedin_url: editingTeamMember.linkedin_url,
      tiktok_url: editingTeamMember.tiktok_url,
      tags: editingTeamMember.tags || ''
    };
    try {
      if (editingTeamMember.id) {
        const { data, error } = await withTimeout(supabase.from('team_members').update(teamData).eq('id', editingTeamMember.id).select());
        if (error) {
          console.error("Supabase update error:", error);
          throw error;
        }
        if (!data || data.length === 0) throw new Error("Update gagal: kemungkinan RLS Policy tidak mengizinkan operasi ini. Pastikan policy UPDATE & SELECT sudah diaktifkan di Supabase untuk tabel team_members.");
        showNotify("Member updated successfully!", 'success');
      } else {
        const { data, error } = await withTimeout(supabase.from('team_members').insert([teamData]).select());
        if (error) {
          console.error("Supabase insert error:", error);
          throw error;
        }
        if (!data || data.length === 0) throw new Error("Insert gagal: kemungkinan RLS Policy tidak mengizinkan operasi ini.");
        showNotify("New member added successfully!", 'success');
      }
      
      await fetchTeamMembers();
      setActiveTab('team');
      setEditingTeamMember({});
    } catch (error: any) {
      console.error("handleSaveTeamMember error:", error);
      showNotify(`Gagal menyimpan: ${error.message}`, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditBlog = async (id: string) => {
    const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single();
    if (error) {
      showNotify(`Failed to fetch blog details: ${error.message}`, 'error');
    } else if (data) {
      setEditingBlog(data);
      setActiveTab('blog-editor');
    }
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const blogData = {
      title: editingBlog.title,
      slug: editingBlog.slug,
      excerpt: editingBlog.excerpt,
      content: editingBlog.content,
      image_url: editingBlog.image_url,
      published: editingBlog.published || false
    };

    try {
      if (editingBlog.id) {
        const { data, error } = await withTimeout(supabase.from('blogs').update(blogData).eq('id', editingBlog.id).select());
        if (error) throw error;
        if (!data || data.length === 0) throw new Error("Akses ditolak (RLS) atau data tidak ditemukan.");
        showNotify("Blog post updated successfully!", 'success');
      } else {
        const { data, error } = await withTimeout(supabase.from('blogs').insert([blogData]).select());
        if (error) throw error;
        if (!data || data.length === 0) throw new Error("Akses ditolak (RLS). Gagal menambah data.");
        showNotify("Blog post created successfully!", 'success');
      }
      
      await fetchBlogs();
      setActiveTab('blogs');
      setEditingBlog({});
    } catch (error: any) {
      showNotify(`Failed to save blog post: ${error.message}`, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditProject = async (id: string) => {
    const { data, error } = await supabase.from('studio_projects').select('*').eq('id', id).single();
    if (error) {
      showNotify(`Failed to fetch project details: ${error.message}`, 'error');
    } else if (data) {
      setEditingProject(data);
      setActiveTab('project-editor');
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const projectData = {
      title: editingProject.title,
      category: editingProject.category,
      description: editingProject.description,
      image: editingProject.image,
      tags: typeof editingProject.tags === 'string' ? (editingProject.tags as string).split(',').map(t => t.trim()) : (editingProject.tags || []),
      link: editingProject.link || '#',
      is_active: editingProject.is_active ?? true
    };

    try {
      if (editingProject.id) {
        const { data, error } = await withTimeout(supabase.from('studio_projects').update(projectData).eq('id', editingProject.id).select());
        if (error) throw error;
        showNotify("Project updated successfully!", 'success');
      } else {
        const { data, error } = await withTimeout(supabase.from('studio_projects').insert([projectData]).select());
        if (error) throw error;
        showNotify("Project created successfully!", 'success');
      }
      
      await fetchProjects();
      setActiveTab('projects');
      setEditingProject({});
    } catch (error: any) {
      showNotify(`Failed to save project: ${error.message}`, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteBlog = (id: string, title: string) => {
    setDeleteModal({ open: true, id, type: 'blog', label: title });
  };

  const handleDeleteProject = (id: string, title: string) => {
    setDeleteModal({ open: true, id, type: 'project', label: title });
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal) return;
    setIsDeleting(true);
    try {
      if (deleteModal.type === 'blog') {
        const { data, error } = await withTimeout(supabase.from('blogs').delete().eq('id', deleteModal.id).select());
        if (error) throw new Error(error.message);
        if (!data || data.length === 0) throw new Error("Gagal hapus: periksa RLS permission di Supabase.");
        showNotify("Blog post deleted successfully!", 'success');
        fetchBlogs();
      } else if (deleteModal.type === 'project') {
        const { error } = await withTimeout(supabase.from('studio_projects').delete().eq('id', deleteModal.id));
        if (error) throw new Error(error.message);
        showNotify("Project deleted successfully!", 'success');
        fetchProjects();
      } else if (deleteModal.type === 'team') {
        const { data, error } = await withTimeout(supabase.from('team_members').delete().eq('id', deleteModal.id).select());
        if (error) throw new Error(error.message);
        if (!data || data.length === 0) throw new Error("Gagal hapus: periksa RLS permission di Supabase.");
        showNotify("Member deleted successfully!", 'success');
        fetchTeamMembers();
      } else if (deleteModal.type === 'admin') {
        const { error } = await withTimeout(supabase.from('admin_users').delete().eq('id', deleteModal.id));
        if (error) throw new Error(error.message);
        showNotify("Admin user removed successfully!", 'success');
        fetchAdminUsers();
      } else if (deleteModal.type === 'apikey') {
        const { error } = await withTimeout(supabase.from('api_keys').delete().eq('id', deleteModal.id));
        if (error) throw new Error(error.message);
        showNotify("API Key deleted successfully!", 'success');
        fetchApiKeys();
      }
    } catch (err: any) {
      showNotify(`Gagal menghapus: ${err.message}`, 'error');
    } finally {
      setIsDeleting(false);
      setDeleteModal(null);
    }
  };

  const handleDeleteAdminUser = (id: string, username: string) => {
    setDeleteModal({ open: true, id, type: 'admin', label: username });
  };

  const handleDeleteApiKey = (id: string, name: string) => {
    setDeleteModal({ open: true, id, type: 'apikey', label: name });
  };

  const handleMoveGeneric = async (
    tableName: string,
    list: any[],
    setList: (val: any[]) => void,
    index: number,
    direction: 'up' | 'down'
  ) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === list.length - 1) return;

    const newList = [...list];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    const temp = newList[index];
    newList[index] = newList[swapIndex];
    newList[swapIndex] = temp;

    newList.forEach((item, i) => item.sort_order = i);
    setList(newList);

    newList.forEach(async (u) => {
      await supabase.from(tableName).update({ sort_order: u.sort_order }).eq('id', u.id);
    });
  };

  const handleMoveTeamMember = async (orgName: string, indexInGroup: number, direction: 'up' | 'down') => {
    const orgMembers = teamMembers.filter(m => (m.organization || 'Kh1ev Community') === orgName);
    if (direction === 'up' && indexInGroup === 0) return;
    if (direction === 'down' && indexInGroup === orgMembers.length - 1) return;

    const newGroup = [...orgMembers];
    const swapIndex = direction === 'up' ? indexInGroup - 1 : indexInGroup + 1;
    
    const temp = newGroup[indexInGroup];
    newGroup[indexInGroup] = newGroup[swapIndex];
    newGroup[swapIndex] = temp;

    newGroup.forEach((item, i) => item.sort_order = i);

    const newTeamMembers = teamMembers.map(tm => {
      const updated = newGroup.find(g => g.id === tm.id);
      return updated ? updated : tm;
    });
    
    newTeamMembers.sort((a, b) => {
      if (a.sort_order !== b.sort_order) return (a.sort_order || 0) - (b.sort_order || 0);
      const rankA = ROLE_HIERARCHY[a.system_role || ''] || 99;
      const rankB = ROLE_HIERARCHY[b.system_role || ''] || 99;
      return rankA - rankB;
    });
    setTeamMembers(newTeamMembers);

    newGroup.forEach(async (u) => {
      await supabase.from('team_members').update({ sort_order: u.sort_order }).eq('id', u.id);
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center gap-6">
        <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
        <div className="flex flex-col items-center gap-1 text-center px-4">
          <p className="text-white font-semibold tracking-wide">Authenticating Admin Session...</p>
          <p className="text-neutral-500 text-sm max-w-xs">If this takes a while, the database might be waking up from sleep mode.</p>
        </div>
      </main>
    );
  }

  if (!user) {
    if (typeof window !== 'undefined') window.location.replace('/login');
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-white/10 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  if (loading || (isAuthorized === null && !authError)) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white/10 border-t-accent rounded-full animate-spin"></div>
          <p className="text-white/50 font-mono text-sm animate-pulse">Verifying Access...</p>
        </div>
      </div>
    );
  }

  if (isAuthorized === null && authError) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0a0a0a] border border-orange-500/20 rounded-2xl p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-orange-500/50"></div>
          <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Connection Timeout</h2>
          <p className="text-neutral-400 mb-6">The database took too long to respond. It might be waking up from sleep mode.</p>
          
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 mb-6 text-left">
            <p className="text-xs text-orange-400 font-mono break-words">{authError}</p>
          </div>
          
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors">
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (isAuthorized === false) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0a0a0a] border border-red-500/20 rounded-2xl p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50"></div>
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-neutral-400 mb-6">Your Discord account is not authorized to access the admin dashboard.</p>
          
          <div className="bg-white/5 rounded-xl p-4 mb-6">
            <p className="text-sm text-neutral-300">
              <span className="text-neutral-500">Discord ID:</span> {user?.user_metadata?.provider_id || user?.identities?.[0]?.id || 'Unknown'}
            </p>
          </div>
          
          {authError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 text-left">
              <p className="text-xs text-red-400 font-mono">{authError}</p>
            </div>
          )}
          <button 
            onClick={handleSignOutConfirm}
            disabled={isSigningOut}
            className={`w-full py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 ${isSigningOut ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {isSigningOut ? (
              <>
                <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                Signing Out...
              </>
            ) : 'Sign Out'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] relative overflow-x-hidden selection:bg-accent selection:text-white pb-20">
      {notify && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl border flex items-center gap-3 shadow-2xl animate-in slide-in-from-right-8 fade-in duration-300 ${notify.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
          {notify.type === 'success' ? (
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          ) : (
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          )}
          <span className="font-semibold text-sm">{notify.message}</span>
        </div>
      )}

      {deleteModal?.open && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div
            onClick={() => !isDeleting && setDeleteModal(null)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
          />
          <div style={{ position: 'relative', background: '#111', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '20px', padding: '32px', maxWidth: '420px', width: '100%', boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(239,68,68,0.1)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <svg style={{ width: '24px', height: '24px', color: '#ef4444' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 style={{ color: 'white', fontWeight: 700, fontSize: '1.2rem', textAlign: 'center', marginBottom: '10px' }}>
              Hapus {deleteModal.type === 'blog' ? 'Blog Post' : deleteModal.type === 'project' ? 'Project' : deleteModal.type === 'team' ? 'Team Member' : deleteModal.type === 'admin' ? 'Admin User' : 'API Key'}?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', textAlign: 'center', marginBottom: '8px' }}>
              Aksi ini tidak bisa dibatalkan. Data berikut akan dihapus permanen:
            </p>
            <p style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem', textAlign: 'center', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 16px', marginBottom: '28px', wordBreak: 'break-word' }}>
              &ldquo;{deleteModal.label}&rdquo;
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setDeleteModal(null)}
                disabled={isDeleting}
                style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', transition: 'background 0.2s', opacity: isDeleting ? 0.5 : 1 }}>
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                style={{ flex: 1, padding: '12px', background: isDeleting ? 'rgba(239,68,68,0.4)' : '#ef4444', border: 'none', borderRadius: '12px', color: 'white', fontWeight: 700, fontSize: '0.9rem', cursor: isDeleting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.2s' }}>
                {isDeleting ? (
                  <>
                    <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                    Menghapus...
                  </>
                ) : (
                  <>
                    <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Hapus Permanen
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sign Out Confirmation Modal */}
      {showSignOutModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div
            onClick={() => !isSigningOut && setShowSignOutModal(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
          />
          <div style={{ position: 'relative', background: '#111', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '20px', padding: '36px 32px', maxWidth: '400px', width: '100%', boxShadow: '0 25px 60px rgba(0,0,0,0.8)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <FaSignOutAlt style={{ width: '22px', height: '22px', color: '#ef4444' }} />
            </div>
            <h3 style={{ color: 'white', fontWeight: 700, fontSize: '1.2rem', textAlign: 'center', marginBottom: '10px' }}>Sign Out?</h3>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', textAlign: 'center', marginBottom: '28px', lineHeight: 1.6 }}>
              Kamu akan keluar dari Dashboard Admin KH1EV. Pastikan semua perubahan sudah tersimpan.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowSignOutModal(false)}
                disabled={isSigningOut}
                style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontWeight: 600, fontSize: '0.9rem', cursor: isSigningOut ? 'not-allowed' : 'pointer', opacity: isSigningOut ? 0.5 : 1, transition: 'background 0.2s' }}
              >
                Batal
              </button>
              <button
                onClick={handleSignOutConfirm}
                disabled={isSigningOut}
                style={{ flex: 1, padding: '12px', background: isSigningOut ? 'rgba(239,68,68,0.4)' : '#ef4444', border: 'none', borderRadius: '12px', color: 'white', fontWeight: 700, fontSize: '0.9rem', cursor: isSigningOut ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.2s' }}
              >
                {isSigningOut ? (
                  <>
                    <div style={{ width: '15px', height: '15px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                    Signing out...
                  </>
                ) : (
                  <>
                    <FaSignOutAlt style={{ width: '14px', height: '14px' }} />
                    Ya, Sign Out
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pt-12 px-8 w-full relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-white/[0.02] border border-white/5 p-6 rounded-3xl">
          <div className="flex items-center gap-4">
            <img src={user.user_metadata?.avatar_url} alt="Avatar" className="w-16 h-16 rounded-full border-2 border-accent/50" />
            <div>
              <h1 className="text-2xl font-bold text-white">Welcome, {user.user_metadata?.full_name || user.user_metadata?.custom_claims?.global_name || user.user_metadata?.name || 'Admin'}</h1>
              <p className="text-neutral-400 text-sm">Dashboard Administrator</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-semibold transition-colors flex items-center gap-2">
              <FaHome />
              Main Page
            </Link>
            <button 
              onClick={() => setShowSignOutModal(true)}
              className="px-6 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-full font-semibold transition-colors flex items-center gap-2">
              <FaSignOutAlt />
              Sign Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1 flex flex-col gap-2">
            <button 
              onClick={() => setActiveTab('team')}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-left transition-colors ${activeTab === 'team' ? 'bg-accent/10 text-accent' : 'bg-white/[0.02] text-neutral-400 hover:text-white hover:bg-white/[0.05]'}`}>
              <FaUsers className="w-5 h-5" />
              Team Members
            </button>
            <button 
              onClick={() => setActiveTab('blogs')}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-left transition-colors ${activeTab === 'blogs' ? 'bg-accent/10 text-accent' : 'bg-white/[0.02] text-neutral-400 hover:text-white hover:bg-white/[0.05]'}`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
              Blogs
            </button>
            <button 
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-left transition-colors ${activeTab === 'projects' ? 'bg-accent/10 text-accent' : 'bg-white/[0.02] text-neutral-400 hover:text-white hover:bg-white/[0.05]'}`}>
              <FaBriefcase className="w-5 h-5" />
              Projects
            </button>
            <button 
              onClick={() => setActiveTab('discord-users')}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-left transition-colors ${activeTab === 'discord-users' ? 'bg-accent/10 text-accent' : 'bg-white/[0.02] text-neutral-400 hover:text-white hover:bg-white/[0.05]'}`}>
              <FaDiscord className="w-5 h-5" />
              Login Records
            </button>
            {currentUserRole !== 'Admin' && (
              <button 
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-left transition-colors ${activeTab === 'settings' ? 'bg-accent/10 text-accent' : 'bg-white/[0.02] text-neutral-400 hover:text-white hover:bg-white/[0.05]'}`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Settings
              </button>
            )}
          </div>

          <div className="lg:col-span-4 bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8">
            {activeTab === 'team' && (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-white">Manage Team</h2>
                  <button 
                    className="px-4 py-2 bg-accent text-white font-bold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm" 
                    onClick={() => { setEditingTeamMember({ name: '', role: '', system_role: 'Staff Division', image_url: '', bio: '', github_url: '', instagram_url: '', linkedin_url: '', tiktok_url: '' }); setActiveTab('team-editor'); }}>
                    <FaPlus /> Add Member
                  </button>
                </div>

                <div className="flex flex-col gap-12">
                  {['Kh1ev Organization', 'Kh1ev Community', 'Kh1ev Studio'].map(orgName => {
                    const orgMembers = teamMembers.filter(m => (m.organization || 'Kh1ev Community') === orgName);
                    return (
                      <div key={orgName} className="flex flex-col gap-4">
                        <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2">{orgName}</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-white/10 text-neutral-400 text-sm">
                                <th className="pb-4 font-semibold">Name</th>
                                <th className="pb-4 font-semibold">Display Role</th>
                                <th className="pb-4 font-semibold">{orgName === 'Kh1ev Community' ? 'System Rank' : 'Tags'}</th>
                                <th className="pb-4 font-semibold text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {orgMembers.map((member) => (
                                <tr key={member.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                  <td className="py-4">
                                    <div className="flex items-center gap-3">
                                      <img src={member.image_url || `https://ui-avatars.com/api/?name=${member.name}`} alt={member.name} className="w-10 h-10 rounded-full object-cover bg-neutral-800" />
                                      <span className="font-semibold text-white">{member.name}</span>
                                    </div>
                                  </td>
                                  <td className="py-4 text-neutral-300">{member.role}</td>
                                  <td className="py-4 text-neutral-400">
                                    {orgName === 'Kh1ev Community' ? (
                                      <span className="px-2 py-1 bg-white/5 rounded-full text-xs font-bold text-neutral-300">
                                        {member.system_role || 'Staff Division'}
                                      </span>
                                    ) : (
                                      <span className="text-xs text-neutral-400 line-clamp-1 max-w-[200px]" title={member.tags}>{member.tags || '-'}</span>
                                    )}
                                  </td>
                                  <td className="py-4">
                                    <div className="flex items-center justify-end gap-3">
                                      <div className="flex flex-col gap-1 mr-2">
                                        <button onClick={() => handleMoveTeamMember(orgName, orgMembers.indexOf(member), 'up')} className="p-1 text-neutral-500 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed" disabled={orgMembers.indexOf(member) === 0} title="Move Up">
                                          <FaArrowUp className="w-3 h-3" />
                                        </button>
                                        <button onClick={() => handleMoveTeamMember(orgName, orgMembers.indexOf(member), 'down')} className="p-1 text-neutral-500 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed" disabled={orgMembers.indexOf(member) === orgMembers.length - 1} title="Move Down">
                                          <FaArrowDown className="w-3 h-3" />
                                        </button>
                                      </div>
                                      <button onClick={() => handleEditTeamMember(member.id)} className="p-2 text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors" title="Edit">
                                        <FaEdit />
                                      </button>
                                      <button onClick={() => handleDeleteTeamMember(member.id, member.name)} className="p-2 text-red-500 hover:text-white bg-red-500/10 hover:bg-red-500 rounded-lg transition-colors" title="Delete">
                                        <FaTrash />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                              {orgMembers.length === 0 && (
                                <tr>
                                  <td colSpan={4} className="py-8 text-center text-neutral-500">No members in {orgName}.</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {activeTab === 'blogs' && (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-white">Manage Blogs</h2>
                  <button 
                    className="px-4 py-2 bg-accent text-white font-bold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm" 
                    onClick={() => { setEditingBlog({ title: '', slug: '', excerpt: '', content: '', image_url: '', published: false }); setActiveTab('blog-editor'); }}>
                    <FaPlus /> New Post
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-neutral-400 text-sm">
                        <th className="pb-4 font-semibold">Title</th>
                        <th className="pb-4 font-semibold">Status</th>
                        <th className="pb-4 font-semibold">Date</th>
                        <th className="pb-4 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.map((blog) => (
                        <tr key={blog.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="py-4">
                            <span className="font-semibold text-white">{blog.title}</span>
                            <div className="text-xs text-neutral-500 mt-1">/{blog.slug}</div>
                          </td>
                          <td className="py-4">
                            {blog.published ? (
                              <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-full">Published</span>
                            ) : (
                              <span className="px-2 py-1 bg-neutral-500/10 text-neutral-400 text-xs font-bold rounded-full">Draft</span>
                            )}
                          </td>
                          <td className="py-4 text-neutral-400 text-sm">{new Date(blog.created_at).toLocaleDateString()}</td>
                          <td className="py-4">
                            <div className="flex items-center justify-end gap-3">
                              <div className="flex flex-col gap-1 mr-2">
                                <button onClick={() => handleMoveGeneric('blogs', blogs, setBlogs, blogs.indexOf(blog), 'up')} className="p-1 text-neutral-500 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed" disabled={blogs.indexOf(blog) === 0} title="Move Up">
                                  <FaArrowUp className="w-3 h-3" />
                                </button>
                                <button onClick={() => handleMoveGeneric('blogs', blogs, setBlogs, blogs.indexOf(blog), 'down')} className="p-1 text-neutral-500 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed" disabled={blogs.indexOf(blog) === blogs.length - 1} title="Move Down">
                                  <FaArrowDown className="w-3 h-3" />
                                </button>
                              </div>
                              <button onClick={() => handleEditBlog(blog.id)} className="p-2 text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors" title="Edit">
                                <FaEdit />
                              </button>
                              <button onClick={() => handleDeleteBlog(blog.id, blog.title)} className="p-2 text-red-500 hover:text-white bg-red-500/10 hover:bg-red-500 rounded-lg transition-colors" title="Delete">
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {blogs.length === 0 && (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-neutral-500">No blog posts found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeTab === 'projects' && (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-white">Manage Projects</h2>
                  <button 
                    className="px-4 py-2 bg-accent text-white font-bold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm" 
                    onClick={() => { setEditingProject({ title: '', category: '', description: '', image: '', tags: [], link: '#', is_active: true }); setActiveTab('project-editor'); }}>
                    <FaPlus /> New Project
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-neutral-400 text-sm">
                        <th className="pb-4 font-semibold">Title</th>
                        <th className="pb-4 font-semibold">Category</th>
                        <th className="pb-4 font-semibold">Status</th>
                        <th className="pb-4 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project) => (
                        <tr key={project.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="py-4">
                            <span className="font-semibold text-white">{project.title}</span>
                          </td>
                          <td className="py-4">
                            <span className="px-2 py-1 bg-white/5 rounded text-xs font-semibold text-neutral-300">{project.category}</span>
                          </td>
                          <td className="py-4">
                            {project.is_active ? (
                              <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-full">Active</span>
                            ) : (
                              <span className="px-2 py-1 bg-neutral-500/10 text-neutral-400 text-xs font-bold rounded-full">Hidden</span>
                            )}
                          </td>
                          <td className="py-4">
                            <div className="flex items-center justify-end gap-3">
                              <div className="flex flex-col gap-1 mr-2">
                                <button onClick={() => handleMoveGeneric('studio_projects', projects, setProjects, projects.indexOf(project), 'up')} className="p-1 text-neutral-500 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed" disabled={projects.indexOf(project) === 0} title="Move Up">
                                  <FaArrowUp className="w-3 h-3" />
                                </button>
                                <button onClick={() => handleMoveGeneric('studio_projects', projects, setProjects, projects.indexOf(project), 'down')} className="p-1 text-neutral-500 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed" disabled={projects.indexOf(project) === projects.length - 1} title="Move Down">
                                  <FaArrowDown className="w-3 h-3" />
                                </button>
                              </div>
                              <button onClick={() => handleEditProject(project.id)} className="p-2 text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors" title="Edit">
                                <FaEdit />
                              </button>
                              <button onClick={() => handleDeleteProject(project.id, project.title)} className="p-2 text-red-500 hover:text-white bg-red-500/10 hover:bg-red-500 rounded-lg transition-colors" title="Delete">
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {projects.length === 0 && (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-neutral-500">No projects found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeTab === 'discord-users' && (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-white">Discord Login Records</h2>
                  <button onClick={fetchDiscordUsers} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors text-sm font-semibold">
                    Refresh Data
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-neutral-400 text-sm">
                        <th className="pb-4 font-semibold">User</th>
                        <th className="pb-4 font-semibold">Discord ID</th>
                        <th className="pb-4 font-semibold">Last Login</th>
                      </tr>
                    </thead>
                    <tbody>
                      {discordUsers.map((dUser) => (
                        <tr key={dUser.discord_id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <img src={dUser.avatar_url || `https://ui-avatars.com/api/?name=${dUser.username}`} alt={dUser.username} className="w-10 h-10 rounded-full object-cover bg-neutral-800 border border-white/10" />
                              <span className="font-semibold text-white">{dUser.username}</span>
                            </div>
                          </td>
                          <td className="py-4 text-neutral-300 font-mono text-sm">{dUser.discord_id}</td>
                          <td className="py-4 text-neutral-400 text-sm">
                            {new Date(dUser.last_login).toLocaleString('id-ID', {
                              day: 'numeric', month: 'short', year: 'numeric',
                              hour: '2-digit', minute: '2-digit'
                            })}
                          </td>
                        </tr>
                      ))}
                      {discordUsers.length === 0 && (
                        <tr>
                          <td colSpan={3} className="py-8 text-center text-neutral-500">No login records found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeTab === 'settings' && (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-white">System Settings</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    <h3 className="text-lg font-bold text-white mb-2">Discord Whitelist</h3>
                    <p className="text-neutral-400 text-sm mb-4">Manage Discord ID that are allowed to access this admin dashboard.</p>
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors text-sm font-semibold" onClick={() => setActiveTab('whitelist')}>Manage Whitelist</button>
                  </div>
                  
                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    <h3 className="text-lg font-bold text-white mb-2">Application Keys</h3>
                    <p className="text-neutral-400 text-sm mb-4">View or rotate your API keys, Discord tokens, and other sensitive system credentials.</p>
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors text-sm font-semibold" onClick={() => setActiveTab('keys')}>View Credentials</button>
                  </div>
                  
                  <div className="bg-white/[0.02] border border-red-500/10 p-6 rounded-2xl">
                    <h3 className="text-lg font-bold text-red-500 mb-2">Danger Zone</h3>
                    <p className="text-neutral-400 text-sm mb-4">Permanently delete data or reset the system. These actions cannot be undone.</p>
                    <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg transition-colors text-sm font-semibold" onClick={() => showNotify('This feature is currently disabled for safety.', 'error')}>Purge Cache</button>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'whitelist' && (
              <>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <button onClick={() => setActiveTab('settings')} className="text-neutral-400 hover:text-white transition-colors text-sm mb-2 font-semibold flex items-center gap-2"><FaArrowLeft className="w-3.5 h-3.5" /> Back to Settings</button>
                    <h2 className="text-2xl font-bold text-white">Discord Whitelist</h2>
                  </div>
                  <button className="px-4 py-2 bg-accent text-white font-bold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm" onClick={() => { setEditingAdminUser({ username: '', discord_id: '', role: 'Admin' }); setActiveTab('whitelist-editor'); }}>
                    <FaPlus /> Add User
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-neutral-400 text-sm">
                        <th className="pb-4 font-semibold">Username</th>
                        <th className="pb-4 font-semibold">Discord ID</th>
                        <th className="pb-4 font-semibold">Role</th>
                        <th className="pb-4 font-semibold">Added Date</th>
                        <th className="pb-4 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminUsers.map((adminUser) => (
                        <tr key={adminUser.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="py-4">
                            <span className="font-semibold text-white">{adminUser.username || 'Unknown'}</span>
                          </td>
                          <td className="py-4 text-neutral-300 font-mono text-sm">{adminUser.discord_id}</td>
                          <td className="py-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${adminUser.role === 'Head Admin' ? 'bg-red-500/20 text-red-400' : adminUser.role === 'Developer' ? 'bg-blue-500/20 text-blue-400' : 'bg-neutral-500/20 text-neutral-400'}`}>
                              {adminUser.role || 'Admin'}
                            </span>
                          </td>
                          <td className="py-4 text-neutral-400 text-sm">{new Date(adminUser.created_at).toLocaleDateString()}</td>
                          <td className="py-4">
                            <div className="flex items-center justify-end gap-3">
                              <div className="flex flex-col gap-1 mr-2">
                                <button onClick={() => handleMoveGeneric('admin_users', adminUsers, setAdminUsers, adminUsers.indexOf(adminUser), 'up')} className="p-1 text-neutral-500 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed" disabled={adminUsers.indexOf(adminUser) === 0} title="Move Up">
                                  <FaArrowUp className="w-3 h-3" />
                                </button>
                                <button onClick={() => handleMoveGeneric('admin_users', adminUsers, setAdminUsers, adminUsers.indexOf(adminUser), 'down')} className="p-1 text-neutral-500 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed" disabled={adminUsers.indexOf(adminUser) === adminUsers.length - 1} title="Move Down">
                                  <FaArrowDown className="w-3 h-3" />
                                </button>
                              </div>
                              <button onClick={() => handleEditAdminUser(adminUser.id)} className="p-2 text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-500 rounded-lg transition-colors" title="Edit">
                                <FaEdit />
                              </button>
                              <button onClick={() => handleDeleteAdminUser(adminUser.id, adminUser.username || adminUser.discord_id)} className="p-2 text-red-500 hover:text-white bg-red-500/10 hover:bg-red-500 rounded-lg transition-colors" title="Delete">
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {adminUsers.length === 0 && (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-neutral-500">No whitelisted users found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeTab === 'keys' && (
              <>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <button onClick={() => setActiveTab('settings')} className="text-neutral-400 hover:text-white transition-colors text-sm mb-2 font-semibold flex items-center gap-2"><FaArrowLeft className="w-3.5 h-3.5" /> Back to Settings</button>
                    <h2 className="text-2xl font-bold text-white">Application Keys</h2>
                  </div>
                  <button className="px-4 py-2 bg-accent text-white font-bold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm" onClick={() => showNotify('Feature to generate new API Key coming soon!', 'error')}>
                    <FaPlus /> Generate Key
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-neutral-400 text-sm">
                        <th className="pb-4 font-semibold">Key Name</th>
                        <th className="pb-4 font-semibold">Value</th>
                        <th className="pb-4 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiKeys.map((apiKey) => (
                        <tr key={apiKey.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="py-4">
                            <span className="font-semibold text-white">{apiKey.name}</span>
                          </td>
                          <td className="py-4">
                            <div className="bg-black/50 border border-white/10 px-3 py-1.5 rounded-lg text-neutral-400 font-mono text-sm flex items-center justify-between">
                              <span>{apiKey.key_value.substring(0, 8)}••••••••••••</span>
                              <button onClick={() => {navigator.clipboard.writeText(apiKey.key_value); alert('Copied to clipboard!')}} className="text-neutral-500 hover:text-white transition-colors">Copy</button>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center justify-end gap-3">
                              <div className="flex flex-col gap-1 mr-2">
                                <button onClick={() => handleMoveGeneric('api_keys', apiKeys, setApiKeys, apiKeys.indexOf(apiKey), 'up')} className="p-1 text-neutral-500 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed" disabled={apiKeys.indexOf(apiKey) === 0} title="Move Up">
                                  <FaArrowUp className="w-3 h-3" />
                                </button>
                                <button onClick={() => handleMoveGeneric('api_keys', apiKeys, setApiKeys, apiKeys.indexOf(apiKey), 'down')} className="p-1 text-neutral-500 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed" disabled={apiKeys.indexOf(apiKey) === apiKeys.length - 1} title="Move Down">
                                  <FaArrowDown className="w-3 h-3" />
                                </button>
                              </div>
                              <button onClick={() => handleDeleteApiKey(apiKey.id, apiKey.name)} className="p-2 text-red-500 hover:text-white bg-red-500/10 hover:bg-red-500 rounded-lg transition-colors" title="Delete">
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {apiKeys.length === 0 && (
                        <tr>
                          <td colSpan={3} className="py-8 text-center text-neutral-500">No API keys found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeTab === 'blog-editor' && (
              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
                <div className="flex items-center justify-between mb-8">
                  <button onClick={() => setActiveTab('blogs')} className="text-neutral-400 hover:text-white transition-colors text-sm font-semibold flex items-center gap-2"><FaArrowLeft className="w-3.5 h-3.5" /> Back to Blogs</button>
                  <h2 className="text-2xl font-bold text-white">{editingBlog.id ? 'Edit Blog Post' : 'Create New Post'}</h2>
                </div>

                <form onSubmit={handleSaveBlog} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-neutral-400">Title</label>
                      <input 
                        type="text" 
                        required
                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent transition-colors"
                        value={editingBlog.title || ''}
                        onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value})}
                        placeholder="e.g. Kh1ev Community Update"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-neutral-400">Slug (URL)</label>
                      <input 
                        type="text" 
                        required
                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent transition-colors"
                        value={editingBlog.slug || ''}
                        onChange={(e) => setEditingBlog({...editingBlog, slug: e.target.value})}
                        placeholder="e.g. kh1ev-community-update"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-neutral-400">Image URL</label>
                    <input 
                      type="text" 
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent transition-colors"
                      value={editingBlog.image_url || ''}
                      onChange={(e) => setEditingBlog({...editingBlog, image_url: e.target.value})}
                      placeholder="https://..."
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-neutral-400">Excerpt</label>
                    <textarea 
                      required
                      rows={2}
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent transition-colors resize-none"
                      value={editingBlog.excerpt || ''}
                      onChange={(e) => setEditingBlog({...editingBlog, excerpt: e.target.value})}
                      placeholder="A short summary of the post..."
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-neutral-400">Content (Markdown supported in frontend)</label>
                    <textarea 
                      required
                      rows={10}
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent transition-colors resize-none font-mono text-sm"
                      value={editingBlog.content || ''}
                      onChange={(e) => setEditingBlog({...editingBlog, content: e.target.value})}
                      placeholder="Write your post content here..."
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id="published"
                      className="w-5 h-5 accent-accent"
                      checked={editingBlog.published || false}
                      onChange={(e) => setEditingBlog({...editingBlog, published: e.target.checked})}
                    />
                    <label htmlFor="published" className="text-white font-semibold cursor-pointer">Publish Post</label>
                  </div>

                  <div className="flex justify-end gap-4 mt-4">
                    <button type="button" onClick={() => setActiveTab('blogs')} className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-colors disabled:opacity-50" disabled={isSaving}>
                      Cancel
                    </button>
                    <button type="submit" disabled={isSaving} className="px-6 py-3 bg-accent hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-accent/20 flex items-center gap-2 disabled:opacity-50">
                      {isSaving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                      {isSaving ? 'Saving...' : 'Save Post'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'project-editor' && (
              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
                <div className="flex items-center justify-between mb-8">
                  <button onClick={() => setActiveTab('projects')} className="text-neutral-400 hover:text-white transition-colors text-sm font-semibold flex items-center gap-2"><FaArrowLeft className="w-3.5 h-3.5" /> Back to Projects</button>
                  <h2 className="text-2xl font-bold text-white">{editingProject.id ? 'Edit Project' : 'Create New Project'}</h2>
                </div>

                <form onSubmit={handleSaveProject} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-neutral-400">Title</label>
                      <input 
                        type="text" 
                        required
                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent transition-colors"
                        value={editingProject.title || ''}
                        onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                        placeholder="e.g. Kh1ev Dashboard"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-neutral-400">Category</label>
                      <input 
                        type="text" 
                        required
                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent transition-colors"
                        value={editingProject.category || ''}
                        onChange={(e) => setEditingProject({...editingProject, category: e.target.value})}
                        placeholder="e.g. Web Application"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-neutral-400">Image URL <span className="text-neutral-500 font-normal italic">(Opsional)</span></label>
                      <input 
                        type="text" 
                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent transition-colors"
                        value={editingProject.image || ''}
                        onChange={(e) => setEditingProject({...editingProject, image: e.target.value})}
                        placeholder="https://..."
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-neutral-400">Link URL <span className="text-neutral-500 font-normal italic">(Opsional)</span></label>
                      <input 
                        type="text" 
                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent transition-colors"
                        value={editingProject.link || ''}
                        onChange={(e) => setEditingProject({...editingProject, link: e.target.value})}
                        placeholder="https://... or # for disabled"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-neutral-400">Description</label>
                    <textarea 
                      required
                      rows={3}
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent transition-colors resize-none"
                      value={editingProject.description || ''}
                      onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                      placeholder="Detailed project description..."
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-neutral-400">Tags (Comma separated)</label>
                    <input 
                      type="text" 
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent transition-colors"
                      value={typeof editingProject.tags === 'string' ? editingProject.tags : (editingProject.tags?.join(', ') || '')}
                      onChange={(e) => setEditingProject({...editingProject, tags: e.target.value as any})}
                      placeholder="e.g. Next.js, TailwindCSS, Supabase"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id="project_active"
                      className="w-5 h-5 accent-accent"
                      checked={editingProject.is_active ?? true}
                      onChange={(e) => setEditingProject({...editingProject, is_active: e.target.checked})}
                    />
                    <label htmlFor="project_active" className="text-white font-semibold cursor-pointer">Active / Visible in Portfolio</label>
                  </div>

                  <div className="flex justify-end gap-4 mt-4">
                    <button type="button" onClick={() => setActiveTab('projects')} className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-colors disabled:opacity-50" disabled={isSaving}>
                      Cancel
                    </button>
                    <button type="submit" disabled={isSaving} className="px-6 py-3 bg-accent hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-accent/20 flex items-center gap-2 disabled:opacity-50">
                      {isSaving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                      {isSaving ? 'Saving...' : 'Save Project'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'whitelist-editor' && (
              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
                <div className="flex items-center justify-between mb-8">
                  <button onClick={() => setActiveTab('whitelist')} className="text-neutral-400 hover:text-white transition-colors text-sm font-semibold flex items-center gap-2"><FaArrowLeft className="w-3.5 h-3.5" /> Back to Whitelist</button>
                  <h2 className="text-2xl font-bold text-white">{editingAdminUser.id ? 'Edit Whitelist User' : 'Add Whitelist User'}</h2>
                </div>

                <form onSubmit={handleSaveAdminUser} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-neutral-400">Username</label>
                      <input 
                        type="text" 
                        required
                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent transition-colors"
                        value={editingAdminUser.username || ''}
                        onChange={(e) => setEditingAdminUser({...editingAdminUser, username: e.target.value})}
                        placeholder="Discord Username"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-neutral-400">Discord ID</label>
                      <input 
                        type="text" 
                        required
                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent transition-colors font-mono"
                        value={editingAdminUser.discord_id || ''}
                        onChange={(e) => setEditingAdminUser({...editingAdminUser, discord_id: e.target.value})}
                        placeholder="e.g. 494169184175915019"
                        disabled={!!editingAdminUser.id}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-neutral-400">Role</label>
                      <select
                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent transition-colors"
                        value={editingAdminUser.role || 'Admin'}
                        onChange={(e) => setEditingAdminUser({...editingAdminUser, role: e.target.value})}>
                        <option value="Head Admin" className="bg-[#0a0a0a]">Head Admin</option>
                        {(!editingAdminUser.id || editingAdminUser.role !== 'Head Admin') && (
                          <option value="Admin" className="bg-[#0a0a0a]">Admin</option>
                        )}
                        <option value="Developer" className="bg-[#0a0a0a]">Developer</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 mt-4">
                    <button type="button" onClick={() => setActiveTab('whitelist')} className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-colors">
                      Cancel
                    </button>
                    <button type="submit" disabled={isSaving} className="px-6 py-3 bg-accent hover:bg-red-700 text-white font-bold rounded-xl transition-colors flex items-center gap-2">
                      {isSaving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                      {isSaving ? 'Saving...' : 'Save User'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'team-editor' && (
              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
                <div className="flex items-center justify-between mb-8">
                  <button onClick={() => setActiveTab('team')} className="text-neutral-400 hover:text-white transition-colors text-sm font-semibold flex items-center gap-2"><FaArrowLeft className="w-3.5 h-3.5" /> Back to Team</button>
                  <h2 className="text-2xl font-bold text-white">{editingTeamMember.id ? 'Edit Team Member' : 'Add New Member'}</h2>
                </div>

                <form onSubmit={handleSaveTeamMember} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-neutral-400">Name</label>
                      <input 
                        type="text" 
                        required
                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent transition-colors"
                        value={editingTeamMember.name || ''}
                        onChange={(e) => setEditingTeamMember({...editingTeamMember, name: e.target.value})}
                        placeholder="Member Name"
                      />
                    </div>
                    
                    {(!editingTeamMember.organization || editingTeamMember.organization === 'Kh1ev Community') && (
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-neutral-400">System Role (Hierarchy)</label>
                        <select
                          className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent transition-colors"
                          value={editingTeamMember.system_role || 'Staff Division'}
                          onChange={(e) => setEditingTeamMember({...editingTeamMember, system_role: e.target.value})}>
                          <option value="Founder" className="bg-[#0a0a0a]">Founder</option>
                          <option value="Chief" className="bg-[#0a0a0a]">Chief</option>
                          <option value="Manager" className="bg-[#0a0a0a]">Manager</option>
                          <option value="Head Division" className="bg-[#0a0a0a]">Head Division</option>
                          <option value="Staff Division" className="bg-[#0a0a0a]">Staff Division</option>
                          <option value="Trainee" className="bg-[#0a0a0a]">Trainee</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-neutral-400">Organization</label>
                      <select
                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent transition-colors"
                        value={editingTeamMember.organization || 'Kh1ev Community'}
                        onChange={(e) => setEditingTeamMember({...editingTeamMember, organization: e.target.value})}>
                        <option value="Kh1ev Organization" className="bg-[#0a0a0a]">Kh1ev Organization</option>
                        <option value="Kh1ev Community" className="bg-[#0a0a0a]">Kh1ev Community</option>
                        <option value="Kh1ev Studio" className="bg-[#0a0a0a]">Kh1ev Studio</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-neutral-400">Display Role</label>
                      <input 
                        type="text" 
                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent transition-colors"
                        value={editingTeamMember.role || ''}
                        onChange={(e) => setEditingTeamMember({...editingTeamMember, role: e.target.value})}
                        placeholder="e.g. Lead Developer"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-neutral-400 flex items-center justify-between">
                        Discord ID (Opsional)
                        <span className="text-xs text-accent">Auto Profile Picture!</span>
                      </label>
                      <input 
                        type="text" 
                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent transition-colors font-mono"
                        onChange={(e) => {
                          const id = e.target.value.trim();
                          if (id) {
                            setEditingTeamMember({...editingTeamMember, image_url: `/api/discord-avatar/${id}`});
                          }
                        }}
                        placeholder="Masukkan Discord ID (misal: 1065405418349797417)"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-neutral-400">Image URL</label>
                      <input 
                        type="text" 
                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent transition-colors"
                        value={editingTeamMember.image_url || ''}
                        onChange={(e) => setEditingTeamMember({...editingTeamMember, image_url: e.target.value})}
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-neutral-400">Bio</label>
                    <textarea 
                      rows={2}
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent transition-colors resize-none"
                      value={editingTeamMember.bio || ''}
                      onChange={(e) => setEditingTeamMember({...editingTeamMember, bio: e.target.value})}
                      placeholder="Short biography..."
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-neutral-400">Roles / Tags</label>
                    <div className="flex flex-col gap-2 p-4 bg-white/5 border border-white/10 rounded-xl h-[280px] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                        {TEAM_TAGS.map(tag => {
                          const currentTags = editingTeamMember.tags ? editingTeamMember.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
                          const isChecked = currentTags.includes(tag);
                          return (
                            <label key={tag} className="flex items-center gap-3 cursor-pointer group">
                              <input 
                                type="checkbox" 
                                className="hidden"
                                checked={isChecked}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setEditingTeamMember({...editingTeamMember, tags: [...currentTags, tag].join(',')});
                                  } else {
                                    setEditingTeamMember({...editingTeamMember, tags: currentTags.filter(t => t !== tag).join(',')});
                                  }
                                }}
                              />
                              <div className={`w-4 h-4 rounded-full border flex-shrink-0 transition-all duration-300 flex items-center justify-center ${isChecked ? 'bg-cyan-500 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'border-neutral-500 bg-neutral-600/30 group-hover:border-neutral-400'}`}>
                                {isChecked && <div className="w-2 h-2 rounded-full bg-white"></div>}
                              </div>
                              <span className={`text-sm font-semibold transition-colors duration-300 ${isChecked ? 'text-cyan-400' : 'text-neutral-300 group-hover:text-white'}`}>{tag}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-neutral-400">GitHub URL <span className="text-neutral-500 font-normal italic">(Opsional)</span></label>
                      <input 
                        type="text" 
                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent transition-colors"
                        value={editingTeamMember.github_url || ''}
                        onChange={(e) => setEditingTeamMember({...editingTeamMember, github_url: e.target.value})}
                        placeholder="https://github.com/..."
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-neutral-400">TikTok URL <span className="text-neutral-500 font-normal italic">(Opsional)</span></label>
                      <input 
                        type="text" 
                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent transition-colors"
                        value={editingTeamMember.tiktok_url || ''}
                        onChange={(e) => setEditingTeamMember({...editingTeamMember, tiktok_url: e.target.value})}
                        placeholder="https://tiktok.com/@..."
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-neutral-400">Instagram URL <span className="text-neutral-500 font-normal italic">(Opsional)</span></label>
                      <input 
                        type="text" 
                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent transition-colors"
                        value={editingTeamMember.instagram_url || ''}
                        onChange={(e) => setEditingTeamMember({...editingTeamMember, instagram_url: e.target.value})}
                        placeholder="https://instagram.com/..."
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-neutral-400">LinkedIn URL <span className="text-neutral-500 font-normal italic">(Opsional)</span></label>
                      <input 
                        type="text" 
                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent transition-colors"
                        value={editingTeamMember.linkedin_url || ''}
                        onChange={(e) => setEditingTeamMember({...editingTeamMember, linkedin_url: e.target.value})}
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 mt-4">
                    <button type="button" onClick={() => setActiveTab('team')} className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-colors disabled:opacity-50" disabled={isSaving}>
                      Cancel
                    </button>
                    <button type="submit" disabled={isSaving} className="px-6 py-3 bg-accent hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-accent/20 flex items-center gap-2 disabled:opacity-50">
                      {isSaving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                      {isSaving ? 'Saving...' : 'Save Member'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
