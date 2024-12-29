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

const AddNewCategory = ({
  visibility,
  toggleVisibility,
}: AddNewCategoryProps) => {
  const formSchema = z.object({
    categoryGroup: z
      .string()
      .min(2, "Group name must be at least 2 characters long")
      .max(20, "Group name must be less than 20 characters"),
    categoryName: z
      .string()
      .min(1, "Category name cannot be empty")
      .max(50, "Category name must be less than 50 characters"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryGroup: "",
      categoryName: "",
    },
  });

  const onSubmit = (data: { categoryGroup: string; categoryName: string }) => {
    setCategory(data);
    form.reset();
    toggleVisibility();
  };

  const { setCategory } = useTransactionStore();
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
            name="categoryGroup"
            render={({ field }) => (
              <FormItem>
                <Label>Group Name</Label>
                <FormControl>
                  <Input
                    placeholder="E.g., Household, Leisure"
                    {...field}
                    maxLength={20}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryName"
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
