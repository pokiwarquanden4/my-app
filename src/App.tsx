import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import publicRoutes from './pages/pages/pages';
import './App.scss'
import HeaderLayout from './Layout/HeaderLayout/HeaderLayout';
import PageWrapper from './Layout/DefaultLayout/PageWrapper/PageWrapper';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import { Loading } from './Component/Loading/Loading';
import { useAppDispatch } from './App/hook';
import { useEffect } from 'react';
import { getTags } from './pages/Questions/QuestionsAPI';

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTags({}))
  }, [dispatch])

  return (
    <Router>
      <div className="App h-100">
        <ReactNotifications></ReactNotifications>
        <Loading></Loading>
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
