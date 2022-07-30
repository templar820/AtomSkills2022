import React, {useEffect, useMemo, useState} from 'react';
import MobXRouterDecorator from "@components/HOC/MobXRouterDecorator";
import {MOBXDefaultProps} from "@globalTypes";

const Auth: React.FC<MOBXDefaultProps> = ({children, services, AppStore}) => {
  const [isReady, setIsReady] = useState(false);
  const authService = services.authService;

  useMemo(() => {
    AppStore.setLoader(true);
  }, []);

  const auth = async () => {
    await services.authService.getRoles();
    await authService.authentication();
    AppStore.setLoader(false);
    setIsReady(true);
  };

  useEffect(() => {
    auth();
  }, []);

  return isReady ? children : null;
};

export default MobXRouterDecorator(Auth, false);