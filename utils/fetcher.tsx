export const fetcher = (url: string, data: any) =>
  fetch(window.location.origin + url, {
    method: data ? 'POST' : 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'applicaition/json',
    },
    body: JSON.stringify(data),
  }).then((r) => {
    return r.json()
  })