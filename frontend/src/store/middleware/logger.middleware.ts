const loggerMiddleware = ({ dispatch }: any) => (next: any) => async (action: any) => {
  next(action);
};
export default loggerMiddleware;
