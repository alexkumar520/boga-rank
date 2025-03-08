import { createClient } from "@supabase/supabase-js";
import { Database } from '@/database.types';
import { auth } from "@/auth"

export async function supabaseConnect(){
    const session = await auth();
  
    const accessToken = session?.supabaseAccessToken;

    return createClient<Database>(
    
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          global: {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        }
    )
}
