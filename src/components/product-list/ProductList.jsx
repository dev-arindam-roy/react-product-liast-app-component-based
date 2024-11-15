import React, { useEffect, useState } from 'react';
import { toWords } from 'number-to-words';

const ProductList = ({ sendProductList, onEdit, onDelete }) => {
  const [getProductList, setProductList] = useState([]);
  const calculateTotalAmount = () => {
    let total = 0;

    // Ensure `getProductList` is defined and is an array
    if (Array.isArray(getProductList) && getProductList.length > 0) {
      getProductList.forEach((item) => {
        total += parseFloat(item.price) * parseFloat(item.qty);
      });
    }

    return total.toFixed(2);
  };

  useEffect(() => {
    setProductList(sendProductList);
  }, [sendProductList]);

  return (
    <>
      <div style={{ marginTop: '30px' }}>
        <h3>All Products - ({getProductList.length})</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ borderBottom: '1px solid black', borderTop: '1px solid black' }}>
            <tr>
              <th style={{ textAlign: 'left' }}>SL</th>
              <th style={{ textAlign: 'left' }}>Name</th>
              <th style={{ textAlign: 'left' }}>Price</th>
              <th style={{ textAlign: 'left' }}>QTY</th>
              <th style={{ textAlign: 'left' }}>Total</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody style={{ marginTop: '15px' }}>
            {getProductList && getProductList.length > 0 ? (
              getProductList.map((item, index) => {
                return (
                  <tr key={'product-' + index}>
                    <td
                      style={{
                        textAlign: 'left',
                        paddingTop: '8px',
                        width: '60px',
                      }}
                    >
                      #{index + 1}
                    </td>
                    <td style={{ textAlign: 'left', width: '300px' }}>
                      {item.name}
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      {parseFloat(item.price).toFixed(2)}
                    </td>
                    <td style={{ textAlign: 'left' }}>{item.qty}</td>
                    <td style={{ textAlign: 'left' }}>
                      {(parseFloat(item.price) * parseFloat(item.qty)).toFixed(
                        2
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        type='button'
                        style={{
                          padding: '5px',
                          backgroundColor: 'black',
                          color: 'white',
                          fontSize: '10px',
                          borderRadius: '4px',
                        }}
                        onClick={() => onEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        type='button'
                        style={{
                          padding: '5px',
                          backgroundColor: 'black',
                          color: 'white',
                          fontSize: '10px',
                          borderRadius: '4px',
                          marginLeft: '5px',
                        }}
                        onClick={() => onDelete(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6}>No Products Found!</td>
              </tr>
            )}
          </tbody>
          <tfoot style={{ borderTop: '1px solid black', borderBottom: '1px solid black' }}>
            <tr>
              <td
                colSpan={4}
                style={{
                  textAlign: 'right',
                  fontWeight: '600',
                  paddingTop: '8px',
                }}
              >
                Total Amount:
              </td>
              <td colSpan={2} style={{ fontWeight: 'bold', paddingTop: '8px' }}>
                {calculateTotalAmount()}
              </td>
            </tr>
            <tr>
              <td
                colSpan={4}
                style={{
                  textAlign: 'right',
                  fontWeight: '600',
                  paddingTop: '8px',
                }}
              >
                Total Payable Amount:
              </td>
              <td colSpan={2} style={{ fontWeight: 'bold', paddingTop: '8px' }}>
                {Math.round(calculateTotalAmount()).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td
                colSpan={5}
                style={{
                  textAlign: 'right',
                  fontWeight: '600',
                  padding: '10px',
                }}
              >
                <strong>In Words:</strong> {toWords(Math.round(calculateTotalAmount()).toFixed(2))}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default ProductList;
