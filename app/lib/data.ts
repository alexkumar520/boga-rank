import { auth } from "@/auth"
import { supabaseConnect } from "@/app/lib/supabase";
import { Database } from '@/database.types'

const ITEMS_PER_PAGE = 10;

export async function fetchGamesPages(query: string) {

    const supabase = await supabaseConnect();
    const { data, count, error } = await supabase.from("games").select("*", { count: 'exact', head: true}).ilike('name', `%${query}%`);
    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    
    return totalPages;
}

export async function fetchGames(query: string, currentPage: number){
    
    const supabase = await supabaseConnect();
    const offset = (currentPage-1) * ITEMS_PER_PAGE;
    const { data, error } = await supabase.from("games").select("id, name").ilike('name', `%${query}%`).range(offset, offset + ITEMS_PER_PAGE - 1).order('name', {ascending: true});
    
    return data;
}