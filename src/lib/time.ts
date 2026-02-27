/** Format "HH:MM" time string to "H:MM AM/PM" */
export function formatTime(time: string): string {
  const [h, m] = time.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${display}:${m} ${ampm}`;
}

/** Calculate total price from time range and hourly rate */
export function calculateSlotPrice(
  startTime: string,
  endTime: string,
  pricePerHour: number,
): number {
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  const durationHours = (eh * 60 + em - (sh * 60 + sm)) / 60;
  return Math.round(pricePerHour * durationHours);
}
