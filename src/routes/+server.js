import { json } from '@sveltejs/kit';
import { supabase } from "$lib/supabase"
// /src/routes/snippets/+server.js

export async function POST({ request }) {
    try {
        const req = await request.json();
        const { 
            data, 
            error 
        } = await supabase.from('snippets')
                            .insert([
                                {   code: req.code, 
                                    author: req.author,
                                    language: req.language,
                                    name: req.snippetName
                                },
                            ]).select()
        console.log(data, error)
        // Return a response
        return json({ message: 'Snippet created successfully'}, { status: 200 } );
    } catch (error) {
        return json({ error: 'Failed to create snippet' }, { status: 500 });
    }
}
