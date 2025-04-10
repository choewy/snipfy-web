import { LayoutComponent } from './layout.component';

export default function Layout() {
  return (
    <>
      <LayoutComponent.Nav />
      <LayoutComponent.Outlet />
    </>
  );
}
