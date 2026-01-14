"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const router = useRouter();

  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Load current system instructions
  useEffect(() => {
    fetch("/api/instructions")
      .then((res) => res.json())
      .then((data) => {
        // supports { content } or { instructions }
        setInstructions(data.content || data.instructions || "");
      });
  }, []);

  const saveInstructions = async () => {
    setLoading(true);
    setSaved(false);

    await fetch("/api/instructions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ instructions }),
    });

    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  return (
    <main className="mx-auto max-w-4xl p-10 space-y-10 bg-zinc-900 text-zinc-100 min-h-screen">
      
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Control Panel</h1>
          <p className="text-gray-500 mt-1">
            Internal tools for configuring AI behavior and knowledge.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
        >
          Logout
        </button>
      </header>

      {/* SYSTEM PROMPT SECTION */}
      <section className="rounded-xl border border-zinc-700 bg-zinc-800 shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="font-medium">AI System Instructions</h2>
          <p className="text-sm text-gray-500">
            These rules are injected into every AI request.
          </p>
        </div>

        <div className="p-6">
          <textarea
            className="w-full min-h-[260px] rounded-lg border border-zinc-700 bg-zinc-900 p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="You are a highly accurate AI assistant..."
          />

          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Changes apply instantly platform-wide
            </span>

            <button
              onClick={saveInstructions}
              disabled={loading}
              className="rounded-lg bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white transition"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {saved && (
            <p className="mt-3 text-sm text-green-500">
              ✓ Instructions updated successfully
            </p>
          )}
        </div>
      </section>

      {/* DIVIDER */}
      <hr className="my-8 border-zinc-700" />

      {/* PDF UPLOAD SECTION */}
      <section className="rounded-xl border border-zinc-700 bg-zinc-900 shadow-sm p-6">
        <h2 className="mb-2 font-medium text-zinc-100">
          Upload Knowledge (PDF)
        </h2>
        <p className="mb-4 text-sm text-zinc-400">
          Upload PRDs, specs, or internal docs to ground the AI with
          organization-specific knowledge.
        </p>

        <input
          type="file"
          accept="application/pdf"
          className="block w-full cursor-pointer rounded-md
            bg-zinc-800 text-zinc-200
            file:mr-4 file:rounded-md file:border-0
            file:bg-indigo-600 file:px-4 file:py-2
            file:text-sm file:font-medium file:text-white
            hover:file:bg-indigo-500"
          onChange={async (e) => {
            if (!e.target.files?.[0]) return;

            const form = new FormData();
            form.append("file", e.target.files[0]);

            setUploading(true);

            await fetch("/api/upload", {
              method: "POST",
              body: form,
            });

            setUploading(false);
            alert("PDF indexed successfully ✅");
          }}
        />

        {uploading && (
          <p className="mt-3 text-sm text-gray-400">
            Indexing PDF… generating embeddings
          </p>
        )}
      </section>
    </main>
  );
}
