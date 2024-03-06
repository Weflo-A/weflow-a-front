import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BackBlue, Bigger, BiggerBlue } from 'src/assets';
import { parts } from 'src/assets/data/menuData';
import { productData } from 'src/assets/data/productData';
import Button from 'src/components/common/Button';
import MenuTabGroup from 'src/components/common/MenuTabGroup';
import { WidthCard } from 'src/components/purchasepart/WidthCard';
import colors from 'src/constants/colors';
import styled from 'styled-components';

const PurchasePart = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/');
  };

  return (
    <>
      <MenuTabGroup groups={parts} type='parts' />
      <div className='page'>
        <Page>
          <Top>
            <Typography variant='h3' fontWeight='bold' color={colors.basic700}>
              부품 구매
            </Typography>
            <Button
              text={
                <>
                  전체 바로가기 <BiggerBlue />
                </>
              }
              buttonType='primaryLight'
              onClick={handleButtonClick}
              style={{ width: '180px', height: '32px' }}
            />
          </Top>
          <YouNeed>
            {productData.map((data, index) => (
              <WidthCard
                key={index}
                data={{
                  id: data.id,
                  store: data.store,
                  name: data.name,
                  price: data.price,
                  rank: data.rank,
                  image: data.image,
                }}
              />
            ))}
          </YouNeed>
          <Orange>
            <Typography variant='h3' fontWeight='bold' color='white'>
              예측된 부품 구매?
            </Typography>
            <Row>
              <Center>
                <Num>1</Num>
                <Typography fontSize='14px' color='white'>
                  버티핏을 통한 드론 검사로 현재 드론의 부품 상태를 알 수
                  있어요!
                </Typography>
              </Center>
              <Center>
                <Num>2</Num>
                <Typography fontSize='14px' color='white'>
                  버티핏을 통한 드론 검사로 현재 드론의 부품 상태를 알 수
                  있어요!
                </Typography>
              </Center>
              <Center>
                <Num>3</Num>
                <Typography fontSize='14px' color='white'>
                  미리 준비한 부품들로 시간・비용 손실 없이 바로 수리 후 드론을
                  운행해요!
                </Typography>
              </Center>
            </Row>
          </Orange>
          <SoonNeed></SoonNeed>
        </Page>
      </div>
    </>
  );
};

export default PurchasePart;

const Page = styled.div`
  min-width: 1020px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

const YouNeed = styled.div`
  width: 1020px;
  height: 318px;
  border-radius: 12px;
  background: linear-gradient(180deg, #09101c 0%, #2e4263 127.82%);
`;

const Orange = styled.div`
  width: 1440px;
  height: 219px;
  background: ${colors.accent100};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  gap: 25px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 60px;
`;

const Center = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
`;

const Num = styled.div`
  display: flex;
  width: 32px;
  height: 32px;
  padding: 6px 12px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 8px;
  background: ${colors.accent50};
  color: white;
  font-size: 16px;
`;

const SoonNeed = styled.div`
  display: flex;
  width: 1020px;
  height: 385px;
  padding: 28px 141px 28px 140px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border-radius: 12px;
  border: 1px solid ${colors.basic200};
  background: white;
`;
