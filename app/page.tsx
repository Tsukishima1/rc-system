import { ModeToggle } from "@/components/modal/model-toggle";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-24 h-screen">
      <div>
        hello nextjs
        <ModeToggle />
      </div>
    </main>
  );
}
