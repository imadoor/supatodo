import AdminSelector from "@/components/admin/admin-selector";
import { TodoList } from "@/components/todo-list";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export default async function Admin() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (!user) {
    return redirect("/login");
  }

  const {data: creators} = await supabase
      .from("content_creators")
      .select()
    
    console.log(creators)
  return (
    <section className="p-3 pt-6 max-w-2xl w-full flex flex-col gap-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl flex justify-center">
            Admin
        </h1>
        <Separator className="w-full " />
        {/* <TodoList todos={todos ?? []} /> */}
        <AdminSelector creators={creators}/> 
    </section>
  );
}
