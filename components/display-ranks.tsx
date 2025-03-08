import { auth } from "@/auth"
import { supabaseConnect } from "@/app/lib/supabase";
import { Database } from './database.types'


export async function DisplayRanks() {
    const session = await auth();
    const supabase = await supabaseConnect();

    const { data, error } = await supabase.from("user_ranks").select("games").eq('id', session?.user?.id);

    if ( data && data[0].games === null){
        return(
            <div>
                <h1>Currently there are no games you ranked. Try ranking some now!</h1>
            </div>

        )
    }

    else{
        const listItems = data![0].games.map((game: Database.user_ranks.games) => (
            <li key={game.id}>
                {game.name}
            </li>
        ))
        return (
            <div>
                <ul>{listItems}</ul>
            </div>
          )
    }
}