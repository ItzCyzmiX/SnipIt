import { supabase } from '$lib/supabase';

export async function load({ setHeaders }) {
    const { data, error } = await supabase
        .from('snippets')
        .select('*');

    if (error) {
        console.error('Error fetching snippets:', error);
        throw new Error('Failed to fetch snippets');
    }

    

    return {
        snippets: data
    };
}
