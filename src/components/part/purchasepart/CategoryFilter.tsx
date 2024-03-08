import React, { useState } from 'react';
import { SquareCard } from './SquareCard';
import CheckBox from 'src/components/common/CheckBox';
import colors from 'src/constants/colors';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

type Category = 'all' | 'blade' | 'motor' | 'esc' | 'other';
type SortBy = 'recommend' | 'lowest' | 'highest' | 'rank';

interface ProductData {
  id: number;
  store: string;
  name: string;
  price: number;
  rank: number;
  image: string;
  category: Category;
}

const CategoryFilter: React.FC<{ productData: ProductData[] }> = ({
  productData,
}) => {
  const [filteredProducts, setFilteredProducts] =
    useState<ProductData[]>(productData);
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  // 필터된 결과를 페이지별로 나누는 함수
  const paginateData = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  // 카테고리별 필터링 함수
  const handleFilter = (category: Category) => {
    let filtered: ProductData[];
    setSelectedCategory(category);
    if (category === 'all') {
      filtered = productData;
    } else {
      filtered = productData.filter((product) => product.category === category);
    }
    setFilteredProducts(filtered);
  };

  // 정렬 함수
  const handleSort = (sortBy: SortBy) => {
    const sortedProducts = [...filteredProducts];

    switch (sortBy) {
      case 'recommend':
        // 추천순 정렬
        sortedProducts.sort((a, b) => b.rank - a.rank);
        break;
      case 'lowest':
        // 최저가순 정렬
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'highest':
        // 최고가순 정렬
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rank':
        // 평점순 정렬
        sortedProducts.sort((a, b) => b.rank - a.rank);
        break;
      default:
        break;
    }

    setFilteredProducts(sortedProducts);
  };

  return (
    <Div>
      <Filter>
        {/* 카테고리 필터링 버튼 */}
        <FilterBtn>
          <Box
            onClick={() => handleFilter('all')}
            selected={selectedCategory === 'all'}
          >
            All
          </Box>
          <Box
            onClick={() => handleFilter('blade')}
            selected={selectedCategory === 'blade'}
          >
            Blade
          </Box>
          <Box
            onClick={() => handleFilter('motor')}
            selected={selectedCategory === 'motor'}
          >
            Motor
          </Box>
          <Box
            onClick={() => handleFilter('esc')}
            selected={selectedCategory === 'esc'}
          >
            ESC
          </Box>
          <Box
            onClick={() => handleFilter('other')}
            selected={selectedCategory === 'other'}
          >
            기타 부품
          </Box>
        </FilterBtn>

        {/* 정렬 체크박스 */}
        <FilterBtn>
          <CheckBox label='추천순' />
          <CheckBox label='최저가순' />
          <CheckBox label='최고가순' />
          <CheckBox label='평점순' />
        </FilterBtn>
      </Filter>

      {/* 필터링 및 정렬된 상품 목록 */}
      <RowCard>
        {paginateData().map((data, index) => (
          <SquareCard
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
      </RowCard>
      {/* 페이지네이션 컴포넌트 */}
      <PageMove>
        <Pagination
          currentPage={page}
          itemsPerPage={itemsPerPage}
          totalItems={filteredProducts.length}
          onPageChange={handlePageChange}
        />
      </PageMove>
    </Div>
  );
};

// 페이지네이션 컴포넌트
const Pagination: React.FC<{
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (pageNumber: number) => void;
}> = ({ currentPage, itemsPerPage, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <PageBar>
      <ChevronLeft
        sx={{
          color: '#64748B',
          width: '20px',
          height: '20px',
          background: 'none',
        }}
        onClick={handlePrevPage}
      />
      <span>{`${currentPage} / ${totalPages}`}</span>
      <ChevronRight
        sx={{ color: '#64748B', width: '20px', height: '20px' }}
        onClick={handleNextPage}
      />
    </PageBar>
  );
};

export default CategoryFilter;

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Filter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 12px 16px;
  justify-content: space-between;
  align-items: center;
  gap: 313px;
  border-radius: 8px;
  border: 1px solid ${colors.basic200};
  background: white;
`;

const FilterBtn = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  border: none;
  background: none;
`;

const Box = styled.button<{ selected: boolean }>`
  display: flex;
  padding: 4px 12px 3px 12px;
  justify-content: center;
  align-items: center;
  border: none;
  gap: 10px;
  border-radius: 8px;
  background: ${({ selected }) =>
    selected ? colors.basic700 : colors.basic200};
  color: ${({ selected }) => (selected ? 'white' : colors.basic600)};
  font-size: 14px;
`;

const RowCard = styled(FilterBtn)`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
  gap: 10px;
`;

const PageMove = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
`;

const PageBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
