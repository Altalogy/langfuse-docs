import { Cards, Card } from "fumadocs-ui/components/card";
import { WALKTHROUGH_TABS } from "./constants";

export const WatchWalkthroughsCards = () => (
  <Cards>
    {WALKTHROUGH_TABS.map((tab) => (
      <Card
        key={tab.id}
        title={tab.title}
        href={`/watch-demo?tab=${tab.id}`}
        icon={<tab.icon />}
      >
        {""}
      </Card>
    ))}
  </Cards>
);
