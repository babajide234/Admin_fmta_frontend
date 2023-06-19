// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "../../ui/cn";
import { Button } from "../../ui/button";
import { Calendar } from "../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";

export function DatePicker() {
  const [date, setDate] = useState();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={""}
          className={cn(
            "justify-start text-left font-normal h-8 py-2",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0 dropdown-container">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          captionLayout="dropdown"
          fromYear={1960}
          toYear={2100}
        />
      </PopoverContent>
    </Popover>
  );
}
