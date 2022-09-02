const BAD_REQ_CODE = 400;
const UNAUTH_CODE = 401;
const FORBIDDEN_CODE = 403;
const NOT_FOUND_CODE = 404;
const CONFLICT_CODE = 409;
const DEFAUTL_CODE = 500;

const GREETINGS_MSG = 'Добро пожаловать в REST API приложения Favorite Movies!';
const SIGNIN_MSG = 'Успешный вход';
const SIGNOUT_MSG = 'Успешный выход';
const UNAUTH_MSG = 'Необходима авторизация';
const WRONG_DATA_MSG = 'Неправильные почта или пароль';
const DATA_NOT_FOUND_MSG = 'Данные не найдены';
const PATH_NOT_FOUND_MSG = 'Некорректный путь запроса';
const DELETE_FORBIDDEN_MSG = 'Нельзя удалять чужие фильмы';
const MOVIE_DELETED_MSG = 'Фильм удалён';
const EMAIL_EXIST_MSG = 'Email уже зарегистрирован';
const DEFAUTL_MSG = 'На сервере произошла ошибка';

module.exports = {
  BAD_REQ_CODE,
  UNAUTH_CODE,
  FORBIDDEN_CODE,
  NOT_FOUND_CODE,
  DEFAUTL_CODE,
  CONFLICT_CODE,
  SIGNIN_MSG,
  SIGNOUT_MSG,
  UNAUTH_MSG,
  WRONG_DATA_MSG,
  DATA_NOT_FOUND_MSG,
  PATH_NOT_FOUND_MSG,
  DELETE_FORBIDDEN_MSG,
  MOVIE_DELETED_MSG,
  EMAIL_EXIST_MSG,
  DEFAUTL_MSG,
  GREETINGS_MSG,
};
