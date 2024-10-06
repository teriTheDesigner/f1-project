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

export function SelectDriver1({ sessionKey, onSelectDriver }) {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetch(`https://api.openf1.org/v1/drivers?session_key=${sessionKey}`)
      .then((response) => response.json())
      .then((data) => {
        setDrivers(data);
      })
      .catch((error) => console.error("Error fetching driver data:", error));
  }, []);

  const groupDriversByTeam = () => {
    return drivers.reduce((groups, driver) => {
      const team = driver.team_name;
      if (!groups[team]) {
        groups[team] = [];
      }
      groups[team].push(driver);
      return groups;
    }, {});
  };

  // Camel Case Conversion function
  function toCamelCase(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  // Apply Camel Case to the driver names
  function convertDriverNamesToCamelCase(groupedDrivers) {
    Object.keys(groupedDrivers).forEach((team) => {
      groupedDrivers[team].forEach((driver) => {
        driver.first_name = toCamelCase(driver.first_name);
        driver.last_name = toCamelCase(driver.last_name);
        driver.full_name = `${driver.first_name} ${driver.last_name}`;
      });
    });

    return groupedDrivers;
  }

  // Group drivers by team and apply Camel Case conversion
  const groupedDrivers = groupDriversByTeam();
  const updatedDrivers = convertDriverNamesToCamelCase(groupedDrivers);

  return (
    <Select onValueChange={(value) => onSelectDriver(value)}>
      {" "}
      {/* This line passes the selected driver */}
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select driver 1" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(updatedDrivers).map((team) => (
          <SelectGroup key={team}>
            <SelectLabel className="titillium-web">{team}</SelectLabel>
            {updatedDrivers[team].map((driver) => (
              <SelectItem
                className="titillium-web cursor-pointer"
                key={driver.driver_number}
                value={driver.driver_number}
              >
                {driver.full_name}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
