export default async function fetchData<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Erro: ' + response.status);
    const json = await response.json();
    return json;
  } catch (err) {
    if (err instanceof Error) console.error('fetchData: ' + err.message);
    return null;
  }
}
