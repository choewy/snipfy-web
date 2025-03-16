import LinkComponent from '../components/LinkComponent';

export default function MainPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>Main</h1>
      <LinkComponent />
    </div>
  );
}
