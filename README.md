# n8n-nodes-google-scholar-api

An [n8n](https://n8n.io/) community node that searches Google Scholar and returns structured academic papers: title, publication info, snippet, and link. It is backed by the [Google Scholar API](https://apify.com/johnvc/google-scholar-api?fpr=9n7kx3) on [Apify](https://apify.com?fpr=9n7kx3) and bills per result, so there are no subscriptions and no minimums.

[Installation](#installation) · [Credentials](#credentials) · [Operations](#operations) · [Output](#output) · [Example workflows](#example-workflows) · [Pricing](#pricing) · [Resources](#resources)

## What it does

Give the node a query, and it returns one item per paper with the title, publication info, snippet, link, and result identifier. It also works as an **AI Agent tool**, so an agent can run literature searches on demand.

- Search scholarly papers by query
- Filter by publication year range
- Page through results and control how many to return
- Choose how much data to return per paper: Simplified, Raw, or Selected Fields

## Installation

Follow the n8n [community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/):

1. In n8n, open **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-google-scholar-api` as the npm package name.
4. Agree to the risks of using community nodes, then select **Install**.

After it installs, the **Google Scholar** node appears in the nodes panel.

> n8n Cloud only allows verified community nodes. Until this node is verified, install it on a self-hosted n8n instance.

## Credentials

You need a free [Apify account](https://apify.com?fpr=9n7kx3) and an API token.

1. Sign in to the [Apify Console](https://console.apify.com?fpr=9n7kx3).
2. Open **Settings > Integrations** and copy your **Personal API token**.
3. In n8n, create a new **Apify API** credential and paste the token.
4. Use the credential's **Test** button to confirm it works.

The node also supports **Apify OAuth2** if you prefer to connect that way.

## Operations

**Paper > Search** returns scholarly papers that match a query.

| Parameter | Description |
| --- | --- |
| Search Query | The query to search papers for. Required. |
| Language Code | Two-letter language code for the results. Defaults to `en`. |
| Year From / Year To | Restrict by publication year. `0` for no limit. |
| Number of Results | Results per page. `0` for the Actor default. |
| Maximum Pages | How many result pages to fetch. |
| Output | How much data to return: Simplified, Raw, or Selected Fields. |

## Output

Each paper is returned as its own n8n item. The **Output** parameter lets you choose how much to return:

- **Simplified** (default): a compact object with `title`, `link`, `snippet`, `publicationInfo`, `resultId`, and `position`. This mode is also used automatically when the node runs as an AI Agent tool, to keep responses small.
- **Raw**: every field the API returns for each paper, using the original field names below.
- **Selected Fields**: pick exactly which fields to include.

### Fields (Raw and Selected Fields)

| Field | Type | Description |
| --- | --- | --- |
| `position` | integer | Rank in the results |
| `result_id` | string | Google Scholar result identifier |
| `paper_title` | string | Paper title |
| `link` | string | Link to the paper |
| `snippet` | string | Snippet from the paper |
| `publication_info` | object | Authors, venue, and year |
| `resources` | array | PDF and other resource links |
| `inline_links` | object | Cited-by, versions, and related links |

## Example workflows

### 1. Literature review into a sheet

1. **Manual Trigger**.
2. **Google Scholar**: Search Query your topic, Year From a recent year, Output `Simplified`.
3. **Google Sheets**: append each paper's `title`, `publicationInfo`, and `link`.

### 2. Track new papers on a topic

1. **Schedule Trigger**: run weekly.
2. **Google Scholar**: your topic, Year From the current year.
3. **Remove Duplicates** then **Slack**: alert on new papers.

### 3. Let an AI Agent do literature search

1. **AI Agent** node.
2. Attach **Google Scholar** as a tool.
3. Ask "Find recent papers on retrieval-augmented generation." The agent calls the node (in Simplified mode) and answers with matching papers.

## Pricing

This node calls the [Google Scholar API](https://apify.com/johnvc/google-scholar-api?fpr=9n7kx3) on Apify, which is billed **pay-per-result**, with no subscription and no minimums. Apify also includes a free monthly usage tier that covers typical volumes. See the [Actor page](https://apify.com/johnvc/google-scholar-api?fpr=9n7kx3) for current rates.

## Resources

- [Google Scholar API on Apify](https://apify.com/johnvc/google-scholar-api?fpr=9n7kx3)
- [npm package](https://www.npmjs.com/package/n8n-nodes-google-scholar-api)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Apify n8n integration guide](https://docs.apify.com/platform/integrations/n8n)

## License

[MIT](LICENSE.md)
