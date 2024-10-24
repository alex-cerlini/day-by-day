"use client";

import { authUserDataAtom } from "@/atoms/authUserData";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Post } from "@/components/Post";
import { usePosts } from "@/hooks/usePosts";
import { useProfile } from "@/hooks/useProfile";
import { useAtomValue } from "jotai";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function Profile() {
  const params = useParams<{ id: string; locale: string }>();
  const router = useRouter();

  // eslint-disable-next-line prefer-const
  let { data: profileData, isFetching: profileIsFetching } = useProfile(
    params.id
  );

  const authUserData = useAtomValue(authUserDataAtom);

  // eslint-disable-next-line prefer-const
  let { data: postsData, isFetching: postsIsFetching } = usePosts();

  if (String(params.id) === String(authUserData.id)) {
    profileData = authUserData;
    postsData = postsData?.filter((post) => post.userId === authUserData.id);
  } else {
    postsData = postsData?.filter((post) => post.userId === Number(params.id));
  }

  const tNotFound = useTranslations("NotFound");

  if (!profileIsFetching && !profileData?.id) {
    return (
      <div className="my-20 text-lg font-bold flex items-center justify-center gap-x-4">
        <Link href="#" onClick={() => router.back()}>
          <ArrowLeft className="text-slate-600 cursor-pointer" />
        </Link>
        <span>{tNotFound("profile")}</span>
      </div>
    );
  }

  return (
    <div className="my-4">
      <div className="flex gap-x-8">
        <Link href="#" onClick={() => router.back()}>
          <ArrowLeft className="text-slate-600 cursor-pointer" />
        </Link>
        {profileIsFetching ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-col">
            <span>{profileData?.name}</span>
            <span className="text-sm">@{profileData?.username}</span>
            <span className="text-xs">{postsData?.length} posts</span>
          </div>
        )}
      </div>

      {postsIsFetching ? (
        <div className="h-full w-full flex items-center justify-center my-20">
          <LoadingSpinner className="w-9 h-9" />
        </div>
      ) : (
        postsData?.map((post) => <Post post={post} key={post.id} />)
      )}
    </div>
  );
}
