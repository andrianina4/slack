"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { addChannel } from "@/api/channel";

const FormSchema = z.object({
  name: z.string({}).min(1, "Le nom du canal est obligatoire"),
  isPublic: z.boolean(),
});

export function FormGroup() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      isPublic: true,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await addChannel(data);
  }

  console.log({ error: form.formState.errors });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du canal</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nom du canal"
                  {...field}
                  className="mt-2 w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label
                    htmlFor="terms2"
                    className="text-sm font-medium leading-none "
                  >
                    Cannal publique
                  </label>
                </div>

                {/* <Checkbox /> */}
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="cursor-pointer">
          Enregistrer
        </Button>
      </form>
    </Form>
  );
}
