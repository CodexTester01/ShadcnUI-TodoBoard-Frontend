"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

const timeSlots = [
  { time: "00:30", available: true },
  { time: "01:00", available: true },
  { time: "01:30", available: true },
  { time: "02:00", available: true },
  { time: "02:30", available: true },
  { time: "03:00", available: true },
  { time: "03:30", available: true },
  { time: "04:00", available: true },
  { time: "04:30", available: true },
  { time: "05:00", available: true },
  { time: "05:30", available: true },
  { time: "06:00", available: true },
  { time: "06:30", available: true },
  { time: "07:00", available: true },
  { time: "07:30", available: true },
  { time: "08:00", available: true },
  { time: "08:30", available: true },
  { time: "09:00", available: true },
  { time: "09:30", available: true },
  { time: "10:00", available: true },
  { time: "10:30", available: true },
  { time: "11:00", available: true },
  { time: "11:30", available: true },
  { time: "12:00", available: true },
  { time: "12:30", available: true },
  { time: "13:00", available: true },
  { time: "13:30", available: true },
  { time: "14:00", available: true },
  { time: "14:30", available: true },
  { time: "15:00", available: true },
  { time: "15:30", available: true },
  { time: "16:00", available: true },
  { time: "16:30", available: true },
  { time: "17:00", available: true },
  { time: "17:30", available: true },
  { time: "18:00", available: true },
  { time: "18:30", available: true },
  { time: "19:00", available: true },
  { time: "19:30", available: true },
  { time: "20:00", available: true },
  { time: "20:30", available: true },
  { time: "21:00", available: true },
  { time: "21:30", available: true },
  { time: "22:00", available: true },
  { time: "22:30", available: true },
  { time: "23:00", available: true },
  { time: "23:30", available: true },
];

interface DateTimePickerProps {
  date: Date | undefined;
  time: string | null;
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string | null) => void;
}

export function DateTimePicker({
  date,
  time,
  onDateChange,
  onTimeChange,
}: DateTimePickerProps) {
  const today = new Date();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={isMobile}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-xs justify-start text-left font-normal shadow-none"
          onClick={() => setOpen(true)}
        >
          <CalendarIcon className="mr-1 h-3 w-3" />
          {date ? (
            <span>
              {format(date, "PPP")}
              {time && ` at ${time}`}
            </span>
          ) : (
            <span>No date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-auto p-0",
          isMobile && "pb-1"
        )}
        align={isMobile ? "center" : "start"}
        side={isMobile ? "bottom" : undefined}
        avoidCollisions
        sideOffset={isMobile ? 5 : 4}
      >
        <div className="rounded-lg border">
          <div className="flex">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                onDateChange(newDate);
                if (!time && newDate) {
                  const now = new Date();
                  const hours = now.getHours();
                  const minutes = now.getMinutes() < 30 ? 30 : 0;
                  const nextHour = minutes === 0 ? hours + 1 : hours;
                  const timeString = `${String(nextHour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
                  onTimeChange(timeString);
                }
              }}
              className={cn(
                "p-2 pe-5",
                isMobile && "scale-[0.9] origin-left transform"
              )}
              disabled={[{ before: today }]}
              initialFocus
            />
            <div className={cn(
              "relative w-40 border-l border-border",
              isMobile && "w-32"
            )}>
              <div className="absolute inset-0 py-3">
                <ScrollArea className="h-full" type={isMobile ? "always" : "auto"}>
                  <div className="space-y-1">
                    <div className="flex h-5 shrink-0 items-center px-4">
                      <p className="text-sm font-medium">
                        {date ? format(date, "EEEE, d") : "Select a date"}
                      </p>
                    </div>
                    <div className="grid gap-1 px-3">
                      {timeSlots.map(({ time: timeSlot, available }) => {
                        let disabled = false;
                        if (
                          date &&
                          format(date, "yyyy-MM-dd") ===
                          format(today, "yyyy-MM-dd")
                        ) {
                          const [currentHour, currentMinute] = format(
                            today,
                            "HH:mm"
                          )
                            .split(":")
                            .map(Number);
                          const [slotHour, slotMinute] = timeSlot
                            .split(":")
                            .map(Number);
                          if (
                            slotHour < currentHour ||
                            (slotHour === currentHour &&
                              slotMinute < currentMinute)
                          ) {
                            disabled = true;
                          }
                        }
                        return (
                          <Button
                            key={timeSlot}
                            variant={time === timeSlot ? "default" : "outline"}
                            size="sm"
                            className={cn(
                              "w-full",
                              isMobile && "h-7 text-xs",
                              disabled && "opacity-50 cursor-not-allowed"
                            )}
                            onClick={() => {
                              onTimeChange(timeSlot);
                              if (isMobile) {
                                setTimeout(() => setOpen(false), 300);
                              }
                            }}
                            disabled={!available || disabled}
                          >
                            {timeSlot}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
