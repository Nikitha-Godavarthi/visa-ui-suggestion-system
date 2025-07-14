import axiosInstance from "@/config/axios";

export async function fetchSuggestions(prompt: string) {
  const response = await axiosInstance.post("/suggest", { prompt });
  return response.data;
}
