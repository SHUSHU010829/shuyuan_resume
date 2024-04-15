// Set a variable that contains all the fields needed for articles when a fetch for
// content is performed
const ARTICLE_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  description
  tag
  link
  image {
    url
  }
`;

async function fetchGraphQL(query: string, preview = false) {
  return fetch(
   `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ["projects"] },
    }
  ).then((response) => response.json());
}

function extractArticleEntries(fetchResponse: { data: { knowledgeArticleCollection: { items: any; }; }; }) {
  return fetchResponse?.data?.knowledgeArticleCollection?.items;
}

export async function getAllProjects(
  isDraftMode = false
) {
  const articles = await fetchGraphQL(
    `query {
        projectCollection(where:{link_exists: true}, order: title_DESC, preview: ${
      isDraftMode ? "true" : "false"
    }) {
          items {
            ${ARTICLE_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode
  );
  return articles;
}