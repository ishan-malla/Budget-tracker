import { TrendingUp, X } from "lucide-react";
import Currency from "@/components/Currency";
import { CalendarForm } from "@/components/SelectDate";
import { CalendarSync } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { SquareMenu } from "lucide-react";
import { useTransactionStore } from "@/store/store";
import Description from "./Description";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type TypeProps = {
  visibility: string;
  toggleType: () => void;
};

const formSchema = z.object({
  type: z.enum(["expense", "income", "investment"], {
    errorMap: () => ({ message: "Please select a transaction type." }),
  }),
  recurring: z.boolean(),
});

const Type = ({ visibility, toggleType }: TypeProps) => {
  const { transactionData, setTransactionType, setIsRecuring, isEditing } =
    useTransactionStore();
  const { description, date } = transactionData;

  const [descriptionVis, setDescpriptionVis] = useState(false);
  const descpVisibility = descriptionVis ? "" : "hidden";

  const toggleDesc = () => setDescpriptionVis((prev) => !prev);
  const [errorVisibility, setErrorVisbility] = useState<"hidden" | "">(
    "hidden"
  );

  console.log(transactionData);

  useEffect(() => {
    if (isEditing) {
      toggleType();
    }
  }, [isEditing]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "income",
      recurring: false,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!date || description.title === "") {
      setErrorVisbility("");
      return;
    }
    setTransactionType(data.type);
    setIsRecuring(data.recurring);
    reset();
    toggleType();
    setErrorVisbility("hidden");
  };

  return (
    <div
      className={`min-h-[49vh] overflow-x-auto h-auto border-2 min-w-[27vw] md:w-[30vw] flex flex-col p-4 rounded-sm ${visibility} absolute shadow-md shadow-gray-200 z-1 right-48 bg-white items-center rounded-xl border top-[4.6rem]`}
    >
      <Description visibility={descpVisibility} toggle={toggleDesc} />
      <div className="w-full flex">
        <X
          size={20}
          color="#000000"
          strokeWidth={2}
          className="hover:cursor-pointer hover:bg-gray-50"
          absoluteStrokeWidth
          onClick={toggleType}
        />
        <h1 className="font-semibold text-sm mx-auto">New Transaction</h1>
      </div>
      <h1 className="font-bold text-6xl flex mt-4 ">
        {description.amount} <Currency size="xl" />
      </h1>
      <CalendarForm />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-full flex flex-col items-center"
      >
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Tabs
              defaultValue={field.value}
              onValueChange={field.onChange}
              className="flex w-[95%] mt-1"
            >
              <TabsList className="w-full flex justify-between gap-1">
                <TabsTrigger
                  value="expense"
                  className="text-xs h-full w-[40%] flex gap-1"
                >
                  <ArrowDownLeft size={16} color="#ef4444" strokeWidth={3} />
                  Expense
                </TabsTrigger>
                <TabsTrigger
                  value="income"
                  className="text-xs h-full w-[40%] flex gap-1"
                >
                  <ArrowUpRight size={16} color="#22c55e" strokeWidth={3} />
                  Income
                </TabsTrigger>
                <TabsTrigger
                  value="investment"
                  className="text-xs h-full w-[40%] flex gap-1"
                >
                  <TrendingUp size={16} color="#6d28d9" strokeWidth={3} />
                  Investment
                </TabsTrigger>
              </TabsList>
            </Tabs>
          )}
        />
        {errors.type && (
          <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
        )}
        <Button
          className="text-xs bg-gray-50 text-gray-500 w-[95%] mt-2 justify-between px-4 hover:bg-[#f5f5f5] hover:text-gray-800"
          variant={"outline"}
          onClick={toggleDesc}
          type="button"
        >
          Description <SquareMenu size={18} strokeWidth={2} />
        </Button>
        <div className="flex p-4 mt-1">
          <div className="pl-4 text-sm font-semibold p-1 flex-grow">
            <p className="flex gap-2">
              <CalendarSync size={16} color="#000000" />
              Add as recurring
            </p>
            <p className="text-xs text-gray-500 font-medium pl-6">
              This transaction will be added again the following months at the
              same day as today.
            </p>
          </div>
          <Controller
            name="recurring"
            control={control}
            render={({ field }) => (
              <Switch
                className="data-[state=checked]:bg-green-600 w-9"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>
        {errors.recurring && (
          <p className="text-red-500 text-xs mt-1">
            {errors.recurring.message}
          </p>
        )}
        <div
          className={`text-red-500 font-semibold text-sm ${errorVisibility}`}
        >
          Please fill description and date
        </div>
        <Button type="submit" className="w-full text-xs rounded-full mt-2">
          Add Transaction
        </Button>
      </form>
    </div>
  );
};

export default Type;
