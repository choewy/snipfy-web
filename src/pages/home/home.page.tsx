import { HomeComponent } from './home.component';

export default function HomePage() {
  return (
    <>
      <HomeComponent.Header />
      <HomeComponent.Summary />
      <HomeComponent.CreateLinkContent />
      <HomeComponent.InformationContent />
      <HomeComponent.Footer />
    </>
  );
}
