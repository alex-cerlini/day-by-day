import { queryClient } from "@/app/[locale]/providers";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CommentsResponseApiProps } from "@/hooks/useComments/types";
import { PostsResponseApiProps } from "@/hooks/usePosts/types";
import { Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

export enum EditModalEnum {
  COMMENT,
  POST,
}

type EditModalProps = {
  type: EditModalEnum;
  commentData?: CommentsResponseApiProps & {
    postId: number;
  };
  postData?: PostsResponseApiProps;
};

export const EditModal = ({ commentData, type, postData }: EditModalProps) => {
  const [open, setOpen] = useState(false);

  const tEditModal = useTranslations("EditModal");
  const tButton = useTranslations("Button");

  const updateComment = (body: string) => {
    queryClient.setQueryData(
      ["comments", String(commentData?.postId)],
      (prev: CommentsResponseApiProps[]) => {
        const newCommentsObj = prev.map((comment) => {
          if (comment.id === commentData?.id) {
            return { ...comment, body };
          }
          return { ...comment };
        });

        return newCommentsObj;
      }
    );
  };

  const updatePost = (body: string) => {
    queryClient.setQueryData(["posts"], (prev: PostsResponseApiProps[]) => {
      const newPostsObj = prev.map((post) => {
        if (post.id === postData?.id) {
          return { ...post, body };
        }
        return { ...post };
      });

      return newPostsObj;
    });
  };

  const onSubmit = (data: { body?: string }) => {
    if (data?.body) {
      if (type === EditModalEnum.COMMENT) {
        updateComment(data.body);
        return setOpen(false);
      }

      updatePost(data.body);
      return setOpen(false);
    }
  };

  const { register, handleSubmit } = useForm();

  const inputDefaultValue = commentData?.body ?? postData?.body;

  return (
    <Dialog open={open}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <Pencil
          size={16}
          className="cursor-pointer"
          data-test={
            type === EditModalEnum.COMMENT
              ? "comment-edit-icon"
              : "post-edit-icon"
          }
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{tEditModal("edit")}</DialogTitle>
          <DialogDescription className="sr-only">
            {tEditModal("description")}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} data-test="edit-form">
          <div className="py-4">
            <Input
              id="body"
              defaultValue={inputDefaultValue}
              {...register("body")}
              data-test="edit-input"
            />
          </div>
          <DialogFooter>
            <Button type="submit">{tButton("save")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
