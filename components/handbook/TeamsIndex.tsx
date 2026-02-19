import { Cards, Card } from "fumadocs-ui/components/card";
import { TEAMS } from "@/lib/data/handbook-meta";

export const TeamsIndex = () => {
  return (
    <div className="my-6">
      <Cards>
        {Object.entries(TEAMS).map(([path, team]) => (
          <Card
            href={`/handbook/${path}/${team.firstPage}`}
            key={path}
            title={team.name}
          >
            {""}
          </Card>
        ))}
      </Cards>
    </div>
  );
};
