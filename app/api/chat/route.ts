import { createAgentUIStreamResponse, type UIMessage } from "ai";
import { tutorAgent } from "@/lib/ai/tutor-agent";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  const { has, userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!has?.({ plan: "ultra" })) {
    return new Response("Ultra membership required", { status: 403 });
  }

  let messages: UIMessage[];

  try {
    const body = await request.json();
    messages = body?.messages;

    // Debug: log what we actually received
    console.log("[/api/chat] body keys:", Object.keys(body ?? {}));
    console.log("[/api/chat] messages count:", messages?.length ?? "undefined");
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return new Response(
      JSON.stringify({ error: "messages must be a non-empty array" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  return createAgentUIStreamResponse({
    agent: tutorAgent,
    messages,
  });
}