'use server';
import { auth } from "@/auth"
import { Database } from './database.types'
import { redirect } from 'next/navigation';
import { supabaseConnect } from "../lib/supabase";



 
export async function updateDisplayName(id: string, formData: FormData) {
  // Take displayName from form and then add it to supabase. 
  const session = await auth();
  
  // Sample usage of querying db
  const supabase = await supabaseConnect();

  const displayName = formData.get('display_name');

  const { data, error } = await supabase.from("users").update({display_name: displayName}).eq('id', session?.user?.id);

  redirect('/home');
}

export async function rankGame(game_list: Database.user_ranks.games) {
  // Take displayName from form and then add it to supabase. 
  const session = await auth();
  
  // Sample usage of querying db
  const supabase = await supabaseConnect();
  
  const {data, error} = await supabase.from("user_ranks").update({games: game_list}).eq('id', session?.user?.id);
}