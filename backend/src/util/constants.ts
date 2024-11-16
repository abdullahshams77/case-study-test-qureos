export const jwtConstants = {
    secret: `${process.env.SECRET}`,
  };
  
  export const expireJwtToken = {
    access_token: '120m',
    refresh_token: '1d'
  };