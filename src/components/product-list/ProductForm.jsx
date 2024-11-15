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
