import { useEffect } from 'react';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './App.scss';
import { useAppDispatch, useAppSelector } from './App/hook';
import { Loading } from './Component/Loading/Loading';
import PageWrapper from './Layout/DefaultLayout/PageWrapper/PageWrapper';
import HeaderLayout from './Layout/HeaderLayout/HeaderLayout';
import { getUserAllDetails } from './pages/LoginPages/LoginAPI';
import { getTags } from './pages/Questions/QuestionsAPI';
import publicRoutes from './pages/pages/pages';

function App() {
  const dispatch = useAppDispatch()
  const tagsSlice = useAppSelector(store => store.data.tags)

  useEffect(() => {
    const func = async () => {
      let allPromises = []
      const token = cookies.get('token') || cookies.get('refresh_token')
      tagsSlice.length || allPromises.push(dispatch(getTags({})))
      token && allPromises.push(dispatch(getUserAllDetails({})))

      await Promise.all(allPromises)
    }
    const cookies = new Cookies()
    func()
    cookies.addChangeListener(func)
  }, [dispatch, tagsSlice.length])

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
