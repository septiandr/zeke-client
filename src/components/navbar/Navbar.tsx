import { getGames, type CategoryType } from "@/api/api";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const products: CategoryType[] = await getGames();

  return <NavbarClient products={products} />;
}
