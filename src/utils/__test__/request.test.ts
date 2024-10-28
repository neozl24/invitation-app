import { requestInvitation } from '../request'

describe('requestInvitation', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('should send a POST request and return the response', async () => {
    window.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValueOnce('Registered'),
    })

    const result = await requestInvitation('Tom Cruise', 'tom@example.com')

    const url = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth'

    expect(fetch).toHaveBeenCalledWith(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'Tom Cruise', email: 'tom@example.com' }),
    })
    expect(result).toEqual('Registered')
  })

  test('should throw an error when the response is not ok', async () => {
    const errorMessage = 'Bad Request: Email is already in use'

    window.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      json: vi.fn().mockResolvedValueOnce({ errorMessage }),
    })

    const requestPromise = requestInvitation('Tom Cruise', 'usedemail@example.com')
    await expect(requestPromise).rejects.toThrow(errorMessage)
  })

  test('should throw a default error message when no error message is provided', async () => {
    window.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      json: vi.fn().mockResolvedValueOnce({}),
    })

    const requestPromise = requestInvitation('Tom Cruise', 'usedemail@example.com')
    await expect(requestPromise).rejects.toThrow('Error: 500 Internal Server Error')
  })
})
