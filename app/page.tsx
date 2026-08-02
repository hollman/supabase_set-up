import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

/**
 * Example Server Component that fetches data from a Supabase table.
 *
 * Replace `'todos'` with your own table name and update the query/rendering
 * logic to match your data model.
 */
export default async function Page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: todos, error } = await supabase.from("todos").select();

  if (error) {
    console.error("Error fetching todos:", error.message);
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Todos</h1>
      {todos && todos.length > 0 ? (
        <ul className="list-disc pl-6 space-y-2">
          {todos.map((todo) => (
            <li key={todo.id}>{todo.name}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No todos found. Add some to your Supabase table!</p>
      )}
    </main>
  );
}
