

import React, { useState } from 'react';
import { Alert, Container, Form, FormControl, InputGroup, Table } from 'react-bootstrap';
import { data } from './NgoDataDetails/Data'


const DataFilter = () => {
  const [contacts, setContacts] = useState(data);
  const [search, setSearch] = useState('');
  console.log(data);
  // Function to mark the search keyword in the text
  const highlightSearchKeyword = (text) => {
    if (search !== '') {
      const regex = new RegExp(`(${search})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    }
    return text;
  };
  return (

    <div className="container mt-5">
      <div className="mb-3">
        <h1 className='text-center mt-4'>Search For NGO Near Your Area</h1>
        <Form>
          <InputGroup className='my-3'>

            {/* onChange for search */}
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search NGO by Name/Area/district'
            />
          </InputGroup>
        </Form>
      </div>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Name of NGOs</th>
              <th>Address</th>
              <th>District</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {data

              .filter((item) => {
                return search.toLowerCase() === ''
                  ? item
                  : item.Address.toLowerCase().includes(search) ||
                  item['Reg. No.'].toLowerCase().includes(search) ||
                  item['Name of NGOs'].toLowerCase().includes(search) ||
                  item.Country.toLowerCase().includes(search);

              })

              .splice(0, 10)



              .map((item) => (
                <tr key={item.id}>
                  <td>{item['Sl.no']}</td>
                  <td dangerouslySetInnerHTML={{ __html: highlightSearchKeyword(item['Name of NGOs']) }} />
                  <td dangerouslySetInnerHTML={{ __html: highlightSearchKeyword(item.Address) }} />
                  <td dangerouslySetInnerHTML={{ __html: highlightSearchKeyword(item.District) }} />

                  {/* <td>{item.Address}</td>
                  <td>{item.District}</td> */}
                  <td>{item.Phone}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        {search !== '' && data.filter((item) => (
          item.Address.toLowerCase().includes(search.toLowerCase()) ||
          item['Reg. No.'].toLowerCase().includes(search.toLowerCase()) ||
          item['Name of NGOs'].toLowerCase().includes(search.toLowerCase()) ||
          item.Country.toLowerCase().includes(search.toLowerCase())
        )).length === 0 &&
          <Alert variant="danger">No data matches your search.</Alert>
        }
      </div>
    </div>

  );
};

export default DataFilter;