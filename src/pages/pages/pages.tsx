import Account from "../Account/Account";
import Ask from "../Ask/Ask";
import CreateAccount from "../CreateAccount/CreateAccount";
import QuestionDetails from "../QuestionDetails/QuestionDetails";
import Questions from "../Questions/Questions";
import Tags from "../Tags/Tags";
import Users from "../Users/Users";

export const routes = {
  home: '/',
  questions: '/questions',
  questionDetail: '/questions/:questionId',
  tags: '/tags',
  users: '/users',
  ask: '/questions/ask',
  account: '/account/:account',
  createAccount: '/account/createAccount'
};

const publicRoutes = [
  { path: routes.questions, component: Questions },
  { path: routes.tags, component: Tags },
  { path: routes.users, component: Users },
  { path: routes.ask, component: Ask },
  { path: routes.account, component: Account },
  { path: routes.createAccount, component: CreateAccount },
  { path: routes.questionDetail, component: QuestionDetails },
]


export default publicRoutes