import { createContext, useEffect, useMemo } from 'react';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';
import Cookies from 'universal-cookie';
import './App.scss';
import { useAppDispatch, useAppSelector } from './App/hook';
import { Loading } from './Component/Loading/Loading';
import PageWrapper from './Layout/DefaultLayout/PageWrapper/PageWrapper';
import HeaderLayout from './Layout/HeaderLayout/HeaderLayout';
import { addNotify } from './Reducers/UserSlice';
import publicRoutes from './pages/pages/pages';
import { useFectStartData } from './Hook/FetchStartData';

export const SocketContext = createContext<Socket<any, any> | undefined>(undefined)

function App() {
  const cookies = useMemo(() => {
    return new Cookies()
  }, [])
  // const socket = useMemo(() => {
  //   return io(process.env.REACT_APP_BACKEND_URL || '', {
  //     auth: {
  //       token: cookies.get('token') || cookies.get('refresh_token')
  //     }
  //   })
  // }, [cookies])
  const dispatch = useAppDispatch()

  useFectStartData()

  // useEffect(() => {
  //   socket.on('Notify', (data) => {
  //     dispatch(addNotify(data))
  //   })

  //   return () => {
  //     socket.off('Notify')
  //   }
  // }, [dispatch, socket])

  return (
    // <SocketContext.Provider value={socket}>
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
    // </SocketContext.Provider>
  );
}

export default App;
