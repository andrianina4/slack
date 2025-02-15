"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IUser } from "@/interfaces/entity";
import { useEffect } from "react";
import { modifyUser } from "@/api/user";
const FormSchema = z.object({
  email: z
    .string({
      message: "L'email est obligatoire",
    })
    .email({
      message: "L'email est invalide",
    }),
  lastname: z.string({
    message: "Le nom est obligatoire",
  }),
  firstname: z.string({
    message: "Le prénom(s) est obligatoire",
  }),
});

type PropsFormProfile = {
  user?: IUser | null;
};

export function FormProfile({ user }: PropsFormProfile) {
  const editMode = Boolean(user);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      firstname: "",
      lastname: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("email", user.email);
      form.setValue("firstname", user.firstname);
      form.setValue("lastname", user.lastname);
    }
  }, [user, form]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (user) {
      await modifyUser({ ...data, id: user.id });
    }
  }

  console.log({ error: form.formState.errors });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email"
                  {...field}
                  type="email"
                  readOnly={editMode}
                  disabled={editMode}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Nom" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénoms</FormLabel>
              <FormControl>
                <Input placeholder="Prénom(s)" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="cursor-pointer">
          {editMode ? "Modifier" : "Enregistrer"}
        </Button>
      </form>
    </Form>
  );
}
