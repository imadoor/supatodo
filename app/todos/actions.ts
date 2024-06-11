"use server"

import { Todo } from "@/types/custom";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addTodo(formData: FormData){
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const supabase = await createClient();
    const text = formData.get("todo") as string | null;

    if(!text) {
        throw new Error("Todo text is required");
    }
    const { data:{ user }} = await supabase.auth.getUser();

    if(!user){
        throw new Error("User is not authenticated");
    }
    const { data, error } = await supabase.from("todos").insert(
        {
            task:text,
            user_id: user.id,
        }
    );
    if(error){
        throw new Error(error.message);
    }
    revalidatePath("/todos");
    // const { data, error } = await supabase
    //     .from("todos")
    //     .insert([
    //         {
    //             title: formData.get("title"),
    //             description: formData.get("description"),
    //             user_id: supabase.auth.user()?.id,
    //         }
    //     ]);
    // return { data, error };
}

export async function deleteTodo(id: number){
    const supabase = await createClient();

    const { data:{ user }} = await supabase.auth.getUser();
    if(!user){
        throw new Error("User is not authenticated");
    }

    const { data, error } = await supabase.from("todos").delete().match({ 
        user_id: user.id,
        id: id 
    });

    if(error){
        throw new Error(error.message);
    }
    revalidatePath("/todos");

}

export async function updateTodo(todo: Todo){
    const supabase = await createClient();

    const { data:{ user }} = await supabase.auth.getUser();
    if(!user){
        throw new Error("User is not authenticated");
    }
    const { data, error } = await supabase.from("todos").update(todo).match({
        user_id: user.id,
        id: todo.id
    });
    if(error){
        throw new Error(error.message);
    }
    revalidatePath("/todos");
}