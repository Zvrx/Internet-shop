import React, { useContext, useState } from 'react';
import { Context } from '../../../Client1/src';
import { observer } from 'mobx-react-lite';
import DyeItem from './DyeItem';
import { Container, Form, Card, Button, Nav, Row, InputGroup, Toast, OverlayTrigger, Tooltip, Pagination } from 'react-bootstrap';
import { BiReset, BiSort, BiChevronLeft, BiChevronRight } from 'react-icons/bi';

const DyesList = observer(() => {
  const { dye } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByRating, setSortByRating] = useState(true);
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const Brand = dye.GetSelectedBrand();
  const Type = dye.GetSelectedType();
  const allDyes = dye._Dyes;
  
  const compareByRating = (a, b) => {
    if (a.rating < b.rating) {
      return sortByRating ? -1 : 1;
    }
    if (a.rating > b.rating) {
      return sortByRating ? 1 : -1;
    }
    // Если рейтинги равны, сортировка по имени
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  };

  const compareByPrice = (a, b) => {
    const priceA = parseFloat(a.price);
    const priceB = parseFloat(b.price);
    return priceA - priceB;
  };

  const filteredDyes = allDyes.filter((dye) =>
    dye.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
  );

  const sortedAndFilteredDyes = filteredDyes
    .filter((dye) => {
      const brandFilter = Object.keys(Brand).length === 0 || dye.BrandId === Brand.id;
      const typeFilter = Object.keys(Type).length === 0 || dye.TypeId === Type.id;
      const priceFromFilter = priceFrom === '' || parseFloat(dye.price) >= parseFloat(priceFrom);
      const priceToFilter = priceTo === '' || parseFloat(dye.price) <= parseFloat(priceTo);
      return brandFilter && typeFilter && priceFromFilter && priceToFilter;
    })
    .sort(compareByRating)
    .sort(compareByPrice);

  const resetFilters = () => {
    window.location.reload();
  };

  const handleSortByRating = () => {
    setSortByRating(!sortByRating);
  };

  const tooltip = <Tooltip>Сортировка по рейтингу</Tooltip>;

  // Пагинация
  const itemsPerPage = 12; // количество элементов на странице 
  const [currentPage, setCurrentPage] = useState(1); // Фактическая страница

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDyes = sortedAndFilteredDyes.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(sortedAndFilteredDyes.length / itemsPerPage); // Рассчет количества страниц

  const showPagination = sortedAndFilteredDyes.length > itemsPerPage;

  return (
    <div className="mb-18">
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Поиск краски"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>Цена от:</InputGroup.Text>
        <Form.Control
          type="number"
          min="0"
          step="0.01"
          placeholder="0"
          value={priceFrom}
          onChange={(event) => setPriceFrom(event.target.value)}
          style={{ maxWidth: "120px" }}
        />
        <InputGroup.Text>до:</InputGroup.Text>
        <Form.Control
          type="number"
          min="0"
          step="0.01"
          placeholder="0"
          value={priceTo}
          onChange={(event) => setPriceTo(event.target.value)}
          style={{ maxWidth: "120px" }}
        />
        <Button onClick={resetFilters} variant="outline-secondary" className="ms-2">
          <BiReset />
        </Button>
        <OverlayTrigger placement="top" overlay={tooltip}>
          <Button onClick={handleSortByRating} variant="outline-secondary" className="ms-2">
            <BiSort size={20} />
          </Button>
        </OverlayTrigger>
      </InputGroup>
      <Row className="d-flex">
        {currentDyes.map((dye) => (
          <DyeItem key={dye.id} Dye={dye} />
        ))}
      </Row>
      {showPagination && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1} />
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages} />
          </Pagination>
        </div>
      )}
      <div className="text-center mt-2">
        Страница {currentPage} из {totalPages}
      </div>
    </div>
  );
});

export default DyesList;
