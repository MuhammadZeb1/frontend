
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../features/readProductSlice';
import { useEffect } from 'react';

function ReadProduct() {
   const { product, isLoading } = useSelector((state) => state.product);
   
   console.log("product", product);
   
  const dispatch = useDispatch();
  useEffect(() => {
  dispatch(getProduct());
}, []);

  return (
    <div>ReadProduct</div>
  )
}

export default ReadProduct