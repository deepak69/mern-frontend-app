import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPlaceById } from "../services/api";

const PlaceDetailsPage = () => {
  const { pid } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await getPlaceById(pid);
        setPlace(response);
      } catch (error) {
        console.error("Failed to fetch place details", error);
      }
    };

    fetchPlace();
  }, [pid]);

  // Render the place details information
  return (
    <div>
      {place ? (
        <div>
          <h2>{place.title}</h2>
          <p>{place.description}</p>
          {/* Display other place details */}
        </div>
      ) : (
        <p>Loading place details...</p>
      )}
    </div>
  );
};

export default PlaceDetailsPage;
