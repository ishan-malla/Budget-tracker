import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import useSetValue from "@/hooks/useSetValue";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { useTransactionStore } from "@/store/store";
import { Toaster } from "./ui/toaster";
import useResetForms from "@/hooks/ResetForms";

const FormSchema = z.object({
  date: z.date({
    required_error: "Pick a date",
  }),
});

export function CalendarForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const { setDate, transactionData } = useTransactionStore();
  const { setValue, reset } = form;

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setValue("date", date);
      setDate(date);
      toast({
        title: "Date Selected",
        description: format(date, "PPP"),
        duration: 1500,
      });
    }
  };

  useResetForms(reset);

  useSetValue<Date>({
    name: "date",
    value: new Date(transactionData.date),
    setValue,
  });
  return (
    <>
      <Toaster />
      <Form {...form}>
        <form className="w-full mt-5 flex items-center justify-center p-1">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex p-2 w-full">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full bg-gray-50 pl-3 text-left font-medium text-xs",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Add Date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-3" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={handleDateSelect}
                      disabled={(date) =>
                        date > new Date() || date < new Date("2000-01-01")
                      }
                      initialFocus
                    />
                    <Button
                      className="w-[90%] ml-[0.88rem] rounded-full hover:bg-gray-50 text-xs"
                      variant={"outline"}
                      onClick={() => {
                        const today = new Date();
                        handleDateSelect(today);
                      }}
                    >
                      Select Today
                    </Button>
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-xs text-center" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
}
