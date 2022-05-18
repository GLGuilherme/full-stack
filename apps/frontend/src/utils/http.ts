export async function http(
  url: string,
  config?: { method: string; body: any }
) {
  return fetch(`${process.env.REACT_APP_API_URL}/${url}`, {
    method: config?.method || "GET",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(config?.body) || undefined,
  }).then(async (response) => {
    if (response.status === 401) {
      return Promise.reject({
        message: "Unauthorized",
      });
    }

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}
