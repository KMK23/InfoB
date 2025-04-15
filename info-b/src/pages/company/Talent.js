import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTalent } from "../../store/slices/talentSlice";
import "../../styles/pages/_talent.scss";

const Talent = () => {
  const dispatch = useDispatch();
  const { talent, status, error } = useSelector((state) => state.talent);

  useEffect(() => {
    dispatch(fetchTalent({ collectionName: "talentDetail" }));
  }, [dispatch]);

  console.log("Talent data:", talent);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!talent || !talent[0]?.company?.talent) {
    return <div>No talent data available</div>;
  }

  const talentData = talent[0].company.talent;

  return (
    <div className="talent-container">
      <div className="talent-header">
        <h1>{talentData.title}</h1>
        <p>{talentData.description}</p>
      </div>

      <div className="talent-content">
        {talentData.sections?.map((section, index) => (
          <div key={index} className="talent-section">
            <h2>{section.title}</h2>
            <p>{section.description}</p>
            {section.items && (
              <ul>
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Talent;
