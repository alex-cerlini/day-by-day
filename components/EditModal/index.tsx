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
        <Pencil size={16} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
          <DialogDescription className="sr-only">
            Edit your message.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-4">
            <Input
              id="body"
              defaultValue={inputDefaultValue}
              {...register("body")}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
