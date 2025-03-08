import { SignOut } from "@/components/sign-out";
import { auth } from "@/auth"
import { redirect } from 'next/navigation'
import { DisplayRanks } from "@/components/display-ranks";
import { SearchGame } from "@/components/redirect-search"
import { supabaseConnect } from "../lib/supabase";


export default async function Page() {

  const session = await auth();
  const supabase = await supabaseConnect();
  const { data, error } = await supabase.from("users").select("*").eq('id', session?.user?.id);

  if (data && data[0].display_name.length === 0){
      redirect('/signup')
  }

  const displayName = data ? data[0].display_name : 'no_display_name';
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Welcome to boga rank, {displayName}!</h1>
      <DisplayRanks></DisplayRanks>
      <SignOut></SignOut>
      <SearchGame></SearchGame>
    </div>
  );
}
