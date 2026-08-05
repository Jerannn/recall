import { SIDEBAR_LINKS } from "@/utils/constant";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="flex flex-col gap-3 border-r">
      <div>
        <h1>Recall</h1>
      </div>

      <nav className="flex-1">
        <ul>
          {SIDEBAR_LINKS.map((link) => {
            return (
              <li key={link.href}>
                <Link href={link.href}>{link.name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <footer>
        <h1>jeran@gmail.com</h1>
      </footer>
    </aside>
  );
}
