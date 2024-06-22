import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default function AdminSelector(props: any){
    // const supabase = await createClient();
    // const { data: { user }, error } = await supabase.auth.getUser();
    const { creators } = props;

    
    // if (!user) {
    //   return redirect("/login");
    // }
  
    // const {data: creators} = await supabase
    //   .from("content_creators")
    //   .select()
    
    // console.log(creators)
      
    return (
        <>
            {/* <TodoList todos={todos ?? []} /> */}
            <Select>
            {/* <SelectTrigger className="w-[180px]"> */}
            <SelectTrigger className="flex justify-center">
                <SelectValue placeholder="Select a creator" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectLabel>Creators</SelectLabel>
                {
                    creators?.map(creator => (
                        <SelectItem key={creator.content_creator_id} value={creator.content_creator_id}>{creator.creator_tag_1}</SelectItem>
                    ))
                }
                {/* <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem> */}
                </SelectGroup>
            </SelectContent>
            </Select>
        </>
    )
}