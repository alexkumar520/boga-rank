import { auth } from "@/auth"
import { Database } from './database.types'
import { redirect } from 'next/navigation'
import RankButton from "@/components/rank-button";
import RankingGame from "@/components/rank-game";
import { rankGame } from "../lib/actions";
import { supabaseConnect } from "../lib/supabase";




export default async function Page(props: {
    searchParams?: Promise<{
        id?: string;
        game?: string;
    }>;
}) {

  const session = await auth();
  const searchParams = await props.searchParams;
  const id = searchParams?.id || '';
  const game = searchParams?.game || '';

  const supabase = await supabaseConnect();

  const result = await supabase.from("user_ranks").select("games").eq('id', session?.user?.id);
  let games_list = result.data![0]["games"]; //pass this to binarysearch component if its not null. 

  if (games_list === null){
    games_list = [{id: id, name: game}]; // maybe add a prompt to notify user that since this is the first ranked one, we dont need to actually do binary search...
    rankGame(games_list)
    redirect("/home"); // when u insert, it displays an empty screen, then redirects. Need to fix so that it displays something maybe...
  }

  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <RankingGame gameList={games_list} gameName={game} game_id={id}></RankingGame>
    </div>
  );
}
