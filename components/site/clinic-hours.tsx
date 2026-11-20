import { clinic } from "@/lib/clinic";

// Consultation hours as a small timetable: days on the left, each time slot on its own
// line on the right, so they can be read at a glance.
export default function ClinicHours({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const muted = tone === "dark" ? "text-muted-ink" : "text-white/75";
  return (
    <table className={`border-collapse text-left tabular-nums ${className ?? ""}`}>
      <caption className="sr-only">Consultation hours</caption>
      <tbody>
        {clinic.hoursTable.map((row) => (
          <tr className="align-top" key={row.days}>
            <th className={`py-1 pr-5 font-normal whitespace-nowrap ${muted}`} scope="row">
              {row.days}
            </th>
            <td className="py-1 font-medium whitespace-nowrap">
              {row.times.map((t) => (
                <span className="block" key={t}>{t}</span>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
