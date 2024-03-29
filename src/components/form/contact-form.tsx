"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { emailSchema } from "@/utils/zod-schema";
import { sendEmail } from "@/actions/email";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SpinnerSVG from "@components/svg/spinner-svg";
import { EmailForm } from "@/utils/types";
import es from "@/locales/es";

export default function ContactForm() {
  const t = es.contact;

  // form definition
  const form = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
      subject: "",
      message: "",
    },
  });

  // form on submit
  const handleSubmit = async (data: EmailForm) => {
    // server action to create or update
    const result = await sendEmail(data);

    // show toast of server returned result, reset form if successful
    if (result?.success) {
      toast.success(result?.message);
      form.reset();
    } else if (!result?.success) {
      toast.error(result?.message);
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <CardTitle>{t.heading}</CardTitle>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.email}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.subject}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.message}</FormLabel>
                      <FormControl>
                        <Textarea className="resize-y" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="w-24"
                  disabled={form.formState.isSubmitting}
                  type="submit"
                >
                  {form.formState.isSubmitting ? (
                    <SpinnerSVG size="6" />
                  ) : (
                    <>{t.btn.send}</>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
