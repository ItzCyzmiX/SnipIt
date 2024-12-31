import { supabase } from '$lib/supabase';

export async function load({ setHeaders }) {
    const { data, error } = await supabase
        .from('snippets')
        .select('*');

    if (error) {
        console.error('Error fetching snippets:', error);
        throw new Error('Failed to fetch snippets');
    }

    

    setHeaders({
        'cache-control': 'public, max-age=3600, stale-while-revalidate=86400'
    });

    return {
        snippets: data
    };
}
