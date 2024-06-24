import React, { useState } from 'react';
import styles from './FilterList.module.css';
import FilterItem from './filterItem/FilterItem';
import Button from '../button/Button';
import ModalLayout from '../modalLayout/ModalLayout';
import Checkbox from '../checkbox/Checkbox';
import { briefCase, otherFiltersData } from '../../data/filterData';
import AdditionalFilters from '../additionalFilters/AdditionalFilters';

const FilterList = () => {
  const [showBriefCase, setShowBriefCase] = useState(false);
  const [showAdditionalFilters, setShowAdditionalFilters] = useState(false);

  return (
    <section className={styles.wrapper}>
      <ul className={styles.list}>
        <FilterItem iconName='plane' type='input' text='Город' />
        <FilterItem
          iconName='briefCase'
          text='Тип занятости'
          onClick={() => {
            setShowBriefCase(!showBriefCase);
          }}
          isOpenFilter={showBriefCase}
          className={styles.filterItem}
        >
          <ModalLayout className={styles.briefCase}>
            <Checkbox list={briefCase} />
          </ModalLayout>
        </FilterItem>
        <FilterItem
          iconName={'filter'}
          text='Дополнительные фильтры'
          onClick={() => {
            setShowAdditionalFilters(!showAdditionalFilters);
          }}
          isOpenFilter={showAdditionalFilters}
          level='high'
          className={styles.filterItem}
        >
          <ModalLayout >
            <AdditionalFilters list={otherFiltersData} />
          </ModalLayout>
        </FilterItem>
      </ul>
      <div className={styles.resetWrapper}>
        <Button className={styles.reset}>Сбросить все фильтры</Button>
      </div>
    </section>
  );
};

export default FilterList;
