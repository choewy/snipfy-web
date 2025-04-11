import { HomeComponent } from './home.component';

export default function HomePage() {
  return (
    <>
      <HomeComponent.LinkModal />
      <HomeComponent.LinkForm />
      <HomeComponent.Dashboard />
    </>
  );
}
