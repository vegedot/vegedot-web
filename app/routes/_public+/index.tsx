import type { Route } from "../../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "home" },
    { name: "description", content: "home" },
  ];
}

export default function Home() {
  return <>home</>;
}
