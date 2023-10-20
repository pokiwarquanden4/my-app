import Ask from "../Ask/Ask";
import Questions from "../Questions/Questions";
import Tags from "../Tags/Tags";
import Users from "../Users/Users";

export const routes = {
  questions: '/questions',
  tags: '/tags',
  users: '/users',
  ask: '/questions/ask'
};

const publicRoutes = [
  { path: routes.questions, component: Questions },
  { path: routes.tags, component: Tags },
  { path: routes.users, component: Users },
  { path: routes.ask, component: Ask },
]


export default publicRoutes