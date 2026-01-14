import ChatBox from "@/components/ChatBox";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 justify-center bg-gray-50 dark:bg-black">
        <div className="w-full max-w-3xl border-x bg-white dark:bg-gray-900">
          <ChatBox />
        </div>
      </main>
    </div>
  );
}
