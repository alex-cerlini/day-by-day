"use client";

import { useTranslations } from "next-intl";

import { User } from "lucide-react";
import { usePosts } from "@/hooks/usePosts";
import { Post } from "@/components/Post";
import { Button } from "@/components/Button";
import { queryClient } from "./providers";
import { PostsResponseApiProps } from "@/hooks/usePosts/types";
import { useForm } from "react-hook-form";
import { useAtomValue } from "jotai";
import { authUserDataAtom } from "@/atoms/authUserData";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function Home() {
  const tHome = useTranslations("Home");
  const tButton = useTranslations("Button");

  const { data: postsData, isFetching: postsIsFetching } = usePosts();

  const authUserData = useAtomValue(authUserDataAtom);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data: { body?: string }) => {
    if (data.body) {
      createPost({
        userId: authUserData.id,
        name: authUserData.name,
        body: data.body,
      });
      reset();
    }
  };

  const createPost = ({
    userId,
    name,
    body,
  }: {
    userId: number;
    name: string;
    body: string;
  }) => {
    queryClient.setQueryData(["posts"], (prev: PostsResponseApiProps[]) => {
      if (!prev) {
        return {
          userId,
          id: Math.random() * 1_000_000,
          title: name,
          body,
        };
      }

      return [
        ...prev,
        {
          userId,
          id: Math.random() * 1_000_000,
          title: name,
          body,
        },
      ];
    });
  };

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center my-4 gap-x-4">
          <User />
          <input
            type="text"
            placeholder={tHome("whatsHappening")}
            className="w-full outline-none whitespace-pre-wrap break-words h-full"
            {...register("body")}
            id="create-post"
          />
        </div>
        <div className="w-full flex justify-end">
          <Button type="submit" id="create-post-button">
            {tButton("post")}
          </Button>
        </div>
      </form>
      {postsIsFetching ? (
        <div className="w-full flex justify-center items-center my-20">
          <LoadingSpinner className="w-16 h-16" />
        </div>
      ) : (
        postsData?.map((post) => <Post post={post} key={post.id} />)
      )}
    </div>
  );
}
