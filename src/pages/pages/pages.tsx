import Account from "../Account/Account";
import Advert from "../Advert/Advert";
import Ask from "../Ask/Ask";
import CreateAccount from "../CreateAccount/CreateAccount";
import QuestionDetails from "../QuestionDetails/QuestionDetails";
import Questions from "../Questions/Questions";
import Reports from "../Reports/Reports";
import Tags from "../Tags/Tags";
import Users from "../Users/Users";

export const routes = {
  home: '/',
  questions: '/questions',
  questionDetail: '/questions/:questionId/:responseId',
  tags: '/tags',
  users: '/users',
  ask: '/questions/ask',
  account: '/account/:account',
  createAccount: '/account/createAccount',
  reports: '/reports',
  advertisement: '/advertisement'
};

const publicRoutes = [
  { path: routes.questions, component: Questions },
  { path: routes.tags, component: Tags },
  { path: routes.users, component: Users },
  { path: routes.ask, component: Ask },
  { path: routes.account, component: Account },
  { path: routes.createAccount, component: CreateAccount },
  { path: routes.questionDetail, component: QuestionDetails },
  { path: routes.reports, component: Reports },
  { path: routes.advertisement, component: Advert },
]


export default publicRoutes