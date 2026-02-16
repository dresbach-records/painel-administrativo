
// DEPRECATED: AI direct calls from frontend are forbidden for production security.
// Use auditService.analyze() which proxies requests via TechLabs Backend.

export async function getBriefingAdvice() {
  throw new Error("Direct_AI_Call_Blocked: Use Backend Proxy.");
}

export async function analyzeProject() {
  throw new Error("Direct_AI_Call_Blocked: Use Backend Proxy.");
}
