import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerformance } from "../../actions/performanceActions";

function Performance() {
  const dispatch = useDispatch();
  const { performance, status } = useSelector((state) => state.performance);

  useEffect(() => {
    dispatch(
      fetchPerformance({ collectionName: "performance", queryOptions: {} })
    );
  }, [dispatch]);

  // ... rest of the code ...
}

export default Performance;
