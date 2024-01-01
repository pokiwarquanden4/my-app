import { createContext, useEffect, useMemo } from 'react';
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
import { Socket, io } from 'socket.io-client'
import { getNotify } from './Component/Message/MessageContent/NotifyAPI';
import { addNotify } from './Reducers/UserSlice';

export const SocketContext = createContext<Socket<any, any> | undefined>(undefined)

function App() {
  const cookies = useMemo(() => {
    return new Cookies()
  }, [])
  const socket = useMemo(() => {
    return io(process.env.REACT_APP_BACKEND_URL || '', {
      auth: {
        token: cookies.get('token') || cookies.get('refresh_token')
      }
    })
  }, [cookies])
  const dispatch = useAppDispatch()
  const tagsSlice = useAppSelector(store => store.data.tags)
  const userData = useAppSelector(store => store.user)

  useEffect(() => {
    const func = async () => {
      let allPromises = []
      const token = cookies.get('token') || cookies.get('refresh_token')
      if (!tagsSlice.length) {
        allPromises.push(dispatch(getTags({})))
      }
      if (token && !userData.data.account) {
        allPromises.push(dispatch(getUserAllDetails({})))
      }
      if (token && !userData.notify) {
        allPromises.push(dispatch(getNotify({})))
      }

      await Promise.all(allPromises)
    }
    func()
    cookies.addChangeListener(func)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies, dispatch])

  useEffect(() => {
    socket.on('Notify', (data) => {
      dispatch(addNotify(data))
    })

    return () => {
      socket.off('Notify')
    }
  }, [dispatch, socket])

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
