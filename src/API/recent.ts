import axiosInstance from "@/config/axios";

export async function fetchRecentQueries(): Promise<string[]> {
  try {
    const response = await axiosInstance.get("/recent-queries");
    return response.data.queries || [];
  } catch (error) {
    console.error("Failed to fetch recent queries:", error);
    return [];
  }
}
