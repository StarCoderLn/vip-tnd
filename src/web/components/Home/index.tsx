import React, { Fragment, FunctionComponent } from 'react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { getId } from '@models/selectors/idSelectors';
import './index.css';
import logo from '@assets/images/logo.jpg';

const Home: FunctionComponent = () => {
  const id = useRecoilValue(getId);
  axios.get('/api/info').then(res => {
    console.log(res.data.data);
  })
  return (
    <Fragment>
      <h2 id="home">Home</h2>
      <h2>
        获取到的 id：{id}
      </h2>
      <img src={logo} alt="logo"/>
      <div>
        <button id="btn" onClick={() => { alert('点击成功！') }}>点我</button>
        <a id="link" href="http://www.baidu.com">链接</a>
      </div>
    </Fragment>
  )
}

export default Home;
