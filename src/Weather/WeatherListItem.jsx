import React, { memo } from 'react';
import PropTypes from 'prop-types';

function WeatherListItem({ item }) {
  return (
    <div
      key={item.id}
      className="flex flex-col items-center m-4 bg-blue-500 px-16 py-12 rounded-md"
    >
      <p className="text-6xl font-md text-white mb-4">
        {item.temp} {item.tempType}
      </p>
      <p className="text-sm font-normal text-white">{item.cityName}</p>
    </div>
  );
}

WeatherListItem.propTypes = {
  item: PropTypes.exact({
    id: PropTypes.number,
    cityName: PropTypes.string,
    temp: PropTypes.number,
    tempType: PropTypes.string,
  }).isRequired,
};

export default memo(WeatherListItem);
