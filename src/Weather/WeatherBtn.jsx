import React, { memo } from 'react';
import { WeatherContext } from '../contexts/WeatherProvider';

function WeatherBtn() {
  return (
    <WeatherContext.Consumer>
      {({ handleClear, getRequestStatus, weatherData }) =>
        weatherData?.length > 0 && (
          <button
            disabled={getRequestStatus({ type: 'CLEAR_WEATHER' })}
            type="submit"
            onClick={handleClear}
            className="bg-blue-500 px-4 py-2 text-white rounded-md disabled:cursor-wait disabled:bg-slate-600"
          >
            Clear Search
          </button>
        )
      }
    </WeatherContext.Consumer>
  );
}

export default memo(WeatherBtn);
