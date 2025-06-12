import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  
  return (
    <div >
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      
      <h1 className="text-3xl font-bold mb-2 text-center">
        Welcome to Employee Mood Tracker</h1>
      <h2 className="text-2xl font-semibold mb-4">
        Share your mood now!</h2>

      <Button className="mx-auto block mt-4" asChild>
        <Link href="../mood">Submit Your Mood</Link>
      </Button>
    </main>
    </div>
    
  );
}