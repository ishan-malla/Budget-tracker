import { Input } from "@/components/ui/input";
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

type AddNewCategoryProps = {
  visibility: string;
  toggleVisibility: () => void;
};

const formSchema = z.object({
  category: z
    .string()
    .min(1, "Category name cannot be empty")
    .max(50, "Category name must be less than 50 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const AddNewCategory = ({
  visibility,
  toggleVisibility,
}: AddNewCategoryProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
    },
  });

  const { addCategory } = useTransactionStore();

  const onSubmit = (data: FormValues) => {
    addCategory(data.category);
    form.reset();
    toggleVisibility();
  };

  return (
    <div
      className={`w-[25vw] h-full absolute z-20 bg-white ${visibility} p-2 top-0 shadow-md`}
    >
      <div className="w-2/3 flex justify-between items-center mb-4">
        <X
          size={20}
          color="#000000"
          strokeWidth={2}
          className="hover:cursor-pointer hover:bg-gray-50"
          onClick={toggleVisibility}
        />
        <h1 className="font-semibold text-sm">Add New Category</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <Label>Category Name</Label>
                <FormControl>
                  <Input
                    placeholder="e.g., Groceries, Netflix"
                    {...field}
                    maxLength={50}
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

export default AddNewCategory;
