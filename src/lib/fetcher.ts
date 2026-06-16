export async function fetcher<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      credentials: "include",
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data?.message || "Failed to fetch data");
    }
  
    return data;
  }