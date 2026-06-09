export function loader() {
  return Response.json({ status: "ok", service: "seqgen", timestamp: new Date().toISOString() }, {
    headers: { "Cache-Control": "no-store" },
  });
}
