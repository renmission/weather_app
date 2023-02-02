/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import WeatherListItem from './WeatherListItem';
import { WeatherContext } from '../contexts/WeatherProvider';

function WeatherList() {
  return (
    <WeatherContext.Consumer>
      {({ weatherData }) => (
        <div className="w-full flex flex-col overflow-y-auto">
          {weatherData.length > 0 ? (
            weatherData?.map(item => (
              <WeatherListItem key={item.id} item={item} />
            ))
          ) : (
            <p className="text-slate-500">No data found.</p>
          )}
        </div>
      )}
    </WeatherContext.Consumer>
  );
}

export default memo(WeatherList);
