export const ALL_APP_ROUTES_CONFIG = [
  {
    url: '/api/users',
    refClass: 'create_user_dto',
    method: 'POST',
  },
  {
    url: '/api/habits',
    refClass: 'create_habit_dto',
    method: 'POST',
  },
  {
    url: '/api/habits',
    refClass: 'habit_filter_dto',
    method: 'GET'
  }
];
