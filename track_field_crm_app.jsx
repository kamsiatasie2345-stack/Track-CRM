import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { motion } from "framer-motion";

const events = [
  "100m", "200m", "400m", "800m", "1600m",
  "Long Jump", "Triple Jump", "High Jump"
];

export default function TrackFieldCRM() {
  const [athletes, setAthletes] = useState([]);
  const [name, setName] = useState("");
  const [event, setEvent] = useState("100m");
  const [performance, setPerformance] = useState("");
  const [search, setSearch] = useState("");

  const addAthlete = () => {
    if (!name || !performance) return;

    const newEntry = {
      id: Date.now(),
      name,
      event,
      performance,
      history: [{ event, performance, date: new Date().toLocaleDateString() }]
    };

    setAthletes([...athletes, newEntry]);
    setName("");
    setPerformance("");
  };

  const updatePerformance = (id, newPerformance) => {
    setAthletes(
      athletes.map((athlete) =>
        athlete.id === id
          ? {
              ...athlete,
              performance: newPerformance,
              history: [
                ...athlete.history,
                { event: athlete.event, performance: newPerformance, date: new Date().toLocaleDateString() }
              ]
            }
          : athlete
      )
    );
  };

  const filteredAthletes = athletes.filter((athlete) =>
    athlete.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 grid gap-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold"
      >
        Track & Field CRM Dashboard
      </motion.h1>

      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-4 grid gap-4">
          <h2 className="text-xl font-semibold">Add Athlete Performance</h2>
          <Input
            placeholder="Athlete Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Select onValueChange={setEvent} defaultValue="100m">
            <SelectTrigger>
              <SelectValue placeholder="Select Event" />
            </SelectTrigger>
            <SelectContent>
              {events.map((evt) => (
                <SelectItem key={evt} value={evt}>{evt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Performance (e.g. 10.75 or 6.45m)"
            value={performance}
            onChange={(e) => setPerformance(e.target.value)}
          />
          <Button onClick={addAthlete}>Add Athlete</Button>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-4 grid gap-4">
          <h2 className="text-xl font-semibold">Search Athlete</h2>
          <Input
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredAthletes.map((athlete) => (
          <Card key={athlete.id} className="rounded-2xl shadow-md">
            <CardContent className="p-4 grid gap-2">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">{athlete.name}</h3>
                  <p className="text-sm">Event: {athlete.event}</p>
                  <p className="text-sm">Current Performance: {athlete.performance}</p>
                </div>
                <Input
                  placeholder="Update performance"
                  onBlur={(e) => updatePerformance(athlete.id, e.target.value)}
                />
              </div>

              <div>
                <h4 className="font-semibold text-sm">Performance History:</h4>
                <ul className="text-sm list-disc ml-4">
                  {athlete.history.map((record, index) => (
                    <li key={index}>
                      {record.date} - {record.event}: {record.performance}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
