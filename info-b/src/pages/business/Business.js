import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusiness } from "../../actions/businessActions";

function Business() {
  const dispatch = useDispatch();
  const { business, status } = useSelector((state) => state.business);

  useEffect(() => {
    dispatch(fetchBusiness({ collectionName: "business", queryOptions: {} }));
  }, [dispatch]);

  // ... rest of the code ...
}

export default Business;
