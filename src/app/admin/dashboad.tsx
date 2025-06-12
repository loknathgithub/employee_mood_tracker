'use client'

import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MoodEntry } from "../utils/mood";

export default function AdminPage() {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch("/api/mood")
        .then((res) => res.json())
        .then((data) => {
          setMoods(data);
          setLoading(false);
        });
    }, []);

    return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Mood Submissions</h1>
        {loading ? (
          <div className="text-2xl font-semibold m-6 p-6 w-full text-center bg-white rounded-lg shadow-sm">Loading...</div>
        ) : (
          <Table className="text-2xs font-semibold mb-6 w-full text-center bg-white rounded-lg shadow-sm"> 
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Mood</TableHead>
                <TableHead className="text-center">Comment</TableHead>
                <TableHead className="text-center">Submitted at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {moods.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No mood submissions yet....
                  </TableCell> 
                </TableRow>
              ) : (
                moods.map((entry, idx) => (
                  <TableRow key={idx} className="text-2xs font-normal">                    
                    <TableCell>{entry.name}</TableCell>
                    <TableCell className="text-xl">{entry.mood}</TableCell>
                    <TableCell>{entry.comment || "No Comments"}</TableCell>
                    <TableCell>
                      {new Date(entry.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}

        <div className="flex justify-center gap-4 mt-4">
          <Button className="w-24">
            <Link href="../mood">Add Mood</Link>
          </Button>
          <Button className="w-24" asChild>
            <Link href="../">Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}