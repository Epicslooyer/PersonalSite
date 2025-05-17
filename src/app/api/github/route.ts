const query = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

export async function POST(req: Request) {
  const { username } = await req.json();

  if (!username) {
    return new Response(JSON.stringify({ error: "Missing username" }), {
      status: 400,
    });
  }

  const endpoint = "https://api.github.com/graphql";
  const token = process.env.GITHUB_TOKEN;

  const today = new Date();
  const start = new Date();
  start.setFullYear(start.getFullYear() - 1);

  const githubRes = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        username,
        from: start.toISOString(),
        to: today.toISOString(),
      },
    }),
  });

  if (!githubRes.ok) {
    return new Response(JSON.stringify({ error: "GitHub API error" }), {
      status: 500,
    });
  }

  const json = await githubRes.json();
  const days =
    json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks?.flatMap(
      (week: { contributionDays: { date: string; contributionCount: number }[] }) => week.contributionDays
    ) ?? [];

  const map: Record<string, number> = {};
  days.forEach((day: { date: string; contributionCount: number }) => {
    map[day.date] = day.contributionCount;
  });

  return new Response(JSON.stringify(map), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
