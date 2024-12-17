import { TrendingUp, X } from "lucide-react";
import Currency from "@/components/Currency";
import { CalendarForm } from "@/components/SelectDate";
import { CalendarSync } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { SquareMenu } from "lucide-react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import {
//   Form,
//   //   FormControl,
//   //   FormDescription,
//   //   FormField,
//   //   FormItem,
//   //   FormLabel,
//   //   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// });

// import { useNavigate } from "react-router";
import Description from "./Description";
import { useState } from "react";
// import { useTransactionStore } from "@/store/store";
// import { Popover } from "@/components/ui/popover";
type TypeProps = {
  visibility: string;
  toggleType: () => void;
};

const Type = ({ visibility, toggleType }: TypeProps) => {
  // const { setCategory, setDate } = useTransactionStore();
  // const navigate = useNavigate();
  const [descriptionVis, setDescpriptionVis] = useState(false);

  const descpVisbilility = descriptionVis ? "" : "hidden";

  const toggleDesp = () => setDescpriptionVis((prevState) => !prevState);
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     username: "",
  //   },
  // });

  // const onSubmit = (values: z.infer<typeof formSchema>) => {
  //   console.log(values);
  // };

  // const onSubmit = (data: {
  //   title: string;
  //   details: string;
  //   amount: number;
  // }) => {
  //   console.log("Form submitted:", data);

  // };

  return (
    <div
      className={`min-h-[50vh] overflow-x-auto h-auto border-2 min-w-[26vw] md:w-[26vw] flex flex-col  p-4 rounded-sm   ${visibility} absolute shadow-md shadow-gray-200  z-5 right-48  bg-white items-center rounded-xl border top-[4.6rem]  `}
    >
      {/* <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full h-full flex flex-col items-center"
        > */}
      <Description
        visibility={descpVisbilility}
        toggle={toggleDesp}
      ></Description>
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
      <h1 className="font-bold text-6xl flex  mt-4 ">
        17.99 <Currency></Currency>
      </h1>
      <CalendarForm></CalendarForm>
      <Tabs defaultValue="Expense" className="flex  w-[95%] mt-1">
        <TabsList className=" w-full  flex justify-between gap-1 ">
          <TabsTrigger
            value="Expense"
            className="text-xs h-full w-[40%] flex gap-1 "
          >
            <ArrowDownLeft size={16} color="#ef4444" strokeWidth={3} />
            Expense
          </TabsTrigger>
          <TabsTrigger
            value="Income "
            className="text-xs  -full w-[40%] flex gap-1 "
          >
            <ArrowUpRight size={16} color="#22c55e" strokeWidth={3} />
            Income
          </TabsTrigger>
          <TabsTrigger
            value="Investment"
            className="text-xs  h-full w-[40%] flex gap-1  "
          >
            <TrendingUp size={16} color="#6d28d9 " strokeWidth={3} />
            Investment
          </TabsTrigger>
        </TabsList>
      </Tabs>
      Make a state for description make it a boolean and send it to the store
      and validate in this component
      <Button
        className="text-xs bg-gray-50  text-gray-500 w-[95%] mt-2 justify-between px-4 hover:bg-[#f5f5f5] hover:text-gray-800"
        variant={"outline"}
        onClick={toggleDesp}
      >
        Description <SquareMenu size={18} strokeWidth={2} />
      </Button>
      <div className="flex p-4 mt-1">
        <div className=" pl-4  text-sm font-semibold p-1 flex-grow">
          <p className="flex gap-2">
            <CalendarSync size={16} color="#000000" />
            Add as recuring
          </p>
          <p className="text-xs text-gray-500 font-medium pl-6">
            This transaction will be added again the following months at the
            same day as today
          </p>
        </div>
        <Switch className=" data-[state=checked]:bg-green-600 w-9 "></Switch>
      </div>
      <Button type="submit" className="w-full text-xs rounded-full mt-2 ">
        Add Transaction
      </Button>
      {/* </form>
      </Form> */}
    </div>
  );
};
export default Type;

//types
//icome ||expense || investment
//add amount

//make a setter function in zustand for all and icons to and combine them after the button on clicked
