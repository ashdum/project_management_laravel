import { createClient } from '@supabase/supabase-js';
import { supabase } from './supabase';

export const signUp = async (email: string, password: string) => {
  if (!supabase) throw new Error('Supabase client not initialized');

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const signIn = async (email: string, password: string) => {
  if (!supabase) throw new Error('Supabase client not initialized');

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  if (!supabase) throw new Error('Supabase client not initialized');

  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const resetPassword = async (email: string) => {
  if (!supabase) throw new Error('Supabase client not initialized');

  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error;
};

export const updatePassword = async (newPassword: string) => {
  if (!supabase) throw new Error('Supabase client not initialized');

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
};

export const getCurrentUser = async () => {
  if (!supabase) throw new Error('Supabase client not initialized');

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

export const onAuthStateChange = (callback: (event: string, session: any) => void) => {
  if (!supabase) throw new Error('Supabase client not initialized');

  return supabase.auth.onAuthStateChange(callback);
};