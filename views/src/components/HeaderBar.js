import React from 'react';

const avaImgUrl = "https://lh3.googleusercontent.com/3rhgWbCOvAx946IGRbx71p02Oi6hmE7Bli7ymXCqvt9oyrhnEoYR5_stB3BZbaIAwLey2aXag06zjqqVN5OYQAyvFjMl7IhYIMZqupGV09INS3F1Tx3V02jSzpvzrUeGxuasP9aExRusY2a4hImokhQ_QYTXvtJt35Sk5ezFAZl40zTjOtCZ7iiUwnJjnQ8tE9gyKRDxz6lQcOmseEMvrXvtAkdDILUFlWDE_LXuB6CIcvnxNkjrIwm5_w7l5opNZIGlkwlY9cPMNHsmGQfjBbP3kLwf2qf1oBnGs5VMRVWXrtYUtEtNADXl2oMbMQ2-L4yoNHydPTJTcr6ra8LN8WZLcpQMwxrCl9BbxzdqRKeFO_J6EJYU5Q-DAI84us5nQOgqPjR_U7FiHTOyvRumxC0naBHKrJtLt-UKB48BkqBNpt9TwhgLOdlw4dSrpTIWxelQQpOt_iinc4mfbdt1q498g8vSxX63QdN-BNRxKL6AH5FuVX5JbhXpPRO4GbsLS99sH0mujYIZmfZm7ze3Gt7pXlq8TL7Ao4dFBypvrIVoSHROSeZrFyPMyguVjYlEWuH2n6rpNfanZbB9b14jRhtZNWULELP1UnByVHzamHRSv6knIJD_euPPnhTea5Q6csG1N-xhjLB2YWdCPChL-JUhgrn9ilA=s225-no";

const HeaderBar = () => {
  return (
    <div className="hb-container">
      <div className="hb-rootname">
        <p>Feeds</p>
      </div>
      <div className="hb-auth-features">
        <ul>
          <li>
            <img src={avaImgUrl} alt="avatar" />
            Huynh-Nhan
          </li>
          <li>
            Sign Out
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderBar;
