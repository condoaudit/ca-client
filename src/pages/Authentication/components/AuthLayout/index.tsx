import React from 'react';
import { Card } from 'antd';
import Logo from '../../../../common/Icons/Logo';
import './style.scss';

export default function AuthLayout({ children, className }: { children: JSX.Element|JSX.Element[], className?: string }) {
  return (
    <div className="auth-layout-base">
      <Card className={`content ${className}`} title={<Logo />}>
        {children}
      </Card>
    </div>
  );
}
