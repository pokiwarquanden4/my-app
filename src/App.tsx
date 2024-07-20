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
  const userId = useAppSelector(store => store.user.data._id)

  const socket = useMemo(() => {
    return io(process.env.REACT_APP_BACKEND_SOCKET_URL || '', {
      auth: {
        userId: userId
      }
    })
  }, [userId])
  const dispatch = useAppDispatch()

  useFectStartData()

  useEffect(() => {
    if (!userId) {
      socket.disconnect()
    }
    socket.on('notification', (data) => {
      dispatch(addNotify(data))
    })

    return () => {
      socket.disconnect();
    }
  }, [dispatch, socket, userId])

  return (
    <SocketContext.Provider value={socket}>
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
    </SocketContext.Provider>
  );
}

export default App;
