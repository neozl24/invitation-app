export const requestInvitation = async <T>(name: string, email: string) => {
  const url = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth'
  const data = {
    name,
    email
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await response.json()

  if (!response.ok) {
    const defaultMessage = `Error: ${response.status} ${response.statusText}`
    throw new Error(result?.errorMessage || defaultMessage)
  }
  return result as T
}
