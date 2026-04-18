export const SITE_NAVIGATION = [
  { href: "/", label: "Home" },
  { href: "/practice", label: "Practice" },
  { href: "/previous-year", label: "Previous Year" },
  { href: "/learn", label: "Learn" },
  { href: "/insights", label: "Insights" },
  { href: "/admin", label: "Admin" },
];

export function isNavigationActive(pathname, href) {
  if (!pathname) {
    return false;
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
