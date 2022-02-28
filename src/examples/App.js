import React, { useState, useMemo } from 'react';
import Pagination from '../Pagination';
import data from './data/todos.json';
import './styles.css';

let PageSize = 10;

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  // const handleRemoveItem = (e) => {
  //   const name = e.target.getAttribute("name")
  //    updateList(list.filter(item => item.name !== name));
  //  };

   const handleDel = item => {
   return (({ data }) => ({
      data: data.filter(el => el.id !== item.id)
    }));
  };

  return (
    
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map(item => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.title}</td><input type="checkbox"/>
                <td><button onClick={handleDel}>&times;</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  );
}
