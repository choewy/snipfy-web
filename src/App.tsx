import { RecoilRoot } from 'recoil';
import { RouterProvider } from 'react-router';

import { ROUTER } from './persistent/route';

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={ROUTER} />
    </RecoilRoot>
  );
}

export default App;
