"use client";

import { useState, useMemo } from "react";
import type { Availability } from "@/types/database";

interface Props {
  readonly slots: readonly Availability[];
  readonly pricePerHour: number;
  readonly onSelectSlot: (slot: Availability) => void;
  readonly selectedSlotId?: string;
}

function getDaysInRange(start: Date, days: number): readonly Date[] {
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return d;
  });
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function formatDayLabel(date: Date): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.getTime() === today.getTime()) return "Today";
  if (date.getTime() === tomorrow.getTime()) return "Tomorrow";

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatTime(time: string): string {
  const [h, m] = time.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${display}:${m} ${ampm}`;
}

function calculateSlotPrice(
  startTime: string,
  endTime: string,
  pricePerHour: number,
): number {
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  const durationHours = (eh * 60 + em - (sh * 60 + sm)) / 60;
  return Math.round(pricePerHour * durationHours);
}

export function AvailabilityCalendar({
  slots,
  pricePerHour,
  onSelectSlot,
  selectedSlotId,
}: Props) {
  const [weekOffset, setWeekOffset] = useState(0);

  const startDate = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + weekOffset * 7);
    return d;
  }, [weekOffset]);

  const days = useMemo(() => getDaysInRange(startDate, 7), [startDate]);

  const slotsByDate = useMemo(() => {
    const map = new Map<string, Availability[]>();
    for (const slot of slots) {
      const existing = map.get(slot.date) ?? [];
      map.set(slot.date, [...existing, slot]);
    }
    // Sort each day's slots by start time
    for (const [key, daySlots] of map) {
      map.set(
        key,
        [...daySlots].sort((a, b) =>
          a.start_time.localeCompare(b.start_time),
        ),
      );
    }
    return map;
  }, [slots]);

  return (
    <div className="rounded-2xl border border-white/5 bg-mountain-800/50 p-5">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setWeekOffset((w) => Math.max(0, w - 1))}
          disabled={weekOffset === 0}
          className="rounded-lg p-2 text-snow-300 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous week"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <h3 className="font-display text-lg font-semibold">
          {startDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h3>

        <button
          onClick={() => setWeekOffset((w) => Math.min(4, w + 1))}
          disabled={weekOffset >= 4}
          className="rounded-lg p-2 text-snow-300 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Next week"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      {/* Day columns */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const dateStr = formatDate(day);
          const daySlots = slotsByDate.get(dateStr) ?? [];
          const isToday = formatDate(new Date()) === dateStr;

          return (
            <div key={dateStr} className="min-w-0">
              {/* Day header */}
              <div
                className={`mb-2 text-center rounded-lg py-1.5 ${
                  isToday
                    ? "bg-ice/10 text-ice"
                    : "text-snow-300"
                }`}
              >
                <p className="text-[10px] font-medium uppercase">
                  {day.toLocaleDateString("en-US", { weekday: "short" })}
                </p>
                <p className="text-sm font-bold">
                  {day.getDate()}
                </p>
              </div>

              {/* Time slots */}
              <div className="space-y-1.5">
                {daySlots.length > 0 ? (
                  daySlots.map((slot) => {
                    const isSelected = slot.id === selectedSlotId;
                    const price = calculateSlotPrice(
                      slot.start_time,
                      slot.end_time,
                      pricePerHour,
                    );

                    return (
                      <button
                        key={slot.id}
                        onClick={() => onSelectSlot(slot)}
                        className={`w-full rounded-lg px-1.5 py-2 text-center transition-all ${
                          isSelected
                            ? "bg-ice text-mountain ring-2 ring-ice"
                            : "bg-white/5 text-snow-300 hover:bg-ice/10 hover:text-ice"
                        }`}
                      >
                        <p className="text-[11px] font-medium leading-tight">
                          {formatTime(slot.start_time)}
                        </p>
                        <p className="text-[9px] opacity-70 mt-0.5">
                          {(price / 1000).toFixed(0)}k AMD
                        </p>
                      </button>
                    );
                  })
                ) : (
                  <div className="py-3 text-center">
                    <p className="text-[10px] text-mountain-600">—</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-4 text-[11px] text-mountain-600">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded bg-white/5" />
          Available
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded bg-ice" />
          Selected
        </div>
      </div>
    </div>
  );
}
