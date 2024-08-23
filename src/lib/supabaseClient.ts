import { createClient } from "@supabase/supabase-js";
import { Dispatch, SetStateAction } from "react";

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const fetchPostOwner = async (
  post: Post,
  setNickname: Dispatch<SetStateAction<string>>
) => {
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("user_id", post.user_id);

  if (error) {
    console.error("Error fetching proifle: ", error);
  } else {
    if (data.length === 0) {
      setNickname(`#${post.user_id.substring(post.user_id.length - 4)}`);
    } else {
      setNickname(data[0].nickname);
    }
  }
};
