import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useTransactionStore } from "@/store/store";

type DescriptionProps = {
  visibility: string;
  toggle: () => void;
};

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters long").max(20),
  amount: z
    .string()
    .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
      message: "Amount must be a valid number greater than 0",
    })
    .transform((value) => Number(value)),
  details: z
    .string()
    .min(5, "Details must be at least 5 characters long")
    .max(400, "Details must be at most 400 characters long"),
});

const Description = ({ visibility, toggle }: DescriptionProps) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      details: "",
      amount: 0,
    },
  });

  const { setDescription } = useTransactionStore();

  const onSubmit = (data: {
    title: string;
    details: string;
    amount: number;
  }) => {
    setDescription(data);

    form.reset();
    toggle();
  };

  return (
    <div className={`h-[95%] w-full absolute z-20 ${visibility} bg-white p-3 `}>
      <div className="w-full flex  h-5 px-2">
        <X
          size={20}
          color="#000000"
          strokeWidth={2}
          className="hover:cursor-pointer hover:bg-gray-50"
          absoluteStrokeWidth
          onClick={toggle}
        />
        <h1 className="font-semibold mx-auto text-lg">Description</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mt-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <Label>Title</Label>
                <FormControl>
                  <Input placeholder="Add title" {...field} maxLength={10} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <Label>Amount</Label>
                <FormControl>
                  <Input placeholder="Add amount" {...field} maxLength={50} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <Label>Details</Label>
                <FormControl>
                  <Textarea
                    placeholder="Add Details"
                    {...field}
                    className="h-[15vh] resize-none "
                    maxLength={400}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Description;
