import type { ProblemSolverResponse } from "../../interfaces";

export const problemsolverUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/problem-solver`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    if (!resp.ok) throw new Error("Error al procesar la solicitud");

    const data = (await resp.json()) as ProblemSolverResponse;
    return {
      ...data,
    };
  } catch (error) {
    return {
      message: "Error al procesar la solicitud",
    };
  }
};
