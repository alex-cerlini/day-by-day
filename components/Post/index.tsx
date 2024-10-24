import { useComments } from "@/hooks/useComments";
import { PostsResponseApiProps } from "@/hooks/usePosts/types";
import { Trash, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "../Button";
import { queryClient } from "@/app/[locale]/providers";
import { CommentsResponseApiProps } from "@/hooks/useComments/types";
import { useForm } from "react-hook-form";
import { Link } from "@/i18n/routing";
import { authUserDataAtom } from "@/atoms/authUserData";
import { useAtomValue } from "jotai";
import { ProfileResponseApiProps } from "@/hooks/useProfile/types";
import { EditModal, EditModalEnum } from "../EditModal";

export const Post = ({ post }: { post: PostsResponseApiProps }) => {
  const tHome = useTranslations("Home");
  const tButton = useTranslations("Button");

  const { data: commentsData } = useComments(String(post.id));

  const authUserData = useAtomValue(authUserDataAtom);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: { body?: string }) => {
    if (data.body) {
      createComment({ user: authUserData, body: data.body });
      reset();
    }
  };

  const createComment = ({
    user,
    body,
  }: {
    user: ProfileResponseApiProps;
    body: string;
  }) => {
    queryClient.setQueryData(
      ["comments", String(post.id)],
      (prev: CommentsResponseApiProps[]) => [
        ...prev,
        {
          name: user.name,
          body,
          id: Math.random() * 1_000_000,
          userId: user.id,
        },
      ]
    );
  };

  const deleteComment = ({ id }: { id: number }) => {
    queryClient.setQueryData(
      ["comments", String(post.id)],
      (prev: CommentsResponseApiProps[]) =>
        prev.filter((comment) => comment.id !== id)
    );
  };

  const deletePost = () => {
    queryClient.setQueryData(["posts"], (prev: PostsResponseApiProps[]) =>
      prev.filter((prevPost) => prevPost.id !== post.id)
    );
  };

  return (
    <div key={post.id} className="w-full my-4 border-t border-slate-500 pt-4">
      <div className="flex items-center gap-x-4">
        <Link href={`/profile/${post.userId}`}>
          <User size={36} />
        </Link>
        <div className="w-full">
          <b>{post.title}</b>
          <p>{post.body}</p>
        </div>
        {authUserData.id === post.userId && (
          <div className="flex flex-col gap-y-2 justify-center">
            <EditModal postData={post} type={EditModalEnum.POST} />
            <Trash
              size={16}
              onClick={deletePost}
              className="cursor-pointer"
              data-test="post-trash-icon"
            />
          </div>
        )}
      </div>
      {commentsData?.map((comment) => (
        <div key={comment.id} className="w-full my-4 pt-4">
          <div className="flex items-center gap-x-4 pl-10">
            <div>
              <User size={16} />
            </div>
            <div className="text-sm">
              <b>{comment.name}</b>
              <p>{comment.body}</p>
            </div>
            <div className="flex flex-col gap-y-2 justify-center">
              {authUserData.id === comment.userId && (
                <EditModal
                  commentData={{
                    ...comment,
                    postId: post.id,
                  }}
                  type={EditModalEnum.COMMENT}
                />
              )}
              {authUserData.id === comment.userId && (
                <Trash
                  size={16}
                  className="cursor-pointer"
                  onClick={() => deleteComment({ id: comment.id })}
                  data-test="comment-trash-icon"
                />
              )}
            </div>
          </div>
        </div>
      ))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center my-4 gap-x-4">
          <User />
          <input
            type="text"
            placeholder={tHome("newComment")}
            className="w-full outline-none whitespace-pre-wrap break-words h-full"
            {...register("body")}
          />
          <Button>{tButton("reply")}</Button>
        </div>
      </form>
    </div>
  );
};
