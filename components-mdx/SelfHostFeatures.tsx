import {
  Lock,
  Shield,
  Network,
  Users,
  Brush,
  Workflow,
  UserCog,
  Route,
  Mail,
  ServerCog,
  Activity,
  Eye,
  Zap,
  ShieldCheck,
} from "lucide-react";

import { Cards, Card } from "fumadocs-ui/components/card";

export const SelfHostFeatures = () => (
  <Cards>
    <Card
      icon={<Lock size="24" />}
      title="Authentication & SSO"
      href="/self-hosting/security/authentication-and-sso"
    />
    <Card
      icon={<UserCog size="24" />}
      title="Automated Access Provisioning"
      href="/self-hosting/administration/automated-access-provisioning"
    />
    <Card
      icon={<Zap size="24" />}
      title="Caching"
      href="/self-hosting/configuration/caching"
    />
    <Card
      icon={<Route size="24" />}
      title="Custom Base Path"
      href="/self-hosting/configuration/custom-base-path"
    />
    <Card
      icon={<Shield size="24" />}
      title="Encryption"
      href="/self-hosting/configuration/encryption"
    />
    <Card
      icon={<Workflow size="24" />}
      title="Headless Initialization"
      href="/self-hosting/administration/headless-initialization"
    />
    <Card
      icon={<ShieldCheck size="24" />}
      title="Data Masking"
      href="/self-hosting/security/data-masking"
    />
    <Card
      icon={<Network size="24" />}
      title="Networking"
      href="/self-hosting/security/networking"
    />
    <Card
      icon={<Users size="24" />}
      title="Organization Creators (EE)"
      href="/self-hosting/administration/organization-creators"
    />
    <Card
      icon={<ServerCog size="24" />}
      title="Instance Management API (EE)"
      href="/self-hosting/administration/instance-management-api"
    />
    <Card
      icon={<Activity size="24" />}
      title="Health and Readiness Check"
      href="/self-hosting/configuration/health-readiness-endpoints"
    />
    <Card
      icon={<Eye size="24" />}
      title="Observability via OpenTelemetry"
      href="/self-hosting/configuration/observability"
    />
    <Card
      icon={<Mail size="24" />}
      title="Transactional Emails"
      href="/self-hosting/configuration/transactional-emails"
    />
    <Card
      icon={<Brush size="24" />}
      title="UI Customization (EE)"
      href="/self-hosting/administration/ui-customization"
    />
  </Cards>
);
