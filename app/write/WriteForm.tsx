"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";

import { users } from "@prisma/client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { PostWrapper } from "../src/features/post/PostWrapper";
import { ContentTextArea } from "../src/features/post/ContentTextArea";

const FormScheme = z.object({
  content: z.string().min(1).max(500),
});

export type WritePostFormType = z.infer<typeof FormScheme>;

type WritePostFormProps = {
  user: any;
  onSubmit: (values: WritePostFormType) => Promise<string | void>;
};

export const WriteForm = ({ user, onSubmit }: WritePostFormProps) => {
  const form = useZodForm({
    schema: FormScheme,
  });
  const router = useRouter();

  return (
    <div className="w-full">
      <PostWrapper author={user} className="w-full">
        <Form
          form={form}
          onSubmit={async (values) => {
            const url = await onSubmit(values);
            if (url) {
              router.push(url);
            }
          }}
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <ContentTextArea
                  className="border border-accent rounded focus:outline-none focus:border-muted-foreground focus:ring-current transition-all duration-200"
                  {...field}
                  rows={4}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full justify-end">
            <Button size="sm">Post</Button>
          </div>
        </Form>
      </PostWrapper>
    </div>
  );
};
