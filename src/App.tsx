import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import publicRoutes from './pages/pages/pages';
import './App.scss'
import HeaderLayout from './Layout/HeaderLayout/HeaderLayout';
import PageWrapper from './Layout/DefaultLayout/PageWrapper/PageWrapper';

function App() {
  return (
    <Router>
      <div className="App h-100">
        <HeaderLayout>
          <PageWrapper>
            <Routes>
              {publicRoutes.map((route, index) => {
                const Page = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Page></Page>
                    }
                  ></Route>
                );
              })}
            </Routes>
          </PageWrapper>
        </HeaderLayout>
      </div>
    </Router>
  );
}

export default App;
