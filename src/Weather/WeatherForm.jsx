/* eslint-disable react/void-dom-elements-no-children */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { WeatherContext } from '../contexts/WeatherProvider';

function WeatherForm() {
  return (
    <WeatherContext.Consumer>
      {({ searchCity, weatherText, getRequestStatus }) => (
        <form onSubmit={searchCity} className="flex max-w-sm px-4 py-8">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              ref={weatherText}
              placeholder="Enter city name"
              className="w-full py-3 pl-12 pr-4 text-gray-500 border border-r-0  rounded-l-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
            />
          </div>
          <button
            disabled={getRequestStatus({ type: 'LOAD_WEATHER' })}
            type="submit"
            className="bg-blue-500 py-3 px-4 text-white rounded-r-md items-center cursor-pointer disabled:cursor-wait disabled:bg-slate-600"
          >
            Search
          </button>
        </form>
      )}
    </WeatherContext.Consumer>
  );
}

WeatherForm.propTypes = {
  status: PropTypes.shape({
    type: PropTypes.string,
    action: PropTypes.oneOf(['REQUEST', 'ERROR']),
    errorMessage: PropTypes.string,
  }),
};

WeatherForm.defaultProps = {
  status: undefined,
};

export default memo(WeatherForm);
