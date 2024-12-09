import { test, expect } from "@playwright/test";

// 1. GET request
test("GET /posts - array length > 0", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  expect(response.status()).toBe(200);

  const data = await response.json();
  expect(Array.isArray(data)).toBeTruthy();
  expect(data.length).toBeGreaterThan(0);
});

// 2. GET request with parameter
test("GET /comments?postId={parameter} - array length > 0", async ({
  request,
}) => {
  const parameter = 1;
  const response = await request.get(
    `https://jsonplaceholder.typicode.com/comments?postId=${parameter}`
  );
  expect(response.status()).toBe(200);

  const data = await response.json();
  expect(Array.isArray(data)).toBeTruthy();
  expect(data.length).toBeGreaterThan(0);
});

test("GET /comments?postId={parameter} - all elements have postId = {parameter}", async ({
  request,
}) => {
  const parameter = 1;
  const response = await request.get(
    `https://jsonplaceholder.typicode.com/comments?postId=${parameter}`
  );
  expect(response.status()).toBe(200);

  const data = await response.json();
  for (const comment of data) {
    expect(comment.postId).toBe(parameter);
  }
});

// 3. POST request
test("POST /posts - verify created object", async ({ request }) => {
  const body = {
    title: "test title",
    body: "test body",
    userId: 1,
  };

  const response = await request.post(
    "https://jsonplaceholder.typicode.com/posts",
    { data: body }
  );
  expect(response.status()).toBe(201);

  const data = await response.json();
  expect(data).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      ...body,
    })
  );
});

// 4. GraphQL request
test('GraphQL /graphql - verify episodes with substring "Rick" (case insensitive)', async ({
  request,
}) => {
  const query = `
      query {
        episodes {
          results {
            name
          }
        }
      }
    `;

  const response = await request.post("https://rickandmortyapi.com/graphql", {
    data: { query },
  });

  expect(response.status()).toBe(200);

  const { data } = await response.json();
  const episodes = data.episodes.results;

  const filteredEpisodes = episodes.filter((episode) =>
    episode.name.toLowerCase().includes("rick")
  );

  expect(filteredEpisodes.length).toBeGreaterThan(0);

  filteredEpisodes.forEach((episode) => {
    expect(episode.name.toLowerCase()).toContain("rick");
  });
});
