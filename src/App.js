import './App.css';
import { useEffect, useState } from 'react';

const App = () => {
  const pagination = [1, 2, 3, 4, 5];

  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchEmployees(1, 5);
  }, []);

  const fetchEmployees = async (page, limit) => {
    try {
      const res = await fetch(
        `http://localhost:5000/employees/?page=${page}&limit=${limit}`
      );
      const data = await res.json();
      setEmployees(data.employees);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePage = (e) => {
    let value = parseInt(e.target.value);
    let limit = 5;
    fetchEmployees(value, limit);
    setPage(value);
  };

  const handlePrev = async () => {
    try {
      const limit = 5;
      const res = await fetch(
        `http://localhost:5000/employees/?page=${page - 1}&limit=${limit}`
      );
      const data = await res.json();
      setEmployees(data.employees);
      setPage(page - 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = async () => {
    try {
      const limit = 5;
      const res = await fetch(
        `http://localhost:5000/employees/?page=${page + 1}&limit=${limit}`
      );
      const data = await res.json();
      setEmployees(data.employees);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <table className="table table-hover table-resposive table-bordered">
        <thead>
          <tr className="bg-primary text-white">
            <th scope="col">Name</th>
            <th scope="col">Id</th>
            <th scope="col">Employee Salary</th>
            <th scope="col">Age</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, i) => {
            return (
              <tr key={i}>
                <td>{emp.name}</td>
                <td>{emp._id}</td>
                <td>{emp.salary}</td>
                <td>{emp.age}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              disabled={page === 1}
              onClick={handlePrev}
            >
              Previous
            </button>
          </li>
          {pagination.map((e, i) => {
            return (
              <li className="page-item" key={i}>
                <button
                  className={`page-link ${page === e ? 'active' : ''}`}
                  value={e}
                  onClick={handlePage}
                >
                  {e}
                </button>
              </li>
            );
          })}
          <li className="page-item">
            <button
              className="page-link"
              disabled={page === 5}
              onClick={handleNext}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default App;
