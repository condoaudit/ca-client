import React from 'react';
import { Card } from 'antd';
import Layout from '../../../common/Layout';
import './style.scss';

export default function Home() {
  return (
    <Layout className="home-page">
      <div className="warnings">
        <Card className="warnings__card">
          <p>Coisas</p>
        </Card>
        <Card className="warnings__card">
          <p>Coisas</p>
        </Card>
        <Card className="warnings__card">
          <p>Coisas</p>
        </Card>
        <Card className="warnings__card">
          <p>Coisas</p>
        </Card>
      </div>

    </Layout>
  );
}
