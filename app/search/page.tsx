import Search from '@/components/search';
import { fetchGames } from '../lib/data';

export default async function Page(
  props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;
  }
) {

  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const game = await fetchGames(query, 1);
  console.log(game);
  
  return (
    <div className="grid grid-rows-[auto_auto_1fr] items-center justify-items-center min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1> Search for a game here!</h1>
      <div>
        <Search placeholder="Search for a game here..."/>
      </div>
    </div>
  );
}
