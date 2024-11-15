# Product CURD App Component Based
> A simple product curd application component based, along with localstorage implementation

## Check the Application
[https://dev-arindam-roy.github.io/react-product-liast-app-component-based/](https://dev-arindam-roy.github.io/react-product-liast-app-component-based/)


```js
import React, { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import ProductList from './ProductList';

const ProductForm = () => {
  const [product, setProduct] = useState({ name: '', price: '', qty: '' });
  const [productList, setProductList] = useState([]);
  const [editProductIndex, setEditProductIndex] = useState(null);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    let updatedProductList;

    if (editProductIndex !== null) {
      updatedProductList = productList.map((item, index) =>
        index === editProductIndex ? product : item
      );
    } else {
      updatedProductList = [...productList, product];
    }

    setProductList(updatedProductList);
    saveInLocalStorage(updatedProductList);
    resetFormHandler();
  };

  const resetFormHandler = () => {
    setProduct({ name: '', price: '', qty: '' });
    setEditProductIndex(null);
  };

  const emitOnEdit = (keyIndex) => {
    setProduct(productList[keyIndex]);
    setEditProductIndex(keyIndex);
  };

  const emitOnDelete = (keyIndex) => {
    const updatedProductList = productList.filter(
      (_, index) => index !== keyIndex
    );
    setProductList(updatedProductList);
    saveInLocalStorage(updatedProductList);
    resetFormHandler();
  };

  const deleteAllHandler = () => {
    setProductList([]);
    saveInLocalStorage([]);
    resetFormHandler();
  };

  const printRef = useRef();
  const printHandler = useReactToPrint({
    content: () => printRef.current,
  });

  const saveInLocalStorage = (updatedProductList) => {
    localStorage.setItem(
      '_onex_simple_productlistitems_',
      JSON.stringify(updatedProductList)
    );
  };

  useEffect(() => {
    const storedProductListItems = localStorage.getItem(
      '_onex_simple_productlistitems_'
    );
    if (storedProductListItems) {
      setProductList(JSON.parse(storedProductListItems));
    }
  }, []);

  useEffect(() => {
    console.log(productList);
  }, [productList]);

  return (
    <>
      <div
        style={{ width: '850px', margin: '60px auto', fontFamily: 'monospace' }}
      >
        <div>
          <div>
            <h2>
              <strong>Product List App</strong> - ({productList.length})
            </h2>
            <hr />
          </div>
          <div style={{ marginTop: '15px' }}>
            <form onSubmit={formSubmitHandler}>
              <div style={{ float: 'left' }}>
                <label>
                  <strong>Product Name:</strong>
                </label>
                <div style={{ marginTop: '8px' }}>
                  <input
                    type='text'
                    placeholder='Name'
                    required
                    style={{
                      width: '300px',
                      padding: '8px',
                      border: '1px solid black',
                      borderRadius: '4px',
                    }}
                    value={product.name}
                    onChange={(e) =>
                      setProduct({ ...product, name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div style={{ float: 'left', marginLeft: '10px' }}>
                <label>
                  <strong>Price:</strong>
                </label>
                <div style={{ marginTop: '8px' }}>
                  <input
                    type='number'
                    placeholder='Price'
                    min='0'
                    step='any'
                    required
                    style={{
                      width: '90px',
                      padding: '8px',
                      border: '1px solid black',
                      borderRadius: '4px',
                    }}
                    value={product.price}
                    onChange={(e) =>
                      setProduct({ ...product, price: e.target.value })
                    }
                  />
                </div>
              </div>
              <div style={{ float: 'left', marginLeft: '10px' }}>
                <label>
                  <strong>QTY:</strong>
                </label>
                <div style={{ marginTop: '8px' }}>
                  <input
                    type='number'
                    placeholder='QTY'
                    min='1'
                    required
                    style={{
                      width: '60px',
                      padding: '8px',
                      border: '1px solid black',
                      borderRadius: '4px',
                    }}
                    value={product.qty}
                    onChange={(e) =>
                      setProduct({ ...product, qty: e.target.value })
                    }
                  />
                </div>
              </div>
              <div style={{ float: 'left' }}>
                <button
                  type='submit'
                  style={{
                    padding: '8px',
                    backgroundColor: 'black',
                    color: 'white',
                    fontSize: '16px',
                    borderRadius: '4px',
                    marginLeft: '10px',
                    marginTop: '22px',
                    border: '1px solid black',
                  }}
                >
                  {editProductIndex !== null ? 'Update' : 'Add'}
                </button>
              </div>
              <div style={{ float: 'left' }}>
                <button
                  type='button'
                  style={{
                    padding: '8px',
                    backgroundColor: 'black',
                    color: 'white',
                    fontSize: '16px',
                    borderRadius: '4px',
                    marginLeft: '10px',
                    marginTop: '22px',
                    border: '1px solid black',
                  }}
                  onClick={resetFormHandler}
                >
                  {editProductIndex !== null ? 'Cancel' : 'Reset'}
                </button>
                {productList.length > 0 && (
                  <button
                    type='button'
                    style={{
                      padding: '8px',
                      backgroundColor: 'red',
                      color: 'white',
                      fontSize: '16px',
                      borderRadius: '4px',
                      marginLeft: '10px',
                      marginTop: '22px',
                      border: '1px solid red',
                    }}
                    onClick={deleteAllHandler}
                  >
                    Delete All
                  </button>
                )}
                {productList.length > 0 && (
                  <button
                    type='button'
                    style={{
                      padding: '8px',
                      backgroundColor: 'green',
                      color: 'white',
                      fontSize: '16px',
                      borderRadius: '4px',
                      marginLeft: '10px',
                      marginTop: '22px',
                      border: '1px solid green',
                    }}
                    onClick={printHandler}
                  >
                    Print
                  </button>
                )}
              </div>
              <div style={{ clear: 'both' }}></div>
            </form>
          </div>
        </div>
        <div ref={printRef} style={{fontFamily: 'monospace'}}>
          <ProductList
            sendProductList={productList}
            onEdit={emitOnEdit}
            onDelete={emitOnDelete}
          />
        </div>
      </div>
    </>
  );
};

export default ProductForm;
```

```js
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
```