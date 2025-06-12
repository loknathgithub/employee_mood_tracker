'use client';

import React, { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import Link from 'next/link';

export default function MoodPage() {
  const [name, setName] = useState<string>('');
  const [mood, setMood] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const moods = [
    { label: 'Happy', value: '\u{1F601}', icon: '\u{1F601}' },
    { label: 'Neutral', value: '\u{1F642}', icon: '\u{1F642}' },
    { label: 'Sad', value: '\u{1F61E}', icon: '\u{1F61E}' },
  ];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setSuccess(false);

    console.log(mood, comment, name)

    try {
      const res = await fetch('/api/mood', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, mood, comment}),
      });
      if (res.ok) {
        setSuccess(true);
        setName('');
        setMood('');
        setComment('');
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false);
    }
  }

  return (

    <div>
        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                    Tell us, How are you feeling today?
                </CardTitle>
                </CardHeader>

                {/* form */}
                <form onSubmit={handleSubmit}>
                <CardContent>

                    <div>
                      <input type="text" placeholder='Your name' value={name} onChange={e => setName(e.target.value) }
                      className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2" required/>
                    </div>
                    <div className="flex justify-between mb-6">
                    {moods.map((m) => (
                        <button
                        type="button"
                        key={m.value}
                        className={`flex flex-col items-center px-4 py-2 rounded-lg border-2 
                        ${mood === m.value ? 'border-indigo-600 bg-indigo-50': 'border-gray-200'} transition`}
                        onClick={() => {
                          setMood(m.value);
                          }}>
                        <span className="text-3xl">{m.icon}</span>
                        <span className="mt-2 text-sm">{m.label}</span>
                        </button>))}
                    </div>


                    <textarea
                    className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2"
                    rows={3} placeholder="Add a comment (optional)" value={comment} onChange={ e => setComment(e.target.value)}/>
                </CardContent>

                
                <CardFooter className="flex flex-col gap-2">
                    <Button type="submit" className="w-full" disabled={isLoading || !mood}>
                    {isLoading ? 'Submitting...' : 'Submit Mood'}
                    </Button>
                    {success && (
                    <div className="text-green-600 text-center mt-2">
                        Mood submitted successfully!
                    </div>
                    )}
                <div className="flex justify-center gap-4 mt-4">
                  <Button className="w-24">
                    <Link href="../admin">Dashboard</Link>
                  </Button>
                  <Button className="w-24" asChild>
                    <Link href="../">Home</Link>
                  </Button>
                </div>

                </CardFooter>
                </form>
            </Card>
            </main>
              
    </div>
  
);
}
