import { Plus } from 'src/assets';
import Button from 'src/components/common/Button';
import MenuTab from 'src/components/common/MenuTab';
import { DroneLists } from 'src/components/onboarding/droneSearch/DroneLists';
import DroneSearch from 'src/components/onboarding/droneSearch/DroneSearch';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import { useState } from 'react';
import Popup from 'src/components/onboarding/Popup';
import colors from 'src/constants/colors';

const DroneSearchPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <MenuTab />
      <div className='page'>
        <Page>
          <Header>
            <Typography variant='h3' fontWeight='bold' color={colors.basic700}>
              드론 조회
            </Typography>
            <Button
              text={
                <>
                  <Plus /> 드론 신규 등록
                </>
              }
              buttonType='accentLight'
              onClick={handleButtonClick}
            />
          </Header>
          <DroneSearch />
          <DroneLists />
          {isPopupOpen && <Popup onClose={handleClosePopup} />}
        </Page>
      </div>
    </>
  );
};

export default DroneSearchPage;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;