/* eslint-disable react/prop-types */
import React, { Component, createContext, createRef } from 'react';

export const WeatherContext = createContext();

export default class WeatherProvider extends Component {
  state = {
    weatherData: [],
    appStatus: [],
  };

  weatherText = createRef();

  loadStatus = ({ type, id = -1 }) => {
    this.setState(({ appStatus }) => ({
      appStatus: [...appStatus, { type, action: 'REQUEST', id }],
    }));
  };

  successStatus = ({ type, id = -1 }) => {
    this.setState(({ appStatus }) => ({
      appStatus: appStatus.filter(x => !(x.type === type && x.id === id)),
    }));
  };

  errorStatus = ({ type, id = -1, error }) => {
    this.setState(({ appStatus }) => ({
      appStatus: appStatus.map(x => {
        if (x.type === type && x.id === id) {
          return { ...x, action: 'ERROR', errorMessage: error.message };
        }
        return x;
      }),
    }));
  };

  searchCity = async e => {
    const type = 'LOAD_WEATHER';
    try {
      this.loadStatus({ type });

      e.preventDefault();

      const weatherText = this.weatherText.current.value;

      let url = 'http://localhost:3000/weatherList';
      url += `?cityName=${weatherText}`;

      const res = await fetch(url);

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json);
      }

      this.setState(
        () => ({
          weatherData: json,
        }),
        () => {
          this.weatherText.current.value = '';
        },
      );
      this.successStatus({ type });
    } catch (error) {
      this.errorStatus({ type, error });
    }
  };

  handleClear = () => {
    const type = 'CLEAR_WEATHER';
    try {
      this.loadStatus({ type });

      this.setState(
        () => ({
          weatherData: [],
        }),
        () => {
          this.weatherText.current.value = '';
        },
      );
      this.successStatus({ type });
    } catch (error) {
      this.errorStatus({ type, error });
    }
  };

  getRequestStatus = ({ type, id = -1 }) => {
    const { appStatus } = this.state;

    return appStatus.find(
      x => x.type === type && x.action === 'REQUEST' && x.id === id,
    );
  };

  render() {
    const { children } = this.props;
    const { weatherData, appStatus } = this.state;

    return (
      <WeatherContext.Provider
        value={{
          weatherData,
          appStatus,
          weatherText: this.weatherText,
          searchCity: this.searchCity,
          handleClear: this.handleClear,
          getRequestStatus: this.getRequestStatus,
        }}
      >
        {children}
      </WeatherContext.Provider>
    );
  }
}
