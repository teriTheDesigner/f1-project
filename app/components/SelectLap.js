import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export function SelectLap({ sessionKey }) {
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    if (sessionKey) {
      fetch(`https://api.openf1.org/v1/laps?session_key=${sessionKey}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Session data in Lap component", data);

          // Extract lap numbers and filter out duplicates
          const uniqueLaps = [...new Set(data.map((lap) => lap.lap_number))];
          console.log("Unique lap numbers:", uniqueLaps);

          setLaps(uniqueLaps);
        })
        .catch((error) => console.error("Error fetching session data:", error));
    }
  }, [sessionKey]);

  return (
    <Select onValueChange={(value) => console.log("Selected lap:", value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a lap" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Lap Numbers</SelectLabel>
          {laps.map((lap) => (
            <SelectItem key={lap} value={lap.toString()}>
              Lap {lap}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
