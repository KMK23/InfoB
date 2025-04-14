import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBenefits } from "../../store/slices/benefitsSlice";
import "../../styles/pages/_benefits.scss";
import mainPro3 from "../../resources/images/main/main_pro3.png";

const Benefits = () => {
  const dispatch = useDispatch();
  const { benefits, status } = useSelector((state) => state.benefits);

  useEffect(() => {
    dispatch(
      fetchBenefits({ collectionName: "BenefitsDetail", queryOptions: {} })
    );
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!benefits) {
    return null;
  }

  const { items } = benefits;

  return (
    <div className="recruitment-benefits">
      <div className="">
        <h1 className="text-4xl mb-20">복리후생</h1>
      </div>
      <div className="grid grid-cols-3 gap-8 text-white place-items-center">
        {items.map((item, i) => (
          <div
            className="flex w-96 gap-6 h-28 justify-center items-center"
            key={i}
          >
            <div>
              <img
                src={item.icon}
                width={85}
                className="brightness-150 invert"
                alt={item.name}
              />
            </div>
            <div>
              <h2 className="text-2xl">{item.name}</h2>
              <ul className="text-start list-disc text-xl">
                {item.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
